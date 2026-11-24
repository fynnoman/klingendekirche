"use client";

import { useEffect, useState } from "react";

type Values = Record<string, string>;

const FIELDS: { key: string; label: string; placeholder?: string }[] = [
  { key: "phone", label: "Telefon", placeholder: "0 68 31 / 12 22 20" },
  { key: "phoneHref", label: "Telefon (Link-Format)", placeholder: "+4968311222200" },
  { key: "fax", label: "Fax" },
  { key: "email", label: "E-Mail", placeholder: "info@klingende-kirche.de" },
  { key: "address_chair_de", label: "Vorsitzender (DE)", placeholder: "Manfred Boßmann, 1. Vorsitzender" },
  { key: "address_chair_en", label: "Vorsitzender (EN)" },
  { key: "address_street", label: "Straße", placeholder: "Weißdornflur 9" },
  { key: "address_city", label: "PLZ, Ort", placeholder: "66740 Saarlouis-Lisdorf" },
  { key: "church_name_de", label: "Kirche Name (DE)", placeholder: "Kath. Pfarrkirche St. Crispinus und Crispinianus" },
  { key: "church_name_en", label: "Kirche Name (EN)" },
  { key: "church_street", label: "Kirche Straße" },
  { key: "church_city", label: "Kirche PLZ, Ort" },
  { key: "bank_name", label: "Bank" },
  { key: "bank_holder_de", label: "Kontoinhaber (DE)" },
  { key: "bank_holder_en", label: "Kontoinhaber (EN)" },
  { key: "bank_iban", label: "IBAN" },
  { key: "bank_bic", label: "BIC" }
];

export default function SettingsEditor() {
  const [values, setValues] = useState<Values>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/content/settings", { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (data?.ok) setValues((data.values as Values) ?? {});
      setLoading(false);
    })();
  }, []);

  async function save() {
    setSaving(true);
    setFeedback(null);
    const res = await fetch("/api/admin/content/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    setSaving(false);
    if (!res.ok) {
      setFeedback("Speichern fehlgeschlagen.");
      return;
    }
    setFeedback("Einstellungen gespeichert.");
  }

  return (
    <div className="space-y-4">
      <h3 className="display text-xl text-royal-800">Kontakt & Bankdaten</h3>
      <p className="text-[13px] text-neutral-600">
        Diese Daten erscheinen im Footer, auf der Kontakt-Seite und im Impressum.
      </p>

      {loading ? (
        <div className="rounded-2xl border border-royal-700/10 bg-white px-4 py-8 text-center text-neutral-500">
          Lädt …
        </div>
      ) : (
        <div className="grid gap-4 rounded-2xl border border-royal-700/10 bg-white p-6 sm:grid-cols-2">
          {FIELDS.map((f) => (
            <label key={f.key} className="grid gap-1.5">
              <span className="text-[11px] font-medium text-neutral-600">{f.label}</span>
              <input
                className="rounded-xl border border-royal-700/15 bg-white px-4 py-2 text-[14px] outline-none focus:border-gold-400"
                placeholder={f.placeholder}
                value={values[f.key] ?? ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
              />
            </label>
          ))}
        </div>
      )}

      {feedback && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[13px] text-emerald-900">
          {feedback}
        </div>
      )}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={save}
          disabled={saving || loading}
          className="btn-primary disabled:opacity-60"
        >
          {saving ? "Speichert …" : "Einstellungen speichern"}
        </button>
      </div>
    </div>
  );
}
