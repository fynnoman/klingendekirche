import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { stripe } from "@/lib/stripe";
import {
  getEventById,
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

  const quantityRaw = Number.isFinite(body.quantity as number)
    ? Math.max(0, Math.min(10, Math.floor(body.quantity as number)))
    : 1;
  const quantityReducedRaw = Number.isFinite(body.quantity_reduced as number)
    ? Math.max(0, Math.min(10, Math.floor(body.quantity_reduced as number)))
    : 0;
  const quantityRegular = quantityRaw;
  const quantityReduced = quantityReducedRaw;
  const totalQuantity = quantityRegular + quantityReduced;

  if (totalQuantity < 1 || totalQuantity > 10) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  if (!eventId || !buyerName || !buyerEmail || !EMAIL_RE.test(buyerEmail)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  let event;
  try {
    event = await getEventById(eventId);
  } catch (err) {
    console.error("[checkout] db error", err);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }

  if (!event || event.archived) {
    return NextResponse.json({ ok: false, error: "event_not_found" }, { status: 404 });
  }

  if (!event.sale_active || event.price_cents <= 0 || event.capacity <= 0) {
    return NextResponse.json(
      { ok: false, error: "sales_closed" },
      { status: 409 }
    );
  }

  // Ermäßigte Karten nur zulassen, wenn im Event auch ein ermäßigter Preis gesetzt ist
  const hasReduced =
    typeof event.price_reduced_cents === "number" && event.price_reduced_cents > 0;
  if (quantityReduced > 0 && !hasReduced) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  // Atomar Plätze reservieren (regulär + ermäßigt = Gesamtmenge)
  const reservation = await reserveSeats(eventId, totalQuantity);
  if (!reservation) {
    return NextResponse.json(
      {
        ok: false,
        error: "sold_out",
        availableSeats: event.capacity - event.seats_sold
      },
      { status: 409 }
    );
  }

  const amountCents =
    quantityRegular * event.price_cents +
    quantityReduced * (event.price_reduced_cents ?? 0);
  const orderId = `KK-${Date.now().toString(36).toUpperCase()}-${nanoid(5).toUpperCase()}`;
  const token = nanoid(32);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? req.headers.get("origin") ?? "";

  try {
    const line_items: Array<Record<string, unknown>> = [];
    if (quantityRegular > 0) {
      line_items.push(
        event.stripe_price_id
          ? { price: event.stripe_price_id, quantity: quantityRegular }
          : {
              quantity: quantityRegular,
              price_data: {
                currency: "eur",
                unit_amount: event.price_cents,
                product_data: {
                  name: `Konzertkarte: ${event.title_de}`,
                  description:
                    `${event.date}${event.time ? " · " + event.time : ""}`
                }
              }
            }
      );
    }
    if (quantityReduced > 0) {
      line_items.push(
        event.stripe_price_reduced_id
          ? { price: event.stripe_price_reduced_id, quantity: quantityReduced }
          : {
              quantity: quantityReduced,
              price_data: {
                currency: "eur",
                unit_amount: event.price_reduced_cents ?? 0,
                product_data: {
                  name: `Konzertkarte (ermäßigt): ${event.title_de}`,
                  description:
                    `${event.date}${event.time ? " · " + event.time : ""}`
                }
              }
            }
      );
    }

    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      customer_email: buyerEmail,
      line_items: line_items as never,
      metadata: {
        order_id: orderId,
        event_id: eventId,
        quantity: String(totalQuantity),
        quantity_reduced: String(quantityReduced),
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
      expires_at: Math.floor(Date.now() / 1000) + 60 * 30
    });

    await insertOrder({
      id: orderId,
      token,
      eventId,
      buyerName,
      buyerEmail,
      quantity: totalQuantity,
      quantityReduced,
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
    await releaseSeats(eventId, totalQuantity).catch(() => undefined);
    console.error("[checkout] stripe error", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: "stripe_failed", detail: msg },
      { status: 502 }
    );
  }
}
