import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getEventById, getOrderById } from "@/lib/tickets/queries";
import { sendTicketConfirmation } from "@/lib/tickets/mail";

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
  if (order.status !== "paid") {
    return NextResponse.json({ ok: false, error: "not_paid" }, { status: 409 });
  }
  const event = await getEventById(order.event_id);
  if (!event) {
    return NextResponse.json({ ok: false, error: "event_missing" }, { status: 500 });
  }
  try {
    await sendTicketConfirmation(order, {
      title: event.title_de,
      dateLabel: event.date,
      time: event.time,
      venue: event.venue_de
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: "send_failed", detail: msg },
      { status: 502 }
    );
  }
}
