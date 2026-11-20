import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { stripe } from "@/lib/stripe";
import { EVENTS } from "@/lib/data";
import { l } from "@/lib/i18n";
import {
  getTicketEvent,
  insertOrder,
  reserveSeats,
  releaseSeats
} from "@/lib/tickets/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const eventId = typeof body.eventId === "string" ? body.eventId.trim() : "";
  const buyerName =
    typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
  const buyerEmail =
    typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const quantity = Number.isFinite(body.quantity as number)
    ? Math.max(1, Math.min(10, Math.floor(body.quantity as number)))
    : 1;

  if (!eventId || !buyerName || !buyerEmail || !EMAIL_RE.test(buyerEmail)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const event = EVENTS.find((e) => e.id === eventId);
  if (!event) {
    return NextResponse.json({ ok: false, error: "event_not_found" }, { status: 404 });
  }

  let ticketEvent;
  try {
    ticketEvent = await getTicketEvent(eventId);
  } catch (err) {
    console.error("[checkout] db error", err);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }

  if (!ticketEvent || !ticketEvent.active) {
    return NextResponse.json(
      { ok: false, error: "sales_closed" },
      { status: 409 }
    );
  }

  // Reserve seats atomically; if not enough, bail out.
  const reservation = await reserveSeats(eventId, quantity);
  if (!reservation) {
    return NextResponse.json(
      { ok: false, error: "sold_out", availableSeats: ticketEvent.capacity - ticketEvent.seats_sold },
      { status: 409 }
    );
  }

  const amountCents = ticketEvent.price_cents * quantity;
  const orderId = `KK-${Date.now().toString(36).toUpperCase()}-${nanoid(5).toUpperCase()}`;
  const token = nanoid(32);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? req.headers.get("origin") ?? "";

  try {
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      customer_email: buyerEmail,
      line_items: [
        {
          quantity,
          price_data: {
            currency: "eur",
            unit_amount: ticketEvent.price_cents,
            product_data: {
              name: `Konzertkarte: ${l(event.title, "de")}`,
              description: `${l(event.dateLabel, "de")}${
                event.time ? " · " + l(event.time, "de") : ""
              }`
            }
          }
        }
      ],
      metadata: {
        order_id: orderId,
        event_id: eventId,
        quantity: String(quantity),
        token
      },
      payment_intent_data: {
        metadata: {
          order_id: orderId,
          event_id: eventId,
          token
        }
      },
      success_url: `${siteUrl}/tickets/erfolg?session_id={CHECKOUT_SESSION_ID}&token=${token}`,
      cancel_url: `${siteUrl}/tickets/${eventId}?cancelled=1`,
      expires_at: Math.floor(Date.now() / 1000) + 60 * 30 // 30 min
    });

    await insertOrder({
      id: orderId,
      token,
      eventId,
      buyerName,
      buyerEmail,
      quantity,
      amountCents,
      status: "pending",
      stripeSessionId: session.id
    });

    return NextResponse.json({
      ok: true,
      url: session.url,
      sessionId: session.id,
      orderId,
      token
    });
  } catch (err) {
    // Roll back the seat reservation if Stripe failed.
    await releaseSeats(eventId, quantity).catch(() => undefined);
    console.error("[checkout] stripe error", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: "stripe_failed", detail: msg },
      { status: 502 }
    );
  }
}
