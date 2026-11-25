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
  const touchesBuyer =
    typeof body.buyer_name === "string" ||
    typeof body.buyer_email === "string" ||
    typeof body.buyer_street === "string" ||
    typeof body.buyer_postal_code === "string" ||
    typeof body.buyer_city === "string" ||
    typeof body.buyer_phone === "string";
  if (touchesBuyer) {
    const buyerName =
      typeof body.buyer_name === "string"
        ? body.buyer_name.trim().slice(0, 200)
        : order.buyer_name;
    let buyerEmail: string | null = order.buyer_email;
    if (typeof body.buyer_email === "string") {
      const trimmed = body.buyer_email.trim().slice(0, 200);
      if (!trimmed) {
        buyerEmail = null;
      } else if (!EMAIL_RE.test(trimmed)) {
        return NextResponse.json(
          { ok: false, error: "invalid_email" },
          { status: 400 }
        );
      } else {
        buyerEmail = trimmed;
      }
    }
    if (!buyerName) {
      return NextResponse.json({ ok: false, error: "invalid_name" }, { status: 400 });
    }
    await updateOrderBuyer({
      orderId: id,
      buyerName,
      buyerEmail,
      buyerStreet:
        typeof body.buyer_street === "string"
          ? body.buyer_street.trim().slice(0, 200)
          : undefined,
      buyerPostalCode:
        typeof body.buyer_postal_code === "string"
          ? body.buyer_postal_code.trim().slice(0, 20)
          : undefined,
      buyerCity:
        typeof body.buyer_city === "string"
          ? body.buyer_city.trim().slice(0, 120)
          : undefined,
      buyerPhone:
        typeof body.buyer_phone === "string"
          ? body.buyer_phone.trim().slice(0, 60)
          : undefined
    });
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
