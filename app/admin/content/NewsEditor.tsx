"use client";

import { useEffect, useState } from "react";
import AdminImageUpload from "@/components/AdminImageUpload";
import RichTextEditor from "@/components/RichTextEditor";
import type { NewsRow } from "@/lib/content/types";

type FormState = {
  id: string;
  title_de: string;
  title_en: string;
  excerpt_de: string;
  excerpt_en: string;
  body_de: string;
  body_en: string;
  category_de: string;
  category_en: string;
  image_url: string | null;
  published_at: string;
  archived: boolean;
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
    category_de: "",
    category_en: "",
    image_url: null,
    published_at: new Date().toISOString().slice(0, 10),
    archived: false
  };
}

function fromRow(r: NewsRow): FormState {
  return {
    id: r.id,
    title_de: r.title_de,
    title_en: r.title_en ?? "",
    excerpt_de: r.excerpt_de ?? "",
    excerpt_en: r.excerpt_en ?? "",
    body_de: r.body_de ?? "",
    body_en: r.body_en ?? "",
    category_de: r.category_de ?? "",
    category_en: r.category_en ?? "",
    image_url: r.image_url,
    published_at: r.published_at,
    archived: r.archived
  };
}

export default function NewsEditor() {
  const [items, setItems] = useState<NewsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    setLoading(true);
    const res = await fetch("/api/admin/content/news", { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (data?.ok) setItems(data.items as NewsRow[]);
    setLoading(false);
  }

  useEffect(() => {
    reload();
  }, []);

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/content/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editing.id || undefined,
        title_de: editing.title_de,
        title_en: editing.title_en,
        excerpt_de: editing.excerpt_de,
        excerpt_en: editing.excerpt_en,
        body_de: editing.body_de,
        body_en: editing.body_en,
        category_de: editing.category_de,
        category_en: editing.category_en,
        image_url: editing.image_url,
        published_at: editing.published_at,
        archived: editing.archived
      })
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok || data?.ok === false) {
      setError(data?.error ?? `${res.status}`);
      return;
    }
    setEditing(null);
    await reload();
  }

  async function remove(id: string) {
    if (!confirm("Diesen News-Artikel löschen?")) return;
    await fetch(`/api/admin/content/news?id=${encodeURIComponent(id)}`, {
      method: "DELETE"
    });
    await reload();
  }

  if (editing) {
    const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
      setEditing({ ...editing, [k]: v });
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="display text-xl text-royal-800">
            {editing.id ? "News bearbeiten" : "Neuer News-Artikel"}
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
          <Field label="Titel (Englisch, optional)">
            <input
              className="input"
              value={editing.title_en}
              onChange={(e) => set("title_en", e.target.value)}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Kategorie (Deutsch)">
              <input
                className="input"
                placeholder="z.B. Orgel, Spendenaktion, Mitmachen"
                value={editing.category_de}
                onChange={(e) => set("category_de", e.target.value)}
              />
            </Field>
            <Field label="Datum*">
              <input
                type="date"
                className="input"
                value={editing.published_at}
                onChange={(e) => set("published_at", e.target.value)}
              />
            </Field>
          </div>

          <Field label="Kurztext für die Übersicht (Deutsch)">
            <textarea
              rows={2}
              className="input"
              value={editing.excerpt_de}
              onChange={(e) => set("excerpt_de", e.target.value)}
            />
          </Field>

          <Field label="Volltext (Deutsch)">
            <RichTextEditor
              value={editing.body_de}
              onChange={(v) => set("body_de", v)}
              placeholder="Artikeltext … Überschriften, Absätze, Listen - nutze die Toolbar."
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
            label="Titelbild"
            folder="news"
            value={editing.image_url}
            onChange={(url) => set("image_url", url)}
          />

          <label className="flex items-center gap-3 text-[13px]">
            <input
              type="checkbox"
              checked={editing.archived}
              onChange={(e) => set("archived", e.target.checked)}
              className="h-4 w-4 rounded border-royal-700/30"
            />
            Archiviert (nicht öffentlich sichtbar)
          </label>

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
        <h3 className="display text-xl text-royal-800">News ({items.length})</h3>
        <button
          type="button"
          onClick={() => setEditing(empty())}
          className="btn-primary"
        >
          + Neuer Artikel
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-royal-700/10 bg-white">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-cream-100/70 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
              <th className="px-4 py-3">Datum</th>
              <th className="px-4 py-3">Titel</th>
              <th className="px-4 py-3">Kategorie</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Aktion</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                  Lädt …
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                  Noch keine Artikel.
                </td>
              </tr>
            )}
            {items.map((n) => (
              <tr key={n.id} className="border-t border-royal-700/8 align-top">
                <td className="px-4 py-3 whitespace-nowrap text-neutral-600">
                  {n.published_at}
                </td>
                <td className="px-4 py-3 text-royal-800">{n.title_de}</td>
                <td className="px-4 py-3 text-neutral-600">{n.category_de ?? "—"}</td>
                <td className="px-4 py-3">
                  {n.archived ? (
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
                      onClick={() => setEditing(fromRow(n))}
                      className="rounded-full border border-royal-700/15 bg-white px-3 py-1.5 text-[11px] font-semibold text-royal-800 hover:border-gold-300"
                    >
                      Bearbeiten
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(n.id)}
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
