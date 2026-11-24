"use client";

import { useCallback, useEffect, useState } from "react";
import type { MemberKind } from "@/lib/content/types";

export default function MembersEditor() {
  const now = new Date().getFullYear();
  const [kind, setKind] = useState<MemberKind>("new");
  const [year, setYear] = useState<number>(now);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setFeedback(null);
    const res = await fetch(
      `/api/admin/content/members?kind=${kind}&year=${year}`,
      { cache: "no-store" }
    );
    const data = await res.json().catch(() => ({}));
    if (data?.ok) {
      setText((data.items as { name: string }[]).map((m) => m.name).join("\n"));
    } else {
      setText("");
    }
    setLoading(false);
  }, [kind, year]);

  useEffect(() => {
    load();
  }, [load]);

  async function save() {
    setSaving(true);
    setError(null);
    setFeedback(null);
    const names = text
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const res = await fetch("/api/admin/content/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, year, names })
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok || data?.ok === false) {
      setError(data?.error ?? `${res.status}`);
      return;
    }
    setFeedback(`${names.length} Einträge für ${year} gespeichert.`);
  }

  const years: number[] = [];
  for (let y = now + 1; y >= now - 10; y--) years.push(y);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="display text-xl text-royal-800">Mitgliederlisten</h3>
      </div>

      <div className="flex flex-wrap gap-3 rounded-2xl border border-royal-700/10 bg-white p-4">
        <nav className="inline-flex rounded-full border border-royal-700/15 bg-white p-1 text-[13px]">
          {(
            [
              ["new", "Neue Mitglieder"],
              ["deceased", "Verstorbene Mitglieder"]
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={`rounded-full px-4 py-1.5 font-semibold transition ${
                kind === k
                  ? "bg-royal-800 text-cream-50"
                  : "text-neutral-600 hover:text-royal-800"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
        <label className="flex items-center gap-2 text-[13px]">
          <span className="text-neutral-600">Jahr</span>
          <select
            className="rounded-full border border-royal-700/15 bg-white px-3 py-1.5 text-[13px]"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-3 rounded-2xl border border-royal-700/10 bg-white p-6">
        <div className="text-[12px] font-medium text-neutral-700">
          Ein Name pro Zeile. Beispiel: „Ernst Schmitt, Ensdorf"
        </div>
        {loading ? (
          <div className="py-8 text-center text-neutral-500">Lädt …</div>
        ) : (
          <textarea
            rows={16}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-xl border border-royal-700/15 bg-white px-4 py-3 text-[14px] outline-none focus:border-gold-400"
            placeholder="Ernst Schmitt, Ensdorf&#10;Dr. Cordelia Rose, Schwanewede&#10;…"
          />
        )}
        {feedback && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[13px] text-emerald-900">
            {feedback}
          </div>
        )}
        {error && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[13px] text-rose-900">
            {error}
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={save}
            disabled={saving || loading}
            className="btn-primary disabled:opacity-60"
          >
            {saving ? "Speichert …" : "Liste speichern"}
          </button>
        </div>
      </div>
    </div>
  );
}
