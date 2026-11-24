import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  deleteGallery,
  getGalleryById,
  listAllGalleries,
  listGalleryImages,
  replaceGalleryImages,
  upsertGallery
} from "@/lib/content/queries";
import type {
  GalleryImageInput,
  GalleryInput
} from "@/lib/content/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalize(body: Record<string, unknown>): GalleryInput | { error: string } {
  const title_de = typeof body.title_de === "string" ? body.title_de.trim() : "";
  if (!title_de) return { error: "title_de_required" };
  const body_de = typeof body.body_de === "string" ? body.body_de : "";
  const s = (v: unknown) => (typeof v === "string" ? v.trim() || null : null);
  const date =
    typeof body.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(body.date.slice(0, 10))
      ? body.date.slice(0, 10)
      : null;
  return {
    id: typeof body.id === "string" ? body.id : undefined,
    title_de,
    title_en: s(body.title_en),
    excerpt_de: s(body.excerpt_de),
    excerpt_en: s(body.excerpt_en),
    body_de,
    body_en: typeof body.body_en === "string" ? body.body_en || null : null,
    cover_url: s(body.cover_url),
    date,
    sort_order:
      typeof body.sort_order === "number" ? Math.round(body.sort_order) : 0,
    archived: Boolean(body.archived)
  };
}

function normalizeImages(body: Record<string, unknown>): GalleryImageInput[] {
  const imgs = Array.isArray(body.images) ? body.images : [];
  return imgs.map((raw, i) => {
    const r = raw as Record<string, unknown>;
    return {
      gallery_id: "",
      image_url: typeof r.image_url === "string" ? r.image_url : "",
      caption_de: typeof r.caption_de === "string" ? r.caption_de : null,
      caption_en: typeof r.caption_en === "string" ? r.caption_en : null,
      sort_order: typeof r.sort_order === "number" ? Math.round(r.sort_order) : i
    };
  });
}

export async function GET(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (id) {
    const gallery = await getGalleryById(id);
    if (!gallery)
      return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    const images = await listGalleryImages(id);
    return NextResponse.json({ ok: true, item: gallery, images });
  }
  const items = await listAllGalleries();
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
  const saved = await upsertGallery(normalized);

  const images = normalizeImages(body).map((img) => ({
    ...img,
    gallery_id: saved.id
  }));
  await replaceGalleryImages(saved.id, images);

  return NextResponse.json({
    ok: true,
    item: saved,
    images: await listGalleryImages(saved.id)
  });
}

export const PATCH = POST;

export async function DELETE(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const id = url.searchParams.get("id") ?? "";
  if (!id) return NextResponse.json({ ok: false, error: "id_required" }, { status: 400 });
  const existing = await getGalleryById(id);
  if (!existing)
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  await deleteGallery(id);
  return NextResponse.json({ ok: true });
}
