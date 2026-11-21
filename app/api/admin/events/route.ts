import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { listAllEvents } from "@/lib/tickets/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Minimal read endpoint. Vollständiges CRUD inkl. Stripe-Sync kommt in Phase 3.
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const events = await listAllEvents();
  return NextResponse.json({ ok: true, events });
}
