import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  getAllTicketEvents,
  upsertTicketEvent,
  setEventActive
} from "@/lib/tickets/queries";
import { EVENTS } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const rows = await getAllTicketEvents();
  return NextResponse.json({ ok: true, events: rows, catalog: EVENTS.map((e) => e.id) });
}

export async function POST(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const eventId = typeof body.eventId === "string" ? body.eventId.trim() : "";
  const priceCents = Number(body.priceCents);
  const capacity = Number(body.capacity);
  const active = typeof body.active === "boolean" ? body.active : true;

  if (!eventId || !EVENTS.some((e) => e.id === eventId)) {
    return NextResponse.json({ ok: false, error: "unknown_event" }, { status: 400 });
  }
  if (!Number.isFinite(priceCents) || priceCents < 0 || priceCents > 1_000_000) {
    return NextResponse.json({ ok: false, error: "invalid_price" }, { status: 400 });
  }
  if (!Number.isFinite(capacity) || capacity < 0 || capacity > 10000) {
    return NextResponse.json({ ok: false, error: "invalid_capacity" }, { status: 400 });
  }

  await upsertTicketEvent({
    eventId,
    priceCents: Math.round(priceCents),
    capacity: Math.round(capacity),
    active
  });
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const eventId = typeof body.eventId === "string" ? body.eventId.trim() : "";
  const active = typeof body.active === "boolean" ? body.active : null;
  if (!eventId || active === null) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }
  await setEventActive(eventId, active);
  return NextResponse.json({ ok: true });
}
