"use client";

import { useRef, useState } from "react";
import type { EventCategory, EventRow } from "@/lib/tickets/types";
import { adminFetch, AdminFetchError } from "@/lib/adminFetch";

type Props = {
  initial: EventRow | null;
  onClose: () => void;
};

const CATEGORIES: EventCategory[] = [
  "Konzert",
  "Orgel",
  "Vortrag",
  "Chor",
  "Besonderes"
];

type FormState = {
  title_de: string;
  title_en: string;
  subtitle_de: string;
  subtitle_en: string;
  date: string;
  time: string;
  venue_de: string;
  venue_en: string;
  description_de: string;
  description_en: string;
  category: EventCategory;
  image_url: string;
  price_eur: string;
  price_reduced_eur: string;
  capacity: string;
  sale_active: boolean;
  highlight: boolean;
  archived: boolean;
};

function initialState(ev: EventRow | null): FormState {
  if (!ev) {
    return {
      title_de: "",
      title_en: "",
      subtitle_de: "",
      subtitle_en: "",
      date: "",
      time: "",
      venue_de: "Kath. Pfarrkirche St. Crispinus und Crispinianus, Lisdorf",
      venue_en: "",
      description_de: "",
      description_en: "",
      category: "Konzert",
      image_url: "",
      price_eur: "0.00",
      price_reduced_eur: "",
      capacity: "0",
      sale_active: false,
      highlight: false,
      archived: false
    };
  }
  return {
    title_de: ev.title_de,
    title_en: ev.title_en ?? "",
    subtitle_de: ev.subtitle_de ?? "",
    subtitle_en: ev.subtitle_en ?? "",
    date: ev.date,
    time: ev.time ?? "",
    venue_de: ev.venue_de,
    venue_en: ev.venue_en ?? "",
    description_de: ev.description_de,
    description_en: ev.description_en ?? "",
    category: ev.category,
    image_url: ev.image_url ?? "",
    price_eur: (ev.price_cents / 100).toFixed(2),
    price_reduced_eur:
      ev.price_reduced_cents && ev.price_reduced_cents > 0
        ? (ev.price_reduced_cents / 100).toFixed(2)
        : "",
    capacity: String(ev.capacity),
    sale_active: ev.sale_active,
    highlight: ev.highlight,
    archived: ev.archived
  };
}

