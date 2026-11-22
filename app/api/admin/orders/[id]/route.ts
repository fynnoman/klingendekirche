import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  getOrderById,
  updateOrderBuyer,
  updateOrderNote
} from "@/lib/tickets/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(
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
  return NextResponse.json({ ok: true, order });
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const order = await getOrderById(id);
  if (!order) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  // Buyer-Edit
  if (typeof body.buyer_name === "string" || typeof body.buyer_email === "string") {
    const buyerName =
      typeof body.buyer_name === "string"
        ? body.buyer_name.trim().slice(0, 200)
        : order.buyer_name;
    const buyerEmail =
      typeof body.buyer_email === "string"
        ? body.buyer_email.trim().slice(0, 200)
        : order.buyer_email;
    if (!buyerName) {
      return NextResponse.json({ ok: false, error: "invalid_name" }, { status: 400 });
    }
    if (!EMAIL_RE.test(buyerEmail)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }
    await updateOrderBuyer({ orderId: id, buyerName, buyerEmail });
  }

  // Notiz
  if ("note" in body) {
    const note =
      typeof body.note === "string" ? body.note.trim().slice(0, 500) || null : null;
    await updateOrderNote({ orderId: id, note });
  }

  const fresh = await getOrderById(id);
  return NextResponse.json({ ok: true, order: fresh });
}
