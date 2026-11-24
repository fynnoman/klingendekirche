import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  listMembersByYear,
  replaceMembersForYear
} from "@/lib/content/queries";
import type { MemberKind } from "@/lib/content/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function validKind(v: unknown): v is MemberKind {
  return v === "new" || v === "deceased";
}

export async function GET(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const kind = url.searchParams.get("kind");
  const year = Number(url.searchParams.get("year"));
  if (!validKind(kind) || !Number.isFinite(year) || year < 1990 || year > 2100) {
    return NextResponse.json({ ok: false, error: "invalid_query" }, { status: 400 });
  }
  const items = await listMembersByYear(kind, year);
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
  const kind = body.kind;
  const year = Number(body.year);
  const names = Array.isArray(body.names) ? body.names.filter((n) => typeof n === "string") : [];
  if (!validKind(kind) || !Number.isFinite(year) || year < 1990 || year > 2100) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }
  await replaceMembersForYear(kind, year, names as string[]);
  const items = await listMembersByYear(kind, year);
  return NextResponse.json({ ok: true, items });
}
