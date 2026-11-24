import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getSiteSettings, saveSiteSettings } from "@/lib/content/queries";
import type { SiteSettings } from "@/lib/content/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const values = await getSiteSettings();
  return NextResponse.json({ ok: true, values });
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
  const values: Partial<SiteSettings> = {};
  for (const [k, v] of Object.entries(body)) {
    if (typeof v === "string") (values as Record<string, string>)[k] = v;
  }
  await saveSiteSettings(values);
  return NextResponse.json({ ok: true, values: await getSiteSettings() });
}
