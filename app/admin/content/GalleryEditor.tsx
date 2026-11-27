"use client";

import { useEffect, useRef, useState } from "react";
import AdminImageUpload from "@/components/AdminImageUpload";
import RichTextEditor from "@/components/RichTextEditor";
import type {
  GalleryImageRow,
  GalleryRow
} from "@/lib/content/types";
import {
  adminDelete,
  adminFetch,
  adminGet,
  adminPost,
  AdminFetchError
} from "@/lib/adminFetch";

type FormState = {
  id: string;
  title_de: string;
  title_en: string;
  excerpt_de: string;
  excerpt_en: string;
  body_de: string;
  body_en: string;
  cover_url: string | null;
  date: string;
  sort_order: number;
  archived: boolean;
  images: { image_url: string; caption_de: string }[];
};

function empty(): FormState {
  return {
    id: "",
    title_de: "",
    title_en: "",
    excerpt_de: "",
    excerpt_en: "",
    body_de: "",
    body_en: "",
    cover_url: null,
    date: new Date().toISOString().slice(0, 10),
    sort_order: 0,
    archived: false,
    images: []
  };
}

export default function GalleryEditor() {
  const [items, setItems] = useState<GalleryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imgInput = useRef<HTMLInputElement | null>(null);

  async function reload() {
    setLoading(true);
    setError(null);
    try {
      const data = await adminGet<{ ok: boolean; items: GalleryRow[] }>(
        "/api/admin/content/galleries"
      );
      if (data?.ok) setItems(data.items ?? []);
    } catch (err) {
      if (err instanceof AdminFetchError && err.status === 401) return;
      setError(err instanceof Error ? err.message : "Laden fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  async function openEdit(row: GalleryRow) {
    let imgs: GalleryImageRow[] = [];
    try {
      const data = await adminGet<{ images: GalleryImageRow[] }>(
        `/api/admin/content/galleries?id=${encodeURIComponent(row.id)}`
      );
      imgs = data?.images ?? [];
    } catch (err) {
      if (err instanceof AdminFetchError && err.status === 401) return;
      setError(err instanceof Error ? err.message : "Laden fehlgeschlagen.");
    }
    setEditing({
      id: row.id,
      title_de: row.title_de,
      title_en: row.title_en ?? "",
      excerpt_de: row.excerpt_de ?? "",
      excerpt_en: row.excerpt_en ?? "",
      body_de: row.body_de ?? "",
      body_en: row.body_en ?? "",
      cover_url: row.cover_url,
      date: row.date ?? new Date().toISOString().slice(0, 10),
      sort_order: row.sort_order,
      archived: row.archived,
      images: imgs.map((i) => ({
        image_url: i.image_url,
        caption_de: i.caption_de ?? ""
      }))
    });
  }

  async function uploadImage(file: File) {
    setUploadingImage(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "galleries");
      const data = await adminFetch<{ ok: boolean; url: string }>(
        "/api/admin/upload",
        { method: "POST", body: fd }
      );
      if (!data?.ok) {
        setError("Upload fehlgeschlagen.");
        return;
      }
      setEditing((s) =>
        s ? { ...s, images: [...s.images, { image_url: data.url, caption_de: "" }] } : s
      );
    } catch (err) {
      if (err instanceof AdminFetchError && err.status === 401) return;
      setError(err instanceof Error ? err.message : "Upload fehlgeschlagen.");
    } finally {
      setUploadingImage(false);
    }
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      await adminPost("/api/admin/content/galleries", {
        id: editing.id || undefined,
        title_de: editing.title_de,
        title_en: editing.title_en,
        excerpt_de: editing.excerpt_de,
        excerpt_en: editing.excerpt_en,
        body_de: editing.body_de,
        body_en: editing.body_en,
        cover_url: editing.cover_url,
        date: editing.date,
        sort_order: editing.sort_order,
        archived: editing.archived,
        images: editing.images.map((img, i) => ({
          image_url: img.image_url,
          caption_de: img.caption_de || null,
          sort_order: i
        }))
      });
      setEditing(null);
      await reload();
    } catch (err) {
      if (err instanceof AdminFetchError && err.status === 401) return;
      setError(err instanceof Error ? err.message : "Speichern fehlgeschlagen.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Diesen Beitrag und alle Bilder löschen?")) return;
    setError(null);
    try {
      await adminDelete(
        `/api/admin/content/galleries?id=${encodeURIComponent(id)}`
      );
      await reload();
    } catch (err) {
      if (err instanceof AdminFetchError && err.status === 401) return;
      setError(err instanceof Error ? err.message : "Löschen fehlgeschlagen.");
    }
  }

  if (editing) {
    const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
      setEditing({ ...editing, [k]: v });
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="display text-xl text-royal-800">
            {editing.id ? "Beitrag bearbeiten" : "Neuer Beitrag"}
          </h3>
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="text-[12px] font-semibold uppercase tracking-wider text-neutral-500 hover:text-royal-800"
          >
            Abbrechen
          </button>
        </div>

        <div className="grid gap-4 rounded-2xl border border-royal-700/10 bg-white p-6">
          <Field label="Titel (Deutsch)*">
            <input
              className="input"
              value={editing.title_de}
              onChange={(e) => set("title_de", e.target.value)}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Titel (Englisch, optional)">
              <input
                className="input"
                value={editing.title_en}
                onChange={(e) => set("title_en", e.target.value)}
              />
            </Field>
            <Field label="Datum">
              <input
                type="date"
                className="input"
                value={editing.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </Field>
          </div>

          <Field label="Kurztext (Deutsch) - erscheint auf der Übersicht">
            <textarea
              rows={2}
              className="input"
              value={editing.excerpt_de}
              onChange={(e) => set("excerpt_de", e.target.value)}
            />
          </Field>

          <Field label="Volltext (Deutsch) - erscheint nach Klick auf den Beitrag">
            <RichTextEditor
              value={editing.body_de}
              onChange={(v) => set("body_de", v)}
              placeholder="Beschreibung, Erzählung, Bericht … Überschriften, Absätze, Textgrößen über die Toolbar."
            />
          </Field>

          <details className="rounded-xl border border-royal-700/10 bg-cream-50 p-4">
            <summary className="cursor-pointer text-[12px] font-semibold text-neutral-700">
              Englische Übersetzung (optional)
            </summary>
            <div className="mt-3 grid gap-3">
              <Field label="Kurztext (Englisch)">
                <textarea
                  rows={2}
                  className="input"
                  value={editing.excerpt_en}
                  onChange={(e) => set("excerpt_en", e.target.value)}
                />
              </Field>
              <Field label="Volltext (Englisch)">
                <RichTextEditor
                  value={editing.body_en}
                  onChange={(v) => set("body_en", v)}
                />
              </Field>
            </div>
          </details>

          <AdminImageUpload
            label="Titelbild (Thumbnail in der Übersicht)"
            folder="galleries"
            value={editing.cover_url}
            onChange={(url) => set("cover_url", url)}
          />

          <div>
            <div className="mb-2 text-[12px] font-medium text-neutral-700">
              Weitere Bilder für die Galerie (werden auf der Detailseite als Swipe-Galerie angezeigt)
            </div>
            <div className="space-y-3">
              {editing.images.map((img, i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-start gap-3 rounded-xl border border-royal-700/10 bg-cream-50 p-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.image_url}
                    alt=""
                    className="h-20 w-28 flex-shrink-0 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-[220px] space-y-2">
                    <input
                      className="input"
                      placeholder="Bildunterschrift (optional)"
                      value={img.caption_de}
                      onChange={(e) => {
                        const next = [...editing.images];
                        next[i] = { ...next[i], caption_de: e.target.value };
                        set("images", next);
                      }}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (i === 0) return;
                          const next = [...editing.images];
                          [next[i - 1], next[i]] = [next[i], next[i - 1]];
                          set("images", next);
                        }}
                        className="rounded-full border border-royal-700/15 bg-white px-3 py-1 text-[11px] font-semibold text-royal-800 hover:border-gold-300"
                      >
                        ↑ Nach oben
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (i === editing.images.length - 1) return;
                          const next = [...editing.images];
                          [next[i + 1], next[i]] = [next[i], next[i + 1]];
                          set("images", next);
                        }}
                        className="rounded-full border border-royal-700/15 bg-white px-3 py-1 text-[11px] font-semibold text-royal-800 hover:border-gold-300"
                      >
                        ↓ Nach unten
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          set(
                            "images",
                            editing.images.filter((_, idx) => idx !== i)
                          )
                        }
                        className="rounded-full border border-royal-700/15 bg-white px-3 py-1 text-[11px] font-semibold text-neutral-700 hover:border-rose-300 hover:text-rose-700"
                      >
                        Entfernen
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                <button
                  type="button"
                  onClick={() => imgInput.current?.click()}
                  disabled={uploadingImage}
                  className="rounded-full border border-royal-700/15 bg-white px-4 py-2 text-[12px] font-semibold text-royal-800 hover:border-gold-300 disabled:opacity-60"
                >
                  {uploadingImage ? "Lade hoch …" : "+ Bild hinzufügen"}
                </button>
                <input
                  ref={imgInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadImage(f);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Sortier-Reihenfolge (niedriger = weiter oben)">
              <input
                type="number"
                className="input"
                value={editing.sort_order}
                onChange={(e) => set("sort_order", Number(e.target.value) || 0)}
              />
            </Field>
            <label className="mt-6 flex items-center gap-3 text-[13px]">
              <input
                type="checkbox"
                checked={editing.archived}
                onChange={(e) => set("archived", e.target.checked)}
                className="h-4 w-4 rounded border-royal-700/30"
              />
              Archiviert (nicht öffentlich sichtbar)
            </label>
          </div>

          {error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[13px] text-rose-900">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-full border border-royal-700/15 bg-white px-5 py-2 text-[13px] font-semibold text-neutral-700 hover:text-royal-800"
            >
              Abbrechen
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="btn-primary disabled:opacity-60"
            >
              {saving ? "Speichert …" : "Speichern"}
            </button>
          </div>
        </div>

        <style jsx>{`
          .input {
            width: 100%;
            border: 1px solid rgba(31, 59, 130, 0.15);
            border-radius: 12px;
            background: white;
            padding: 0.55rem 0.85rem;
            font-size: 14px;
            outline: none;
          }
          .input:focus {
            border-color: #d4af37;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="display text-xl text-royal-800">Beiträge / Galerien ({items.length})</h3>
        <button
          type="button"
          onClick={() => setEditing(empty())}
          className="btn-primary"
        >
          + Neuer Beitrag
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-royal-700/10 bg-white">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-cream-100/70 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
              <th className="px-4 py-3">Datum</th>
              <th className="px-4 py-3">Titel</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Aktion</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-neutral-500">
                  Lädt …
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-neutral-500">
                  Noch keine Beiträge.
                </td>
              </tr>
            )}
            {items.map((g) => (
              <tr key={g.id} className="border-t border-royal-700/8 align-top">
                <td className="px-4 py-3 whitespace-nowrap text-neutral-600">
                  {g.date ?? "—"}
                </td>
                <td className="px-4 py-3 text-royal-800">{g.title_de}</td>
                <td className="px-4 py-3">
                  {g.archived ? (
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-500">
                      archiviert
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
                      öffentlich
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(g)}
                      className="rounded-full border border-royal-700/15 bg-white px-3 py-1.5 text-[11px] font-semibold text-royal-800 hover:border-gold-300"
                    >
                      Bearbeiten
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(g.id)}
                      className="rounded-full border border-royal-700/15 bg-white px-3 py-1.5 text-[11px] font-semibold text-royal-800 hover:border-rose-300 hover:text-rose-700"
                    >
                      Löschen
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[12px] font-medium text-neutral-700">{label}</span>
      {children}
    </label>
  );
}
