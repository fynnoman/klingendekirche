"use client";

import { useRef, useState } from "react";
import { adminFetch, AdminFetchError } from "@/lib/adminFetch";

type Props = {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: string;
  label?: string;
  aspect?: "square" | "landscape" | "portrait";
};

const ASPECT_CLASS: Record<string, string> = {
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]"
};

export default function AdminImageUpload({
  value,
  onChange,
  folder,
  label = "Bild",
  aspect = "landscape"
}: Props) {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      const data = await adminFetch<{ ok: boolean; url: string; hint?: string }>(
        "/api/admin/upload",
        { method: "POST", body: fd }
      );
      if (!data?.ok) {
        setError("Upload fehlgeschlagen.");
        return;
      }
      onChange(data.url);
    } catch (err) {
      if (err instanceof AdminFetchError && err.status === 401) return;
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-2">
      <div className="text-[12px] font-medium text-neutral-700">{label}</div>
      <div className="flex flex-wrap items-start gap-4">
        <div
          className={`w-40 overflow-hidden rounded-xl border border-royal-700/10 bg-cream-100/70 ${ASPECT_CLASS[aspect]}`}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-[11px] text-neutral-500">
              kein Bild
            </div>
          )}
        </div>
        <div className="flex-1 min-w-[200px] space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={uploading}
              className="rounded-full border border-royal-700/15 bg-white px-4 py-2 text-[12px] font-semibold text-royal-800 transition hover:border-gold-300 disabled:opacity-60"
            >
              {uploading ? "Lade hoch …" : value ? "Bild tauschen" : "Bild hochladen"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange(null)}
                className="rounded-full border border-royal-700/15 bg-white px-4 py-2 text-[12px] font-semibold text-neutral-600 transition hover:border-rose-300 hover:text-rose-700"
              >
                Entfernen
              </button>
            )}
          </div>
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
          <div className="text-[11px] text-neutral-500">
            JPEG, PNG, WebP, AVIF. Max 5 MB.
          </div>
          {error && (
            <div className="text-[11.5px] text-rose-700">Upload: {error}</div>
          )}
        </div>
      </div>
    </div>
  );
}
