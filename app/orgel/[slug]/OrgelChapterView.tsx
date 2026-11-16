"use client";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { Ornament } from "@/components/Ornament";
import ChapterShell from "@/components/ChapterShell";
import ChronicleList from "@/components/ChronicleList";
import { useLang } from "@/components/LanguageProvider";
import { l } from "@/lib/i18n";
import type { OrgelInfoItem } from "@/lib/data";
import type { OrgelChapter } from "@/lib/orgelContent";

export default function OrgelChapterView({
  item,
  content,
  prev,
  next,
  others
}: {
  item: OrgelInfoItem;
  content: OrgelChapter | null;
  prev: OrgelInfoItem | null;
  next: OrgelInfoItem | null;
  others: OrgelInfoItem[];
}) {
  const { lang, t } = useLang();

  const isChronicle =
    !!content && content.sections.every((s) => Array.isArray(s.listing));
  const allListings = isChronicle
    ? content!.sections.flatMap((s) => s.listing ?? [])
    : [];

  const heroYear = content?.heroYear ?? (item.year ? l(item.year, lang) : "");
  const eraDefault = t("common.era_history");

  return (
    <>
      <section
        className="relative overflow-hidden border-b border-royal-700/10"
        style={{
          backgroundImage:
            "radial-gradient(500px 300px at 100% 0%, rgba(197,159,74,0.14), transparent 60%), radial-gradient(500px 300px at 0% 30%, rgba(31,59,130,0.08), transparent 60%), linear-gradient(180deg, rgba(243,236,217,0.4), rgba(253,251,246,1))"
        }}
      >
        <div className="container-xl pt-10 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
          >
            <Link href="/orgel" className="hover:text-royal-800">
              {t("common.breadcrumb_organ")}
            </Link>
            <span aria-hidden className="text-neutral-400">
              /
            </span>
            <span className="text-royal-800">{l(item.title, lang)}</span>
          </nav>

          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-12">
            <FadeIn className="md:col-span-7">
              <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700">
                <Ornament />
                <span>{content?.era ? l(content.era, lang) : eraDefault}</span>
              </div>
              <h1 className="display mt-6 text-[clamp(40px,7vw,96px)] leading-[0.95] text-royal-900">
                {l(item.title, lang)}
              </h1>
              {content?.lead && (
                <p className="mt-6 max-w-xl text-lg leading-snug text-neutral-700">
                  {l(content.lead, lang)}
                </p>
              )}
            </FadeIn>

            <FadeIn delay={0.1} className="md:col-span-5">
              <div className="flex flex-col items-start gap-6 md:items-end">
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-gold-200/60 to-transparent blur-xl"
                  />
                  <div className="font-serif text-[clamp(96px,16vw,220px)] leading-[0.85] tracking-tight text-royal-800">
                    {heroYear}
                  </div>
                </div>
                {item.year && (
                  <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                    {l(item.year, lang)}
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {content?.keyFacts && content.keyFacts.length > 0 && (
        <section className="border-b border-royal-700/10 bg-cream-100/60">
          <div className="container-xl py-10">
            <FadeIn>
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-700">
                {t("common.key_facts")}
              </div>
              <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl bg-royal-700/10 sm:grid-cols-2 lg:grid-cols-3">
                {content.keyFacts.map((f, i) => (
                  <div key={i} className="bg-white px-6 py-5">
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                      {l(f.label, lang)}
                    </dt>
                    <dd className="mt-1 text-[15px] leading-snug text-royal-800">
                      {l(f.value, lang)}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
        </section>
      )}

      <section className="py-16 sm:py-20">
        <div className="container-xl">
          {content ? (
            isChronicle ? (
              <ChronicleList entries={allListings} />
            ) : (
              <ChapterShell sections={content.sections} />
            )
          ) : (
            <FadeIn>
              <div className="rounded-3xl border border-royal-700/10 bg-white p-10 text-center shadow-card sm:p-14">
                <div className="eyebrow justify-center">
                  {t("common.in_preparation")}
                </div>
                <h2 className="display mt-4 text-2xl text-royal-800 sm:text-3xl">
                  {t("common.content_follows")}
                </h2>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      <section className="border-t border-royal-700/10 bg-cream-100/60 py-14">
        <div className="container-wide">
          <FadeIn>
            <div className="grid gap-4 md:grid-cols-2">
              {prev ? (
                <Link
                  href={`/orgel/${prev.slug}`}
                  className="group block rounded-2xl border border-royal-700/10 bg-white p-6 transition hover:border-gold-300"
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                    ← {t("common.previous_chapter")}
                  </div>
                  {prev.year && (
                    <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                      {l(prev.year, lang)}
                    </div>
                  )}
                  <div className="headline mt-1 text-lg text-royal-800">
                    {l(prev.title, lang)}
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/orgel/${next.slug}`}
                  className="group block rounded-2xl border border-royal-700/10 bg-white p-6 text-right transition hover:border-gold-300"
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                    {t("common.next_chapter")} →
                  </div>
                  {next.year && (
                    <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                      {l(next.year, lang)}
                    </div>
                  )}
                  <div className="headline mt-1 text-lg text-royal-800">
                    {l(next.title, lang)}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10">
              <div className="eyebrow mb-4">{t("common.all_chapters")}</div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/orgel/${o.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-royal-700/10 bg-white p-5 transition hover:border-gold-300"
                    >
                      <div>
                        {o.year && (
                          <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                            {l(o.year, lang)}
                          </div>
                        )}
                        <div className="headline mt-1 text-base text-royal-800">
                          {l(o.title, lang)}
                        </div>
                      </div>
                      <span className="text-royal-700 group-hover:text-gold-600">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <Link href="/orgel" className="btn-ghost">
                  {t("common.back_to_organ")}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
