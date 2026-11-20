"use client";
import Link from "next/link";
import type { EventItem } from "@/lib/data";
import { EVENT_CATEGORY_LABEL } from "@/lib/data";
import { useLang } from "./LanguageProvider";
import { l } from "@/lib/i18n";

type Props = {
  e: EventItem;
  compact?: boolean;
  layout?: "horizontal" | "vertical";
};

export default function EventCard({
  e,
  compact = false,
  layout = "horizontal"
}: Props) {
  const { lang } = useLang();
  const [d, m] = formatDate(e.date, lang);
  const recommend = lang === "en" ? "Pick" : "Empfehlung";
  const time = e.time ? l(e.time, lang) : null;
  const category = l(EVENT_CATEGORY_LABEL[e.category], lang);

  if (layout === "vertical") {
    return (
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-royal-700/10 bg-white shadow-card transition hover:border-royal-700/25 hover:shadow-plate">
        <div className="flex items-center justify-between gap-4 border-b border-royal-700/10 bg-royal-800 px-7 py-5 text-cream-50">
          <div className="flex items-baseline gap-3">
            <div className="display text-5xl leading-none text-cream-50">{d}</div>
            <div className="flex flex-col leading-tight">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-200">
                {m}
              </div>
              {time && <div className="mt-0.5 text-xs text-cream-50/80">{time}</div>}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-200">
              {category}
            </span>
            {e.highlight && (
              <span className="rounded-full border border-gold-300 bg-gold-400/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-gold-200">
                {recommend}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-7">
          <h3 className="display text-2xl leading-tight text-royal-800">
            {l(e.title, lang)}
          </h3>
          {e.subtitle && (
            <p className="mt-2 text-[15px] italic text-neutral-600">
              {l(e.subtitle, lang)}
            </p>
          )}
          <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-700">
            {l(e.description, lang)}
          </p>
          <div className="mt-6 flex items-center justify-between border-t border-royal-700/10 pt-4 text-xs text-neutral-500">
            <span className="truncate pr-3">{l(e.venue, lang)}</span>
            <Link
              href={`/tickets/${e.id}`}
              className="shrink-0 font-semibold uppercase tracking-[0.18em] text-royal-700 transition group-hover:text-gold-600"
            >
              {lang === "en" ? "Tickets" : "Karten"} →
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group relative flex ${
        compact ? "gap-4" : "gap-6"
      } rounded-2xl border border-royal-700/10 bg-white p-5 shadow-card transition hover:border-royal-700/25 hover:shadow-plate`}
    >
      <div className="flex w-16 flex-none flex-col items-center justify-center rounded-xl bg-royal-800 py-3 text-center text-cream-50 sm:w-20">
        <div className="text-[10px] uppercase tracking-[0.18em] text-gold-200">
          {m}
        </div>
        <div className="headline text-3xl font-medium leading-none text-cream-50 sm:text-4xl">
          {d}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em]">
          <span className="text-gold-600">{category}</span>
          {time && <span className="text-neutral-500">· {time}</span>}
          {e.highlight && (
            <span className="rounded-full border border-gold-300 bg-gold-50 px-2 py-0.5 text-[10px] font-semibold text-gold-700">
              {recommend}
            </span>
          )}
        </div>
        <h3 className="headline mt-1.5 text-xl font-medium leading-snug text-royal-800 sm:text-2xl">
          {l(e.title, lang)}
        </h3>
        {e.subtitle && (
          <p className="mt-1 text-sm italic text-neutral-600">
            {l(e.subtitle, lang)}
          </p>
        )}
        {!compact && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-700">
            {l(e.description, lang)}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
          <span>{l(e.venue, lang)}</span>
          <Link
            href={`/tickets/${e.id}`}
            className="text-royal-700 opacity-80 transition group-hover:opacity-100"
          >
            {lang === "en" ? "Tickets" : "Karten"} →
          </Link>
        </div>
      </div>
    </article>
  );
}

function formatDate(iso: string, lang: "de" | "en"): [string, string] {
  const d = new Date(iso);
  const day = d.getDate().toString().padStart(2, "0");
  const monthsDe = [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez"
  ];
  const monthsEn = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const months = lang === "en" ? monthsEn : monthsDe;
  return [day, months[d.getMonth()]];
}
