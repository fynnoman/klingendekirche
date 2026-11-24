"use client";

import { useEffect, useState } from "react";
import AdminImageUpload from "@/components/AdminImageUpload";
import type { PartnerRow } from "@/lib/content/types";

type FormState = {
  id: number | null;
  name_de: string;
  name_en: string;
  logo_url: string;
  website_url: string;
  note_de: string;
  note_en: string;
  sort_order: number;
  archived: boolean;
};

function empty(): FormState {
  return {
    id: null,
    name_de: "",
    name_en: "",
    logo_url: "",
    website_url: "",
    note_de: "",
    note_en: "",
    sort_order: 0,
    archived: false
  };
}

export default function PartnerEditor() {
  const [items, setItems] = useState<PartnerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    setLoading(true);
    const res = await fetch("/api/admin/content/partners", { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (data?.ok) setItems(data.items as PartnerRow[]);
    setLoading(false);
  }

  useEffect(() => {
    reload();
  }, []);

  async function save() {
    if (!editing) return;
    if (!editing.logo_url) {
      setError("Bitte ein Logo hochladen.");
      return;
    }
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/content/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editing, id: editing.id ?? undefined })
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

  async function remove(id: number) {
    if (!confirm("Diesen Partner löschen?")) return;
    await fetch(`/api/admin/content/partners?id=${id}`, { method: "DELETE" });
    await reload();
  }

  if (editing) {
    const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
      setEditing({ ...editing, [k]: v });
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="display text-xl text-royal-800">
            {editing.id ? "Partner bearbeiten" : "Neuer Partner"}
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
          <Field label="Name (Deutsch)*">
            <input
              className="input"
              value={editing.name_de}
              onChange={(e) => set("name_de", e.target.value)}
            />
          </Field>
          <Field label="Name (Englisch, optional)">
            <input
              className="input"
              value={editing.name_en}
              onChange={(e) => set("name_en", e.target.value)}
            />
          </Field>
          <Field label="Website (optional)">
            <input
              className="input"
              placeholder="https://…"
              value={editing.website_url}
              onChange={(e) => set("website_url", e.target.value)}
            />
          </Field>
          <Field label={'Zusatz (Deutsch, optional, z.B. „Orgelbaumeister")'}>
            <input
              className="input"
              value={editing.note_de}
              onChange={(e) => set("note_de", e.target.value)}
            />
          </Field>
          <AdminImageUpload
            label="Logo*"
            folder="partners"
            aspect="square"
            value={editing.logo_url || null}
            onChange={(url) => set("logo_url", url ?? "")}
          />
          <Field label="Sortier-Reihenfolge (niedriger = weiter vorne)">
            <input
              type="number"
              className="input"
              value={editing.sort_order}
              onChange={(e) => set("sort_order", Number(e.target.value) || 0)}
            />
          </Field>
          <label className="flex items-center gap-3 text-[13px]">
            <input
              type="checkbox"
              checked={editing.archived}
              onChange={(e) => set("archived", e.target.checked)}
              className="h-4 w-4 rounded border-royal-700/30"
            />
            Nicht öffentlich anzeigen
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
        <h3 className="display text-xl text-royal-800">Partner ({items.length})</h3>
        <button
          type="button"
          onClick={() => setEditing(empty())}
          className="btn-primary"
        >
          + Neuer Partner
        </button>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-royal-700/10 bg-white px-4 py-8 text-center text-neutral-500">
          Lädt …
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-royal-700/10 bg-white px-4 py-8 text-center text-neutral-500">
          Noch keine Partner.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <div
              key={p.id}
              className="flex items-start gap-4 rounded-2xl border border-royal-700/10 bg-white p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logo_url}
                alt=""
                className="h-16 w-16 flex-shrink-0 rounded-md border border-royal-700/10 bg-white object-contain p-1"
              />
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium text-royal-800">
                  {p.name_de}
                </div>
                {p.note_de && (
                  <div className="text-[11.5px] text-neutral-500">{p.note_de}</div>
                )}
                {p.archived && (
                  <span className="mt-1 inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-500">
                    nicht öffentlich
                  </span>
                )}
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setEditing({
                        id: p.id,
                        name_de: p.name_de,
                        name_en: p.name_en ?? "",
                        logo_url: p.logo_url,
                        website_url: p.website_url ?? "",
                        note_de: p.note_de ?? "",
                        note_en: p.note_en ?? "",
                        sort_order: p.sort_order,
                        archived: p.archived
                      })
                    }
                    className="rounded-full border border-royal-700/15 bg-cream-50 px-3 py-1 text-[11px] font-semibold text-royal-800 hover:border-gold-300"
                  >
                    Bearbeiten
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(p.id)}
                    className="rounded-full border border-royal-700/15 bg-cream-50 px-3 py-1 text-[11px] font-semibold text-neutral-700 hover:border-rose-300 hover:text-rose-700"
                  >
                    Löschen
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
