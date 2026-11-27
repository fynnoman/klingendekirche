import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  countOrdersForEvent,
  deleteEvent,
  getEventById,
  insertEvent,
  listAllEvents,
  setEventArchived,
  updateEvent
} from "@/lib/tickets/queries";
import { slugifyTitle, type EventCategory, type EventInput } from "@/lib/tickets/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CATEGORIES: EventCategory[] = [
  "Konzert",
  "Orgel",
  "Vortrag",
  "Chor",
  "Besonderes"
];

function normalize(body: Record<string, unknown>): EventInput | { error: string } {
  const title_de = typeof body.title_de === "string" ? body.title_de.trim() : "";
  const venue_de = typeof body.venue_de === "string" ? body.venue_de.trim() : "";
  const description_de =
    typeof body.description_de === "string" ? body.description_de.trim() : "";
  const date = typeof body.date === "string" ? body.date.slice(0, 10) : "";
  const category = (body.category as EventCategory) ?? "Konzert";

  if (!title_de) return { error: "title_de_required" };
  if (!venue_de) return { error: "venue_de_required" };
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "date_required" };
  if (!CATEGORIES.includes(category)) return { error: "invalid_category" };

  const price = Number(body.price_cents);
  const capacity = Number(body.capacity);

  if (!Number.isFinite(price) || price < 0 || price > 1_000_000)
    return { error: "invalid_price" };
  if (!Number.isFinite(capacity) || capacity < 0 || capacity > 10_000)
    return { error: "invalid_capacity" };

  let price_reduced_cents: number | null = null;
  if (
    body.price_reduced_cents !== undefined &&
    body.price_reduced_cents !== null &&
    body.price_reduced_cents !== ""
  ) {
    const reduced = Number(body.price_reduced_cents);
    if (!Number.isFinite(reduced) || reduced < 0 || reduced > 1_000_000) {
      return { error: "invalid_price_reduced" };
    }
    price_reduced_cents = reduced > 0 ? Math.round(reduced) : null;
  }

  return {
    title_de,
    title_en: typeof body.title_en === "string" ? body.title_en.trim() || null : null,
    subtitle_de:
      typeof body.subtitle_de === "string" ? body.subtitle_de.trim() || null : null,
    subtitle_en:
      typeof body.subtitle_en === "string" ? body.subtitle_en.trim() || null : null,
    date,
    time: typeof body.time === "string" ? body.time.trim() || null : null,
    venue_de,
    venue_en:
      typeof body.venue_en === "string" ? body.venue_en.trim() || null : null,
    description_de,
    description_en:
      typeof body.description_en === "string"
        ? body.description_en.trim() || null
        : null,
    category,
    image_url:
      typeof body.image_url === "string" ? body.image_url.trim() || null : null,
    price_cents: Math.round(price),
    price_reduced_cents,
    capacity: Math.round(capacity),
    sale_active: Boolean(body.sale_active),
    highlight: Boolean(body.highlight),
    archived: Boolean(body.archived)
  };
}

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const events = await listAllEvents();
  return NextResponse.json({ ok: true, events });
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

  const normalized = normalize(body);
  if ("error" in normalized) {
    return NextResponse.json({ ok: false, error: normalized.error }, { status: 400 });
  }

  let id =
    typeof body.id === "string" && body.id.trim()
      ? slugifyTitle(body.id)
      : slugifyTitle(`${normalized.title_de}-${normalized.date}`);

  const existing = await getEventById(id);
  if (existing) {
    id = `${id}-${Math.random().toString(36).slice(2, 6)}`;
  }

  const created = await insertEvent(id, normalized);
  return NextResponse.json({ ok: true, event: created });
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

  const id = typeof body.id === "string" ? body.id : "";
  if (!id) {
    return NextResponse.json({ ok: false, error: "id_required" }, { status: 400 });
  }

  const normalized = normalize(body);
  if ("error" in normalized) {
    return NextResponse.json({ ok: false, error: normalized.error }, { status: 400 });
  }

  const updated = await updateEvent(id, normalized);
  if (!updated) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, event: updated });
}

export async function DELETE(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const id = url.searchParams.get("id") ?? "";
  const permanent = url.searchParams.get("permanent") === "1";
  if (!id) {
    return NextResponse.json({ ok: false, error: "id_required" }, { status: 400 });
  }
  const existing = await getEventById(id);
  if (!existing) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  if (permanent) {
    const orders = await countOrdersForEvent(id);
    if (orders > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "has_orders",
          orders,
          detail:
            "Dieses Konzert hat bereits Bestellungen und kann nicht gelöscht werden. Bitte archivieren."
        },
        { status: 409 }
      );
    }
    await deleteEvent(id);
    return NextResponse.json({ ok: true, deleted: true });
  }

  await setEventArchived(id, true);
  return NextResponse.json({ ok: true });
}
