import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  getEventById,
  getOrderById,
  markOrderPaidManual
} from "@/lib/tickets/queries";
import { sendPaymentConfirmedToCustomer } from "@/lib/tickets/mail";
import { formatEventDate } from "@/lib/tickets/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Admin markiert eine offene Bestellung als bezahlt, sobald die Überweisung
 * eingetroffen ist. Der Besteller bekommt eine Bestätigungsmail.
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
  if (order.status === "paid") {
    return NextResponse.json({ ok: true, alreadyPaid: true, order });
  }
  if (order.status !== "pending" && order.status !== "failed") {
    return NextResponse.json(
      { ok: false, error: "invalid_state" },
      { status: 409 }
    );
  }

  const updated = await markOrderPaidManual(order.id);
  if (!updated) {
    return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });
  }

  const e = await getEventById(updated.event_id).catch(() => null);
  if (e) {
    await sendPaymentConfirmedToCustomer(updated, {
      title: e.title_de,
      dateLabel: formatEventDate(e.date, "de"),
      time: e.time,
      venue: e.venue_de
    }).catch((err) => console.error("[admin/mark-paid] mail failed", err));
  }

  return NextResponse.json({ ok: true, order: updated });
}