export default function EventEditor({ initial, onClose }: Props) {
  const [form, setForm] = useState<FormState>(initialState(initial));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const isEdit = !!initial;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function uploadFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const data = await adminFetch<{ ok: boolean; url: string; hint?: string }>(
        "/api/admin/upload",
        { method: "POST", body: fd }
      );
      if (!data?.ok) {
        setError("Upload fehlgeschlagen.");
        return;
      }
      set("image_url", data.url);
    } catch (err) {
      if (err instanceof AdminFetchError && err.status === 401) return;
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    setSaving(true);
    setError(null);
    setWarning(null);

    const priceEur = parseFloat(form.price_eur.replace(",", "."));
    if (!Number.isFinite(priceEur) || priceEur < 0) {
      setError("Preis ungültig.");
      setSaving(false);
      return;
    }
    let priceReducedCents: number | null = null;
    if (form.price_reduced_eur.trim() !== "") {
      const reducedEur = parseFloat(form.price_reduced_eur.replace(",", "."));
      if (!Number.isFinite(reducedEur) || reducedEur < 0) {
        setError("Ermäßigter Preis ungültig.");
        setSaving(false);
        return;
      }
      priceReducedCents = reducedEur > 0 ? Math.round(reducedEur * 100) : null;
    }
    const capacity = parseInt(form.capacity, 10);
    if (!Number.isFinite(capacity) || capacity < 0) {
      setError("Kapazität ungültig.");
      setSaving(false);
      return;
    }

    const payload = {
      id: initial?.id,
      title_de: form.title_de,
      title_en: form.title_en || null,
      subtitle_de: form.subtitle_de || null,
      subtitle_en: form.subtitle_en || null,
      date: form.date,
      time: form.time || null,
      venue_de: form.venue_de,
      venue_en: form.venue_en || null,
      description_de: form.description_de,
      description_en: form.description_en || null,
      category: form.category,
      image_url: form.image_url || null,
      price_cents: Math.round(priceEur * 100),
      price_reduced_cents: priceReducedCents,
      capacity,
      sale_active: form.sale_active,
      highlight: form.highlight,
      archived: form.archived
    };

    try {
      const data = await adminFetch<{
        ok: boolean;
        warning?: string;
        detail?: string;
      }>("/api/admin/events", {
        method: isEdit ? "PATCH" : "POST",
        body: JSON.stringify(payload)
      });
      if (data?.warning) {
        setWarning(
          `Gespeichert, aber Hinweis: ${data.warning}${
            data.detail ? " · " + data.detail : ""
          }`
        );
        return;
      }
      onClose();
    } catch (err) {
      if (err instanceof AdminFetchError && err.status === 401) return;
      setError(err instanceof Error ? err.message : "Speichern fehlgeschlagen.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="pb-20">
      <div className="container-rail">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="display text-2xl text-royal-800 sm:text-3xl">
            {isEdit ? "Konzert bearbeiten" : "Neues Konzert"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[12px] font-semibold uppercase tracking-wider text-neutral-500 hover:text-royal-800"
          >
            Abbrechen
          </button>
        </div>

        <div className="rounded-3xl border border-royal-700/10 bg-white p-6 shadow-plate sm:p-8">
          {/* Grunddaten */}
          <h3 className="eyebrow mb-4">Grunddaten</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Titel (Deutsch)*">
              <input
                value={form.title_de}
                onChange={(e) => set("title_de", e.target.value)}
                required
                className="input"
              />
            </Field>
            <Field label="Titel (Englisch, optional)">
              <input
                value={form.title_en}
                onChange={(e) => set("title_en", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Untertitel (Deutsch)">
              <input
                value={form.subtitle_de}
                onChange={(e) => set("subtitle_de", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Untertitel (Englisch)">
              <input
                value={form.subtitle_en}
                onChange={(e) => set("subtitle_en", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Datum*">
              <input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                required
                className="input"
              />
            </Field>
            <Field label="Uhrzeit (z.B. 19:30 Uhr)">
              <input
                value={form.time}
                onChange={(e) => set("time", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Ort (Deutsch)*">
              <input
                value={form.venue_de}
                onChange={(e) => set("venue_de", e.target.value)}
                required
                className="input"
              />
            </Field>
            <Field label="Ort (Englisch)">
              <input
                value={form.venue_en}
                onChange={(e) => set("venue_en", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Kategorie">
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value as EventCategory)}
                className="input"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Beschreibung (Deutsch)*" className="mt-4">
            <textarea
              value={form.description_de}
              onChange={(e) => set("description_de", e.target.value)}
              required
              rows={5}
              className="input min-h-[120px]"
            />
          </Field>
          <Field label="Beschreibung (Englisch)" className="mt-4">
            <textarea
              value={form.description_en}
              onChange={(e) => set("description_en", e.target.value)}
              rows={5}
              className="input min-h-[120px]"
            />
          </Field>

          {/* Bild */}
          <h3 className="eyebrow mt-10 mb-4">Bild</h3>
          <div className="flex flex-wrap items-start gap-5">
            <div className="h-32 w-44 overflow-hidden rounded-xl border border-royal-700/10 bg-cream-100/70">
              {form.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.image_url}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[11px] text-neutral-500">
                  kein Bild
                </div>
              )}
            </div>
            <div className="flex-1 min-w-[240px] space-y-3">
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                disabled={uploading}
                className="rounded-full border border-royal-700/15 bg-white px-4 py-2 text-[13px] font-semibold text-royal-800 transition hover:border-gold-300 disabled:opacity-60"
              >
                {uploading ? "Lade hoch …" : "Datei auswählen"}
              </button>
              <input
                ref={fileInput}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadFile(f);
                }}
              />
              <div className="text-[12px] text-neutral-500">
                JPEG, PNG, WebP, AVIF, max 5 MB. Oder URL eintragen:
              </div>
              <input
                value={form.image_url}
                onChange={(e) => set("image_url", e.target.value)}
                placeholder="https://…"
                className="input"
              />
            </div>
          </div>

          {/* Verkauf */}
          <h3 className="eyebrow mt-10 mb-4">Ticketverkauf</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Preis pro Karte (€)">
              <input
                type="number"
                min="0"
                step="0.50"
                value={form.price_eur}
                onChange={(e) => set("price_eur", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Ermäßigter Preis (€, leer = keine Ermäßigung)">
              <input
                type="number"
                min="0"
                step="0.50"
                value={form.price_reduced_eur}
                onChange={(e) => set("price_reduced_eur", e.target.value)}
                placeholder="z.B. für Schüler / Studenten"
                className="input"
              />
            </Field>
            <Field label="Kapazität (0 = nur Ankündigung, ohne Verkauf)">
              <input
                type="number"
                min="0"
                step="1"
                value={form.capacity}
                onChange={(e) => set("capacity", e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Toggle
              label="Verkauf aktiv"
              hint='Zeigt den „Karten bestellen"-Button auf der Website.'
              checked={form.sale_active}
              onChange={(v) => set("sale_active", v)}
            />
            <Toggle
              label="Als Highlight auf Startseite"
              checked={form.highlight}
              onChange={(v) => set("highlight", v)}
            />
            <Toggle
              label="Archiviert"
              hint="Blendet das Konzert aus der Website aus."
              checked={form.archived}
              onChange={(v) => set("archived", v)}
            />
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13.5px] text-rose-900">
              {error}
            </div>
          )}
          {warning && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13.5px] text-amber-900">
              {warning}
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-royal-700/15 bg-white px-5 py-2.5 text-[13px] font-semibold text-neutral-700 hover:text-royal-800"
            >
              Abbrechen
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving || uploading}
              className="btn-primary disabled:opacity-60"
            >
              {saving ? "Speichert …" : isEdit ? "Änderungen speichern" : "Konzert anlegen"}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid rgba(var(--royal-700-rgb, 31 59 130) / 0.15);
          border-radius: 12px;
          background: white;
          padding: 0.6rem 0.9rem;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s;
        }
        .input:focus {
          border-color: #d4af37;
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  className = "",
  children
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`grid gap-1.5 ${className}`}>
      <span className="text-[12px] font-medium text-neutral-700">{label}</span>
      {children}
    </label>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-royal-700/10 bg-cream-100/40 p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-royal-700/30"
      />
      <div>
        <div className="text-[13px] font-semibold text-royal-800">{label}</div>
        {hint && <div className="text-[11px] text-neutral-500">{hint}</div>}
      </div>
    </label>
  );
}
