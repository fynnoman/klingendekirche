// Temporärer Debug-Endpoint zum Prüfen der Admin-Credentials-Env.
// Gibt KEIN Passwort und KEIN Secret preis, nur Metadaten.
// Nach erfolgreichem Login: diese Route wieder löschen.
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Codepoint-Dump der ersten/letzten paar Zeichen – deckt unsichtbare
// Whitespace- oder BOM-Zeichen auf.
function edgeCodes(s: string): { head: number[]; tail: number[] } {
  const head = [];
  const tail = [];
  for (let i = 0; i < Math.min(3, s.length); i++) head.push(s.charCodeAt(i));
  for (let i = Math.max(0, s.length - 3); i < s.length; i++)
    tail.push(s.charCodeAt(i));
  return { head, tail };
}

export async function GET() {
  const pw = process.env.ADMIN_PASSWORD ?? "";
  const sec = process.env.ADMIN_SESSION_SECRET ?? "";
  return NextResponse.json({
    ok: true,
    env: process.env.VERCEL_ENV ?? "dev",
    deployed_at: process.env.VERCEL_DEPLOYMENT_ID ?? null,
    admin_password: {
      configured: pw.length > 0,
      length: pw.length,
      has_whitespace: /\s/.test(pw),
      edge_codes: pw ? edgeCodes(pw) : null
    },
    admin_session_secret: {
      configured: sec.length > 0,
      length: sec.length
    }
  });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const sent = typeof body.password === "string" ? body.password : "";
  const expected = process.env.ADMIN_PASSWORD ?? "";

  return NextResponse.json({
    ok: true,
    env: process.env.VERCEL_ENV ?? "dev",
    expected: {
      configured: expected.length > 0,
      length: expected.length,
      edge_codes: expected ? edgeCodes(expected) : null
    },
    received: {
      length: sent.length,
      edge_codes: sent ? edgeCodes(sent) : null
    },
    lengths_match: expected.length === sent.length,
    identical: expected.length > 0 && expected === sent
  });
}
