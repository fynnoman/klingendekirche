"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { buildIndex, search, type SearchDoc } from "@/lib/searchIndex";
import { useLang } from "@/components/LanguageProvider";

export default function SuchePage() {
  const [q, setQ] = useState("");
  const { lang, t } = useLang();
  const index = useMemo(() => buildIndex(lang), [lang]);
  const results: SearchDoc[] = useMemo(() => search(q, index), [q, index]);

  return (
    <>
      <PageHero
        eyebrow={t("header.search")}
        title={t("search.title")}
        subtitle={t("search.subtitle")}
      />

      <section className="py-12">
        <div className="container-rail">
          <div className="flex items-center gap-3 rounded-2xl border border-royal-700/15 bg-white px-5 py-4 shadow-card">
            <svg
              width="22"
              height="22"
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
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search.placeholder")}
              className="w-full bg-transparent text-base outline-none placeholder:text-neutral-400"
            />
          </div>

          <div className="mt-8">
            {q.trim().length < 2 && (
              <div className="rounded-2xl border border-dashed border-royal-700/15 p-10 text-center text-sm text-neutral-500">
                {t("search.min_chars")}
              </div>
            )}

            {q.trim().length >= 2 && results.length === 0 && (
              <div className="rounded-2xl border border-dashed border-royal-700/15 p-10 text-center text-sm text-neutral-500">
                {t("search.no_hits_prefix")} „{q}".
              </div>
            )}

            {results.length > 0 && (
              <ul className="divide-y divide-royal-700/10 overflow-hidden rounded-2xl border border-royal-700/10 bg-white shadow-card">
                {results.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={r.href}
                      className="group flex items-start gap-5 px-5 py-4 transition hover:bg-cream-100/70 sm:px-7 sm:py-5"
                    >
                      <div className="mt-1 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-600">
                        {r.category}
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-medium text-royal-800 group-hover:text-royal-700">
                          {r.title}
                        </div>
                        <div className="mt-1 text-sm leading-relaxed text-neutral-600">
                          {r.snippet}
                        </div>
                      </div>
                      <span className="mt-1 text-royal-700 group-hover:text-gold-600">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
