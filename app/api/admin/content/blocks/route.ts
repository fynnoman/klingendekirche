import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { listPageBlocks, savePageBlock } from "@/lib/content/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_KEYS = new Set([
  "home.intro",
  "verein.intro",
  "verein.history",
  "orgel.intro",
  "kirche.intro"
]);

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const items = await listPageBlocks();
  return NextResponse.json({ ok: true, items, allowed: Array.from(ALLOWED_KEYS) });
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
  const key = typeof body.key === "string" ? body.key : "";
  if (!ALLOWED_KEYS.has(key)) {
    return NextResponse.json({ ok: false, error: "invalid_key" }, { status: 400 });
  }
  const body_de = typeof body.body_de === "string" ? body.body_de : "";
  const body_en = typeof body.body_en === "string" ? body.body_en : "";
  const saved = await savePageBlock(key, body_de, body_en);
  return NextResponse.json({ ok: true, item: saved });
}
