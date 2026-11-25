import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import {
  getEventById,
  insertOrder,
  releaseSeats,
  reserveSeats
} from "@/lib/tickets/queries";
import {
  sendOrderReceivedToAdmin,
  sendOrderReceivedToCustomer
} from "@/lib/tickets/mail";
import { formatEventDate } from "@/lib/tickets/types";

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

  const hasReduced =
    typeof event.price_reduced_cents === "number" && event.price_reduced_cents > 0;
  if (quantityReduced > 0 && !hasReduced) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

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

  try {
    await insertOrder({
      id: orderId,
      token,
      eventId,
      buyerName,
      buyerEmail,
      quantity: totalQuantity,
      quantityReduced,
      amountCents,
      status: "pending"
    });
  } catch (err) {
    await releaseSeats(eventId, totalQuantity).catch(() => undefined);
    console.error("[checkout] insert failed", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: "db_error", detail: msg },
      { status: 500 }
    );
  }

  const createdOrder = {
    id: orderId,
    token,
    event_id: eventId,
    buyer_name: buyerName,
    buyer_email: buyerEmail,
    quantity: totalQuantity,
    quantity_reduced: quantityReduced,
    amount_cents: amountCents,
    currency: "eur",
    status: "pending" as const,
    stripe_session_id: null,
    stripe_payment_intent_id: null,
    stripe_charge_id: null,
    stripe_refund_id: null,
    note: null,
    created_at: new Date().toISOString(),
    paid_at: null,
    cancelled_at: null,
    checked_in_at: null,
    checked_in_count: 0
  };
  const eventMeta = {
    title: event.title_de,
    dateLabel: formatEventDate(event.date, "de"),
    time: event.time,
    venue: event.venue_de
  };

  await Promise.all([
    sendOrderReceivedToCustomer(createdOrder, eventMeta).catch((err) =>
      console.error("[checkout] customer mail failed", err)
    ),
    sendOrderReceivedToAdmin(createdOrder, eventMeta).catch((err) =>
      console.error("[checkout] admin mail failed", err)
    )
  ]);

  return NextResponse.json({
    ok: true,
    orderId,
    token,
    redirectUrl: `/tickets/erfolg?token=${encodeURIComponent(token)}`
  });
}
