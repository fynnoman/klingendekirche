"use client";

import { useEffect, useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import type { PageBlockRow } from "@/lib/content/types";
import { adminGet, adminPost, AdminFetchError } from "@/lib/adminFetch";

const KEY_LABELS: Record<string, string> = {
  "home.intro": "Startseite - Einleitungstext",
  "verein.intro": "Verein - Einleitung",
  "verein.history": "Verein - Geschichte",
  "orgel.intro": "Orgel - Einleitung",
  "kirche.intro": "Kirche - Einleitung"
};

export default function BlocksEditor() {
  const [allowed, setAllowed] = useState<string[]>([]);
  const [items, setItems] = useState<Record<string, PageBlockRow>>({});
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      try {
        const data = await adminGet<{
          ok: boolean;
          allowed: string[];
          items: PageBlockRow[];
        }>("/api/admin/content/blocks");
        if (data?.ok) {
          setAllowed(data.allowed ?? []);
          const map: Record<string, PageBlockRow> = {};
          for (const it of data.items ?? []) map[it.key] = it;
          setItems(map);
        }
      } catch (err) {
        if (err instanceof AdminFetchError && err.status === 401) return;
        setFeedback({ global: err instanceof Error ? err.message : "Laden fehlgeschlagen." });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function save(key: string) {
    setSaving({ ...saving, [key]: true });
    setFeedback({ ...feedback, [key]: "" });
    const current = items[key] ?? { key, body_de: "", body_en: "", updated_at: "" };
    try {
      const data = await adminPost<{ ok: boolean; item: PageBlockRow }>(
        "/api/admin/content/blocks",
        {
          key,
          body_de: current.body_de,
          body_en: current.body_en
        }
      );
      if (data?.ok) {
        setItems({ ...items, [key]: data.item });
        setFeedback({ ...feedback, [key]: "Gespeichert." });
      }
    } catch (err) {
      if (err instanceof AdminFetchError && err.status === 401) return;
      setFeedback({
        ...feedback,
        [key]: `Fehler: ${err instanceof Error ? err.message : "unbekannt"}`
      });
    } finally {
      setSaving({ ...saving, [key]: false });
    }
  }

  function setBody(key: string, lang: "de" | "en", val: string) {
    const cur = items[key] ?? { key, body_de: "", body_en: "", updated_at: "" };
    setItems({
      ...items,
      [key]: { ...cur, [lang === "de" ? "body_de" : "body_en"]: val }
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="display text-xl text-royal-800">Freitext-Blöcke</h3>
        <p className="mt-1 text-[13px] text-neutral-600">
          Diese Texte erscheinen als Einleitung auf den jeweiligen Seiten. Wenn ein
          Block leer ist, wird stattdessen der Standardtext aus dem Code verwendet.
        </p>
      </div>
      {loading ? (
        <div className="rounded-2xl border border-royal-700/10 bg-white px-4 py-8 text-center text-neutral-500">
          Lädt …
        </div>
      ) : (
        <div className="space-y-6">
          {allowed.map((key) => {
            const it = items[key] ?? { key, body_de: "", body_en: "", updated_at: "" };
            return (
              <div
                key={key}
                className="space-y-3 rounded-2xl border border-royal-700/10 bg-white p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[13px] font-semibold text-royal-800">
                      {KEY_LABELS[key] ?? key}
                    </div>
                    <div className="font-mono text-[10.5px] text-neutral-500">
                      {key}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => save(key)}
                    disabled={saving[key]}
                    className="rounded-full bg-royal-800 px-4 py-1.5 text-[12px] font-semibold text-cream-50 hover:bg-royal-700 disabled:opacity-60"
                  >
                    {saving[key] ? "Speichert …" : "Speichern"}
                  </button>
                </div>
                <RichTextEditor
                  value={it.body_de}
                  onChange={(v) => setBody(key, "de", v)}
                  placeholder="Deutscher Text für diesen Block …"
                  minHeight={160}
                />
                <details className="rounded-lg border border-royal-700/10 bg-cream-50 p-3">
                  <summary className="cursor-pointer text-[11.5px] font-semibold text-neutral-700">
                    Englische Übersetzung (optional)
                  </summary>
                  <div className="mt-2">
                    <RichTextEditor
                      value={it.body_en}
                      onChange={(v) => setBody(key, "en", v)}
                      minHeight={140}
                    />
                  </div>
                </details>
                {feedback[key] && (
                  <div className="text-[12px] text-emerald-700">{feedback[key]}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
