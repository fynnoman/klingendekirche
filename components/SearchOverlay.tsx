"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { buildIndex, search, type SearchDoc } from "@/lib/searchIndex";
import { useLang } from "./LanguageProvider";

export default function SearchOverlay({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { lang, t } = useLang();
  const index = useMemo(() => buildIndex(lang), [lang]);
  const results: SearchDoc[] = useMemo(() => search(q, index), [q, index]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-royal-900/40 px-4 pt-16 backdrop-blur-sm sm:pt-24">
      <div
        aria-hidden
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-royal-700/15 bg-white shadow-plate">
        <div className="flex items-center gap-3 border-b border-royal-700/10 px-5 py-4">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="text-royal-700"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search.overlay_placeholder")}
            className="w-full bg-transparent text-base outline-none placeholder:text-neutral-400"
          />
          <button
            onClick={onClose}
            className="rounded-full border border-royal-700/10 px-3 py-1 text-[11px] uppercase tracking-wider text-neutral-500 hover:text-royal-800"
          >
            Esc
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-2 py-2">
          {q.trim().length < 2 && (
            <div className="px-4 py-10 text-center text-sm text-neutral-500">
              {t("search.overlay_hint")}
            </div>
          )}

          {q.trim().length >= 2 && results.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-neutral-500">
              {t("search.overlay_empty")}
            </div>
          )}

          <ul className="divide-y divide-royal-700/5">
            {results.map((r) => (
              <li key={r.id}>
                <Link
                  href={r.href}
                  onClick={onClose}
                  className="group flex items-start gap-4 rounded-xl px-4 py-3 transition hover:bg-cream-100/70"
                >
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-600 whitespace-nowrap">
                    {r.category}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-royal-800 group-hover:text-royal-700">
                      {r.title}
                    </div>
                    <div className="mt-1 text-[13px] leading-relaxed text-neutral-600">
                      {r.snippet}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
