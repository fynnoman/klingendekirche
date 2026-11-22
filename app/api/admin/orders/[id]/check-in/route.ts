import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { setOrderCheckedIn, getOrderById } from "@/lib/tickets/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const count = Number(body.count);
  if (!Number.isFinite(count) || count < 0) {
    return NextResponse.json({ ok: false, error: "invalid_count" }, { status: 400 });
  }
  const current = await getOrderById(id);
  if (!current) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  if (current.status !== "paid") {
    return NextResponse.json({ ok: false, error: "not_paid" }, { status: 409 });
  }
  const updated = await setOrderCheckedIn({ orderId: id, count });
  return NextResponse.json({ ok: true, order: updated });
}
