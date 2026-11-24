import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdminRequest } from "@/lib/admin-auth";
import { nanoid } from "nanoid";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif"
]);

export async function POST(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "blob_not_configured", hint: "BLOB_READ_WRITE_TOKEN fehlt in der Umgebung." },
      { status: 500 }
    );
  }

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.startsWith("multipart/form-data")) {
    return NextResponse.json({ ok: false, error: "expected_multipart" }, { status: 400 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_form" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "no_file" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { ok: false, error: "bad_type", detail: `Erlaubt: ${[...ALLOWED_TYPES].join(", ")}` },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: "too_large", detail: `Maximal ${MAX_BYTES / 1024 / 1024} MB` },
      { status: 400 }
    );
  }

  const ext =
    file.name.includes(".") ? file.name.split(".").pop()!.toLowerCase() : "bin";
  const folderRaw = form.get("folder");
  const folder =
    typeof folderRaw === "string" && /^[a-z0-9_-]{1,32}$/i.test(folderRaw)
      ? folderRaw
      : "events";
  const key = `${folder}/${Date.now()}-${nanoid(8)}.${ext}`;

  try {
    const blob = await put(key, file, {
      access: "public",
      contentType: file.type,
      token
    });
    return NextResponse.json({ ok: true, url: blob.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[upload] blob.put failed", err);
    return NextResponse.json(
      { ok: false, error: "upload_failed", detail: msg },
      { status: 502 }
    );
  }
}
