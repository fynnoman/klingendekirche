import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import {
  getEventById,
  getOrderByToken,
  markOrderCancelled,
  releaseSeats
} from "@/lib/tickets/queries";
import { sendCancellationMail } from "@/lib/tickets/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  _req: Request,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;
  if (!token) {
    return NextResponse.json({ ok: false, error: "no_token" }, { status: 400 });
  }

  const order = await getOrderByToken(token);
  if (!order) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  if (order.status === "cancelled" || order.status === "refunded" || order.status === "expired") {
    return NextResponse.json({ ok: true, alreadyCancelled: true, order });
  }

  let refundId: string | null = null;
  if (order.status === "paid") {
    const piId = order.stripe_payment_intent_id;
    if (!piId) {
      return NextResponse.json(
        { ok: false, error: "no_payment_intent" },
        { status: 500 }
      );
    }
    try {
      const refund = await stripe().refunds.create({
        payment_intent: piId,
        metadata: {
          order_id: order.id,
          cancelled_via: "customer_portal"
        }
      });
      refundId = refund.id;
    } catch (err) {
      console.error("[cancel] refund failed", err);
      const msg = err instanceof Error ? err.message : String(err);
      return NextResponse.json(
        { ok: false, error: "refund_failed", detail: msg },
        { status: 502 }
      );
    }
  }

  const updated = await markOrderCancelled({
    orderId: order.id,
    refundId
  });

  if (updated) {
    await releaseSeats(updated.event_id, updated.quantity).catch(() => undefined);
    const e = await getEventById(updated.event_id).catch(() => null);
    if (e) {
      await sendCancellationMail(updated, {
        title: e.title_de,
        dateLabel: e.date,
        time: e.time,
        venue: e.venue_de
      }).catch((err) => console.error("[cancel] mail failed", err));
    }
  }

  return NextResponse.json({ ok: true, order: updated ?? order });
}
