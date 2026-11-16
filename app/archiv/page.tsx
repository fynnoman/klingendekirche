"use client";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { GALLERIES } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { l } from "@/lib/i18n";

const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

export default function ArchivPage() {
  const { lang } = useLang();
  const titleTR = { de: "Archiv", en: "Archive" };
  const eyebrowTR = { de: "Chronik", en: "Chronicle" };
  const subtitleTR = {
    de: "Mehr als 240 Konzerte seit 1993, ein Ausschnitt aus der langen Geschichte unserer Vereinsarbeit.",
    en: "More than 240 concerts since 1993, a glimpse into the long history of our association."
  };
  const sublineTR = {
    de: "Konzerte, Vespern und Gottesdienste",
    en: "Concerts, vespers and services"
  };
  const reportTR = {
    de: "Jahresbericht anfragen",
    en: "Request the annual report"
  };
  const docTR = {
    de: "dokumentierte Ereignisse",
    en: "documented events"
  };
  const yearIntro = (y: number) =>
    lang === "en"
      ? `The concert year ${y} was shaped by the Lisdorf organ, by choral and orchestral programmes and by special vesper services. A full list is available in the annual report of the association.`
      : `Das Konzertjahr ${y} wurde geprägt von der Lisdorfer Orgel, einem Chor- und Orchesterprogramm und besonderen Vespern. Eine vollständige Auflistung finden Sie im Jahresbericht des Vereins.`;

  return (
    <>
      <PageHero
        eyebrow={l(eyebrowTR, lang)}
        title={l(titleTR, lang)}
        subtitle={l(subtitleTR, lang)}
      />

      <section className="py-16">
        <div className="container-wide">
          <FadeIn>
            <div className="mb-10 flex flex-wrap gap-2">
              {years.map((y) => (
                <a
                  key={y}
                  href={`#jahr-${y}`}
                  className="rounded-full border border-royal-700/15 bg-white px-4 py-1.5 text-sm font-medium text-royal-800 transition hover:border-gold-300 hover:bg-gold-50"
                >
                  {y}
                </a>
              ))}
            </div>
          </FadeIn>

          <div className="space-y-20">
            <ArchivJahr
              jahr={2026}
              eintraege={GALLERIES.slice(0, 10)}
              lang={lang}
              docLabel={l(docTR, lang)}
            />
            <ArchivJahr
              jahr={2025}
              eintraege={GALLERIES.slice(10)}
              lang={lang}
              docLabel={l(docTR, lang)}
            />

            {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((y) => (
              <section key={y} id={`jahr-${y}`}>
                <FadeIn>
                  <div className="flex items-end gap-4 border-b border-royal-700/10 pb-4">
                    <h2 className="headline text-4xl font-medium text-royal-800 sm:text-5xl">
                      {y}
                    </h2>
                    <div className="mb-1 text-sm italic text-neutral-500">
                      {l(sublineTR, lang)}
                    </div>
                  </div>
                  <p className="mt-6 max-w-2xl text-sm leading-relaxed text-neutral-700">
                    {yearIntro(y)}
                  </p>
                  <div className="mt-6">
                    <Link href="/kontakt" className="link-underline text-sm">
                      {l(reportTR, lang)}
                    </Link>
                  </div>
                </FadeIn>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ArchivJahr({
  jahr,
  eintraege,
  lang,
  docLabel
}: {
  jahr: number;
  eintraege: typeof GALLERIES;
  lang: "de" | "en";
  docLabel: string;
}) {
  return (
    <section id={`jahr-${jahr}`}>
      <FadeIn>
        <div className="flex items-end gap-4 border-b border-royal-700/10 pb-4">
          <h2 className="headline text-4xl font-medium text-royal-800 sm:text-5xl">
            {jahr}
          </h2>
          <div className="mb-1 text-sm italic text-neutral-500">
            {eintraege.length} {docLabel}
          </div>
        </div>
      </FadeIn>

      <ol className="mt-8 space-y-4">
        {eintraege.map((g, i) => (
          <FadeIn key={g.id} delay={(i % 6) * 0.04}>
            <li className="grid grid-cols-[88px_1fr] gap-5 border-b border-royal-700/10 pb-4 sm:grid-cols-[120px_1fr]">
              <time className="headline text-lg font-medium text-gold-700">
                {l(g.dateLabel, lang)}
              </time>
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                  {l(g.subtitle, lang)}
                </div>
                <div className="headline mt-1 text-lg font-medium text-royal-800">
                  {l(g.title, lang)}
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-neutral-700">
                  {l(g.excerpt, lang)}
                </p>
              </div>
            </li>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}
