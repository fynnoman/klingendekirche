import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  deletePartner,
  listAllPartners,
  upsertPartner
} from "@/lib/content/queries";
import type { PartnerInput } from "@/lib/content/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalize(body: Record<string, unknown>): PartnerInput | { error: string } {
  const name_de = typeof body.name_de === "string" ? body.name_de.trim() : "";
  const logo_url = typeof body.logo_url === "string" ? body.logo_url.trim() : "";
  if (!name_de) return { error: "name_de_required" };
  if (!logo_url) return { error: "logo_url_required" };
  const s = (v: unknown) => (typeof v === "string" ? v.trim() || null : null);
  return {
    id: typeof body.id === "number" ? body.id : undefined,
    name_de,
    name_en: s(body.name_en),
    logo_url,
    website_url: s(body.website_url),
    note_de: s(body.note_de),
    note_en: s(body.note_en),
    sort_order:
      typeof body.sort_order === "number" ? Math.round(body.sort_order) : 0,
    archived: Boolean(body.archived)
  };
}

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const items = await listAllPartners();
  return NextResponse.json({ ok: true, items });
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
  if ("error" in normalized)
    return NextResponse.json({ ok: false, error: normalized.error }, { status: 400 });
  const saved = await upsertPartner(normalized);
  return NextResponse.json({ ok: true, item: saved });
}

export const PATCH = POST;

export async function DELETE(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id") ?? "");
  if (!Number.isFinite(id) || id <= 0)
    return NextResponse.json({ ok: false, error: "id_required" }, { status: 400 });
  await deletePartner(id);
  return NextResponse.json({ ok: true });
}
