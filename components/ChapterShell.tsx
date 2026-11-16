"use client";
import { useEffect, useMemo, useState, useId } from "react";
import type { OrgelSection, DispositionGroup } from "@/lib/orgelContent";
import { useLang } from "./LanguageProvider";
import { l } from "@/lib/i18n";

function slugifyTitle(s: string) {
  return s
    .toLowerCase()
    .replace(/[äöüß]/g, (m) => ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" }[m] || m))
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export default function ChapterShell({ sections }: { sections: OrgelSection[] }) {
  const { lang, t } = useLang();
  const ids = useMemo(
    () => sections.map((s, i) => `k-${i + 1}-${slugifyTitle(l(s.title, lang))}`),
    [sections, lang]
  );

  const defaultOpen = useMemo(() => {
    const set = new Set<number>();
    sections.forEach((s, i) => {
      if (s.defaultOpen ?? i === 0) set.add(i);
    });
    return set;
  }, [sections]);

  const [open, setOpen] = useState<Set<number>>(defaultOpen);

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const expandAll = () => setOpen(new Set(sections.map((_, i) => i)));
  const collapseAll = () => setOpen(new Set());

  const openOne = (i: number) =>
    setOpen((prev) => new Set(prev).add(i));

  // Open on hash navigation
  useEffect(() => {
    const applyHash = () => {
      const h = window.location.hash.replace("#", "");
      if (!h) return;
      const idx = ids.indexOf(h);
      if (idx >= 0) openOne(idx);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [ids]);

  const allOpen = open.size === sections.length;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* TOC sidebar */}
      <aside className="lg:col-span-4 xl:col-span-3">
        <div className="lg:sticky lg:top-28">
          <div className="rounded-2xl border border-royal-700/10 bg-cream-50 p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-600">
              {t("common.chapter_content")}
            </div>
            <ol className="mt-4 space-y-1">
              {sections.map((s, i) => (
                <li key={ids[i]} className="flex items-baseline gap-3">
                  <span className="w-5 shrink-0 text-right font-mono text-[11px] text-gold-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${ids[i]}`}
                    onClick={(e) => {
                      e.preventDefault();
                      openOne(i);
                      requestAnimationFrame(() => {
                        document
                          .getElementById(ids[i])
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                        history.replaceState(null, "", `#${ids[i]}`);
                      });
                    }}
                    className="block text-sm leading-snug text-neutral-700 hover:text-royal-800"
                  >
                    {l(s.title, lang)}
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-5 flex gap-2 border-t border-royal-700/10 pt-4">
              <button
                type="button"
                onClick={allOpen ? collapseAll : expandAll}
                className="flex-1 rounded-full border border-royal-700/15 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-royal-800 transition hover:bg-cream-100"
              >
                {allOpen ? t("common.collapse_all") : t("common.expand_all")}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Sections */}
      <div className="space-y-4 lg:col-span-8 xl:col-span-9">
        {sections.map((s, i) => (
          <AccordionCard
            key={ids[i]}
            id={ids[i]}
            index={i + 1}
            total={sections.length}
            section={s}
            open={open.has(i)}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}

function AccordionCard({
  id,
  index,
  total,
  section,
  open,
  onToggle
}: {
  id: string;
  index: number;
  total: number;
  section: OrgelSection;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const { lang } = useLang();
  return (
    <section
      id={id}
      className={`scroll-mt-28 overflow-hidden rounded-2xl border bg-white shadow-card transition ${
        open ? "border-gold-300" : "border-royal-700/10"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start gap-5 px-6 py-5 text-left transition hover:bg-cream-100/70 sm:px-8 sm:py-6"
      >
        <div className="mt-1 font-mono text-[11px] font-semibold text-gold-700">
          {String(index).padStart(2, "0")}
          <span className="text-neutral-400"> / {String(total).padStart(2, "0")}</span>
        </div>
        <div className="flex-1">
          {section.eyebrow && (
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-600">
              {l(section.eyebrow, lang)}
            </div>
          )}
          <div className="headline mt-1 text-lg leading-snug text-royal-800 sm:text-xl">
            {l(section.title, lang)}
          </div>
        </div>
        <span
          aria-hidden
          className={`mt-1 shrink-0 text-royal-700 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          id={panelId}
          className="border-t border-royal-700/10 px-6 pb-10 pt-6 sm:px-10"
        >
          <SectionBody s={section} />
        </div>
      )}
    </section>
  );
}

function SectionBody({ s }: { s: OrgelSection }) {
  const { lang } = useLang();
  return (
    <div className="space-y-6 text-[15px] leading-relaxed text-neutral-800">
      {s.paragraphs && s.paragraphs.length > 0 && (
        <div className="space-y-5">
          {s.paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-[3.2rem] first-letter:leading-[0.85] first-letter:font-serif first-letter:text-royal-800"
                  : ""
              }
            >
              {l(p, lang)}
            </p>
          ))}
        </div>
      )}

      {s.quote && (
        <figure className="relative rounded-xl bg-cream-100/80 px-7 py-6 italic text-neutral-800 sm:px-9 sm:py-7">
          <span
            aria-hidden
            className="absolute left-5 top-3 font-serif text-5xl leading-none text-gold-400"
          >
            „
          </span>
          <blockquote className="pl-5">{l(s.quote, lang)}</blockquote>
        </figure>
      )}

      {s.disposition && <DispositionView groups={s.disposition} />}

      {s.listing && (
        <ul className="divide-y divide-royal-700/10 overflow-hidden rounded-xl border border-royal-700/10 bg-cream-50">
          {s.listing.map((row) => (
            <li
              key={row.date}
              className="grid gap-3 px-5 py-3 sm:grid-cols-[120px_1fr] sm:items-baseline sm:gap-6"
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
      )}

      {s.footnote && (
        <div className="pt-2 text-right text-sm font-semibold uppercase tracking-[0.2em] text-gold-700">
          {l(s.footnote, lang)}
        </div>
      )}
    </div>
  );
}

function DispositionView({ groups }: { groups: DispositionGroup[] }) {
  const { lang, t } = useLang();
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {groups.map((d, gi) => {
        const heading = l(d.heading, lang);
        return (
          <div
            key={gi + "-" + heading}
            className="relative overflow-hidden rounded-xl border border-royal-700/10 bg-gradient-to-b from-cream-50 to-white p-6"
          >
            <div
              aria-hidden
              className="absolute right-4 top-4 flex gap-[3px] opacity-25"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="block w-[2px] rounded bg-gold-600"
                  style={{ height: 12 + i * 4 }}
                />
              ))}
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
              {t("common.work")}
            </div>
            <div className="headline mt-1 text-base text-royal-800">{heading}</div>
            <ul className="mt-4 space-y-1.5 text-sm text-neutral-800">
              {d.stops.map((stop, si) => {
                const s = l(stop, lang);
                return (
                  <li
                    key={si + "-" + s}
                    className="font-mono text-[13px] leading-snug text-neutral-800"
                  >
                    {s}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
