"use client";
import Link from "next/link";
import type { EventRow } from "@/lib/tickets/types";
import { eventText, formatEUR } from "@/lib/tickets/types";
import { useLang } from "./LanguageProvider";

const CATEGORY_EN: Record<string, string> = {
  Konzert: "Concert",
  Orgel: "Organ",
  Vortrag: "Lecture",
  Chor: "Choir",
  Besonderes: "Special"
};

type Props = {
  e: EventRow;
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
  const linkLabel = lang === "en" ? "Tickets" : "Karten";
  const category =
    lang === "en" ? (CATEGORY_EN[e.category] ?? e.category) : e.category;
  const title = eventText(e.title_de, e.title_en, lang);
  const subtitle = e.subtitle_de
    ? eventText(e.subtitle_de, e.subtitle_en, lang)
    : null;
  const description = e.description_de
    ? eventText(e.description_de, e.description_en, lang)
    : null;
  const venue = eventText(e.venue_de, e.venue_en, lang);
  const time = e.time;
  const priceLabel =
    e.price_cents > 0 ? formatEUR(e.price_cents, lang) : null;

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
          <h3 className="display text-2xl leading-tight text-royal-800">{title}</h3>
          {subtitle && (
            <p className="mt-2 text-[15px] italic text-neutral-600">{subtitle}</p>
          )}
          {description && (
            <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-700">
              {description}
            </p>
          )}
          <div className="mt-6 flex items-center justify-between border-t border-royal-700/10 pt-4 text-xs text-neutral-500">
            <span className="truncate pr-3">{venue}</span>
            <Link
              href={`/tickets/${e.id}`}
              className="shrink-0 font-semibold uppercase tracking-[0.18em] text-royal-700 transition group-hover:text-gold-600"
            >
              {linkLabel} →
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
        <div className="text-[10px] uppercase tracking-[0.18em] text-gold-200">{m}</div>
        <div className="headline text-3xl font-medium leading-none text-cream-50 sm:text-4xl">
          {d}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em]">
          <span className="text-gold-600">{category}</span>
          {time && <span className="text-neutral-500">· {time}</span>}
          {priceLabel && (
            <span className="text-neutral-500">· {priceLabel}</span>
          )}
          {e.highlight && (
            <span className="rounded-full border border-gold-300 bg-gold-50 px-2 py-0.5 text-[10px] font-semibold text-gold-700">
              {recommend}
            </span>
          )}
        </div>
        <h3 className="headline mt-1.5 text-xl font-medium leading-snug text-royal-800 sm:text-2xl">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-sm italic text-neutral-600">{subtitle}</p>
        )}
        {!compact && description && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-700">
            {description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
          <span>{venue}</span>
          <Link
            href={`/tickets/${e.id}`}
            className="text-royal-700 opacity-80 transition group-hover:opacity-100"
          >
            {linkLabel} →
          </Link>
        </div>
      </div>
    </article>
  );
}

function formatDate(iso: string, lang: "de" | "en"): [string, string] {
  const d = new Date(iso + "T00:00:00Z");
  const day = d.getUTCDate().toString().padStart(2, "0");
  const monthsDe = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const months = lang === "en" ? monthsEn : monthsDe;
  return [day, months[d.getUTCMonth()]];
}
