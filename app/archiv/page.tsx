import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import PartnersStrip from "@/components/PartnersStrip";
import { GALLERIES } from "@/lib/data";

export const metadata = {
  title: "Archiv",
  description:
    "Chronik der Veranstaltungen des Fördervereins Klingende Kirche Saarlouis-Lisdorf seit 1993."
};

const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

export default function ArchivPage() {
  return (
    <>
      <PageHero
        eyebrow="Chronik"
        title="Archiv"
        subtitle="Mehr als 240 Konzerte seit 1993 — ein Ausschnitt aus der langen Geschichte unserer Vereinsarbeit."
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
            <ArchivJahr jahr={2026} eintraege={GALLERIES.slice(0, 10)} />
            <ArchivJahr jahr={2025} eintraege={GALLERIES.slice(10)} />

            {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((y) => (
              <section key={y} id={`jahr-${y}`}>
                <FadeIn>
                  <div className="flex items-end gap-4 border-b border-royal-700/10 pb-4">
                    <h2 className="headline text-4xl font-medium text-royal-800 sm:text-5xl">
                      {y}
                    </h2>
                    <div className="mb-1 text-sm italic text-neutral-500">
                      Konzerte, Vespern und Gottesdienste
                    </div>
                  </div>
                  <p className="mt-6 max-w-2xl text-sm leading-relaxed text-neutral-700">
                    Das Konzertjahr {y} wurde geprägt von der Lisdorfer Orgel, einem Chor- und
                    Orchesterprogramm und besonderen Vespern. Eine vollständige Auflistung finden
                    Sie im Jahresbericht des Vereins.
                  </p>
                  <div className="mt-6">
                    <Link href="/kontakt" className="link-underline text-sm">
                      Jahresbericht anfragen
                    </Link>
                  </div>
                </FadeIn>
              </section>
            ))}
          </div>
        </div>
      </section>

      <PartnersStrip />
    </>
  );
}

function ArchivJahr({
  jahr,
  eintraege
}: {
  jahr: number;
  eintraege: typeof GALLERIES;
}) {
  return (
    <section id={`jahr-${jahr}`}>
      <FadeIn>
        <div className="flex items-end gap-4 border-b border-royal-700/10 pb-4">
          <h2 className="headline text-4xl font-medium text-royal-800 sm:text-5xl">{jahr}</h2>
          <div className="mb-1 text-sm italic text-neutral-500">
            {eintraege.length} dokumentierte Ereignisse
          </div>
        </div>
      </FadeIn>

      <ol className="mt-8 space-y-4">
        {eintraege.map((g, i) => (
          <FadeIn key={g.id} delay={(i % 6) * 0.04}>
            <li className="grid grid-cols-[88px_1fr] gap-5 border-b border-royal-700/10 pb-4 sm:grid-cols-[120px_1fr]">
              <time className="headline text-lg font-medium text-gold-700">{g.dateLabel}</time>
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                  {g.subtitle}
                </div>
                <div className="headline mt-1 text-lg font-medium text-royal-800">
                  {g.title}
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-neutral-700">{g.excerpt}</p>
              </div>
            </li>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}
