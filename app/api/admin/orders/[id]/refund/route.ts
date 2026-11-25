import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  getEventById,
  getOrderById,
  markOrderCancelled,
  releaseSeats
} from "@/lib/tickets/queries";
import { sendOrderCancelledToCustomer } from "@/lib/tickets/mail";
import { formatEventDate } from "@/lib/tickets/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Absagen einer Bestellung durch den Admin. Keine Stripe-Interaktion mehr
 * (Zahlung läuft über Banküberweisung). Freigewordene Plätze werden wieder
 * freigegeben und der Besteller per Mail informiert.
 */
export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const order = await getOrderById(id);
  if (!order) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  if (
    order.status === "cancelled" ||
    order.status === "refunded" ||
    order.status === "expired"
  ) {
    return NextResponse.json({ ok: true, alreadyCancelled: true, order });
  }

  const updated = await markOrderCancelled({ orderId: order.id, refundId: null });
  if (updated) {
    await releaseSeats(updated.event_id, updated.quantity).catch(() => undefined);
    const e = await getEventById(updated.event_id).catch(() => null);
    if (e) {
      await sendOrderCancelledToCustomer(updated, {
        title: e.title_de,
        dateLabel: formatEventDate(e.date, "de"),
        time: e.time,
        venue: e.venue_de
      }).catch((err) => console.error("[admin/cancel] mail failed", err));
    }
  }

  return NextResponse.json({ ok: true, order: updated ?? order });
}
