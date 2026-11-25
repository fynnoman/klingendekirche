import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getEventById, getOrderById } from "@/lib/tickets/queries";
import {
  sendOrderReceivedToCustomer,
  sendPaymentConfirmedToCustomer
} from "@/lib/tickets/mail";
import { formatEventDate } from "@/lib/tickets/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  if (order.status !== "paid" && order.status !== "pending") {
    return NextResponse.json({ ok: false, error: "invalid_state" }, { status: 409 });
  }
  const event = await getEventById(order.event_id);
  if (!event) {
    return NextResponse.json({ ok: false, error: "event_missing" }, { status: 500 });
  }
  const meta = {
    title: event.title_de,
    dateLabel: formatEventDate(event.date, "de"),
    time: event.time,
    venue: event.venue_de
  };
  try {
    if (order.status === "paid") {
      await sendPaymentConfirmedToCustomer(order, meta);
    } else {
      await sendOrderReceivedToCustomer(order, meta);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: "send_failed", detail: msg },
      { status: 502 }
    );
  }
}
