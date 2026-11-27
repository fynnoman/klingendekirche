"use client";

import { useEffect, useState } from "react";
import type { BoardMemberRow } from "@/lib/content/types";
import { adminDelete, adminGet, adminPost, AdminFetchError } from "@/lib/adminFetch";

export default function BoardEditor() {
  const [items, setItems] = useState<BoardMemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    setLoading(true);
    setError(null);
    try {
      const data = await adminGet<{ ok: boolean; items: BoardMemberRow[] }>(
        "/api/admin/content/board"
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

  function updateLocal(id: number | null, patch: Partial<BoardMemberRow>) {
    setItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch } : m))
    );
  }

  async function saveOne(m: BoardMemberRow) {
    setSaving(true);
    setError(null);
    try {
      await adminPost("/api/admin/content/board", {
        id: m.id > 0 ? m.id : undefined,
        role_de: m.role_de,
        role_en: m.role_en,
        name: m.name,
        sort_order: m.sort_order
      });
      await reload();
    } catch (err) {
      if (err instanceof AdminFetchError && err.status === 401) return;
      setError(err instanceof Error ? err.message : "Speichern fehlgeschlagen.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("Diesen Vorstandseintrag löschen?")) return;
    setError(null);
    try {
      await adminDelete(`/api/admin/content/board?id=${id}`);
      await reload();
    } catch (err) {
      if (err instanceof AdminFetchError && err.status === 401) return;
      setError(err instanceof Error ? err.message : "Löschen fehlgeschlagen.");
    }
  }

  function addRow() {
    setItems((prev) => [
      ...prev,
      {
        id: -(Date.now()),
        role_de: "",
        role_en: null,
        name: "",
        sort_order: prev.length,
        created_at: "",
        updated_at: ""
      }
    ]);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="display text-xl text-royal-800">Vorstand ({items.length})</h3>
        <button type="button" onClick={addRow} className="btn-primary">
          + Eintrag
        </button>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-royal-700/10 bg-white px-4 py-8 text-center text-neutral-500">
          Lädt …
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((m) => (
            <div
              key={m.id}
              className="grid gap-3 rounded-2xl border border-royal-700/10 bg-white p-4 sm:grid-cols-[1fr_1fr_80px_auto]"
            >
              <label className="grid gap-1">
                <span className="text-[11px] font-medium text-neutral-500">Rolle (Deutsch)</span>
                <input
                  className="input"
                  value={m.role_de}
                  onChange={(e) => updateLocal(m.id, { role_de: e.target.value })}
                />
              </label>
              <label className="grid gap-1">
                <span className="text-[11px] font-medium text-neutral-500">Name</span>
                <input
                  className="input"
                  value={m.name}
                  onChange={(e) => updateLocal(m.id, { name: e.target.value })}
                />
              </label>
              <label className="grid gap-1">
                <span className="text-[11px] font-medium text-neutral-500">Sortierung</span>
                <input
                  type="number"
                  className="input"
                  value={m.sort_order}
                  onChange={(e) =>
                    updateLocal(m.id, { sort_order: Number(e.target.value) || 0 })
                  }
                />
              </label>
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={() => saveOne(m)}
                  disabled={saving}
                  className="rounded-full bg-royal-800 px-3 py-1.5 text-[11px] font-semibold text-cream-50 hover:bg-royal-700 disabled:opacity-60"
                >
                  Speichern
                </button>
                {m.id > 0 && (
                  <button
                    type="button"
                    onClick={() => remove(m.id)}
                    className="rounded-full border border-royal-700/15 bg-white px-3 py-1.5 text-[11px] font-semibold text-neutral-700 hover:border-rose-300 hover:text-rose-700"
                  >
                    Löschen
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[13px] text-rose-900">
          {error}
        </div>
      )}
      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid rgba(31, 59, 130, 0.15);
          border-radius: 10px;
          background: white;
          padding: 0.45rem 0.75rem;
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
