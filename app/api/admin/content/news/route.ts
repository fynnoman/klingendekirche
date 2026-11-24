import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  deleteNews,
  getNewsById,
  listAllNews,
  upsertNews
} from "@/lib/content/queries";
import type { NewsInput } from "@/lib/content/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalize(body: Record<string, unknown>): NewsInput | { error: string } {
  const title_de = typeof body.title_de === "string" ? body.title_de.trim() : "";
  const body_de = typeof body.body_de === "string" ? body.body_de : "";
  const published_at =
    typeof body.published_at === "string" ? body.published_at.slice(0, 10) : "";

  if (!title_de) return { error: "title_de_required" };
  if (!published_at || !/^\d{4}-\d{2}-\d{2}$/.test(published_at))
    return { error: "published_at_required" };

  const s = (v: unknown) =>
    typeof v === "string" ? v.trim() || null : null;

  return {
    id: typeof body.id === "string" ? body.id : undefined,
    title_de,
    title_en: s(body.title_en),
    excerpt_de: s(body.excerpt_de),
    excerpt_en: s(body.excerpt_en),
    body_de,
    body_en: typeof body.body_en === "string" ? body.body_en || null : null,
    category_de: s(body.category_de),
    category_en: s(body.category_en),
    image_url: s(body.image_url),
    published_at,
    archived: Boolean(body.archived)
  };
}

async function ensureAdmin() {
  return isAdminRequest();
}

export async function GET() {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const items = await listAllNews();
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  if (!(await ensureAdmin())) {
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
  const saved = await upsertNews(normalized);
  return NextResponse.json({ ok: true, item: saved });
}

export const PATCH = POST;

export async function DELETE(req: Request) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const id = url.searchParams.get("id") ?? "";
  if (!id) return NextResponse.json({ ok: false, error: "id_required" }, { status: 400 });
  const existing = await getNewsById(id);
  if (!existing)
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  await deleteNews(id);
  return NextResponse.json({ ok: true });
}
