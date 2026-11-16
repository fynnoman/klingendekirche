"use client";
import { useMemo, useState } from "react";
import { useLang } from "./LanguageProvider";
import { l, type TR } from "@/lib/i18n";

export type ChronicleEntry = { date: string; lines: (string | TR)[] };

function parseYear(date: string) {
  const m = date.match(/(\d{4})$/);
  return m ? parseInt(m[1], 10) : 0;
}

function decadeKey(year: number) {
  const d = Math.floor(year / 10) * 10;
  return `${d}er`;
}

export default function ChronicleList({ entries }: { entries: ChronicleEntry[] }) {
  const { lang, t } = useLang();
  const grouped = useMemo(() => {
    const map = new Map<string, { year: number; items: ChronicleEntry[] }>();
    entries.forEach((e) => {
      const y = parseYear(e.date);
      const k = decadeKey(y);
      if (!map.has(k)) map.set(k, { year: Math.floor(y / 10) * 10, items: [] });
      map.get(k)!.items.push(e);
    });
    return Array.from(map.entries())
      .sort((a, b) => a[1].year - b[1].year)
      .map(([key, value]) => ({ key, ...value }));
  }, [entries]);

  const [active, setActive] = useState<string>(grouped[0]?.key ?? "");

  const scrollToDecade = (key: string) => {
    setActive(key);
    const el = document.getElementById(`decade-${key}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <aside className="lg:col-span-4 xl:col-span-3">
        <div className="lg:sticky lg:top-28">
          <div className="rounded-2xl border border-royal-700/10 bg-cream-50 p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-600">
              {t("common.decade")}
            </div>
            <ul className="mt-4 space-y-1">
              {grouped.map((g) => (
                <li key={g.key}>
                  <button
                    type="button"
                    onClick={() => scrollToDecade(g.key)}
                    className={`flex w-full items-baseline justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                      active === g.key
                        ? "bg-royal-800 text-cream-50"
                        : "text-neutral-700 hover:bg-white"
                    }`}
                  >
                    <span className="font-medium">{g.key}</span>
                    <span
                      className={`font-mono text-[11px] ${
                        active === g.key ? "text-gold-200" : "text-neutral-400"
                      }`}
                    >
                      {g.items.length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-royal-700/10 pt-4 text-[11px] text-neutral-500">
              {t("common.total_concerts_1")}{" "}
              <span className="font-semibold text-royal-800">{entries.length}</span>{" "}
              {t("common.total_concerts_2")}
            </div>
          </div>
        </div>
      </aside>

      <div className="space-y-14 lg:col-span-8 xl:col-span-9">
        {grouped.map((g) => (
          <section
            key={g.key}
            id={`decade-${g.key}`}
            className="scroll-mt-28"
          >
            <div className="flex items-end justify-between border-b border-royal-700/10 pb-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700">
                  {t("common.decade")}
                </div>
                <div className="display mt-1 text-4xl text-royal-800 sm:text-5xl">
                  {g.key}
                </div>
              </div>
              <div className="text-sm text-neutral-500">
                {g.items.length}{" "}
                {g.items.length === 1
                  ? t("common.one_concert")
                  : t("common.many_concerts")}
              </div>
            </div>

            <ul className="mt-5 divide-y divide-royal-700/10 overflow-hidden rounded-xl border border-royal-700/10 bg-white">
              {g.items.map((row) => (
                <li
                  key={row.date}
                  className="grid gap-3 px-6 py-4 sm:grid-cols-[120px_1fr] sm:items-baseline sm:gap-6"
                >
                  <div className="font-mono text-sm text-gold-700">{row.date}</div>
                  <div className="space-y-1">
                    {row.lines.map((line, i) => (
                      <div
                        key={i}
                        className={
                          i === 0
                            ? "text-sm font-medium text-royal-800"
                            : "text-sm text-neutral-700"
                        }
                      >
                        {l(line, lang)}
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
