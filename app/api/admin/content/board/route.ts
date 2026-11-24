import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  deleteBoardMember,
  listBoardMembers,
  upsertBoardMember
} from "@/lib/content/queries";
import type { BoardMemberInput } from "@/lib/content/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalize(body: Record<string, unknown>): BoardMemberInput | { error: string } {
  const role_de = typeof body.role_de === "string" ? body.role_de.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!role_de) return { error: "role_de_required" };
  if (!name) return { error: "name_required" };
  return {
    id: typeof body.id === "number" ? body.id : undefined,
    role_de,
    role_en:
      typeof body.role_en === "string" ? body.role_en.trim() || null : null,
    name,
    sort_order:
      typeof body.sort_order === "number" ? Math.round(body.sort_order) : 0
  };
}

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const items = await listBoardMembers();
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
  const saved = await upsertBoardMember(normalized);
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
  await deleteBoardMember(id);
  return NextResponse.json({ ok: true });
}
