import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import PartnersStrip from "@/components/PartnersStrip";
import { Ornament } from "@/components/Ornament";
import { SITE, BOARD } from "@/lib/data";

export const metadata = {
  title: "Der Verein",
  description:
    "Der Förderverein Klingende Kirche Saarlouis-Lisdorf e.V. — seit 1993 Trägerin anspruchsvoller Kirchenmusik in Saarlouis-Lisdorf."
};

const subnav = [
  { label: "Der Verein", href: "/verein" },
  { label: "Vorstand", href: "/verein/vorstand" },
  { label: "Satzung", href: "/verein/satzung" },
  { label: "Mitgliedschaft", href: "/verein/mitgliedschaft" },
  { label: "Die Orgel", href: "/verein/orgel" },
  { label: "Die Kirche", href: "/verein/kirche" }
];

export default function VereinPage() {
  return (
    <>
      <PageHero
        eyebrow={`seit ${SITE.foundedYear}`}
        title="Der Verein"
        subtitle="Ein Forum für anspruchsvolle Kirchenmusik in Saarlouis-Lisdorf — getragen von Menschen, die Musik als Verkündigung und Gemeinschaft verstehen."
      />

      <section className="border-b border-royal-700/10 bg-cream-100/50">
        <div className="container-wide">
          <nav className="flex flex-wrap items-center gap-1 py-3 text-sm">
            {subnav.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-full px-4 py-1.5 text-neutral-700 transition hover:bg-white hover:text-royal-800"
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="py-16">
        <div className="container-rail">
          <FadeIn>
            <article className="prose-verein max-w-3xl">
              <p className="text-lg italic leading-relaxed text-royal-800">
                Die Idee des Fördervereins „Klingende Kirche" Saarlouis-Lisdorf trägt seit 1993
                Früchte.
              </p>

              <p>
                Zur Förderung einer anspruchsvollen Kirchenmusik und zur Pflege und Unterhaltung
                der neuen MAYER-Orgel wurde 1993 der Förderverein „Klingende Kirche" gegründet.
                Dieser Institution ist es durch hervorragende kirchenmusikalische Aktivitäten
                gelungen, die Lisdorfer Orgel und die Lisdorfer „Klingende Kirche" zu einem
                Begriff in einer großen interessierten Öffentlichkeit zu machen.
              </p>

              <p>
                Aus dem kulturell reichhaltigen Angebot der Kreisstadt Saarlouis und weit darüber
                hinaus ist das Engagement des Fördervereins nicht mehr wegzudenken.
              </p>

              <h2>Programm und Akzente</h2>
              <p>
                Orgelmusikalische Leckerbissen wie die Saarlouiser Orgeltage mit dem
                international stark beachteten Orgel-Kompositions-Wettbewerb sowie die
                Europäische Orgelakademie wechseln sich jährlich in dem Veranstaltungsreigen ab.
                Dazwischen tragen große Chor-, Instrumental-, Orchester- und Solo-Konzerte die
                musikalische Botschaft der Lisdorfer „Klingenden Kirche" weit über den
                Saarlouiser Bereich hinaus.
              </p>

              <h2>Ein Markenzeichen für Kirchenmusik</h2>
              <p>
                Die Lisdorfer Kirche ist für viele Freunde der ausgewogenen Kirchenmusik zu einem
                bekannten Markenzeichen geworden. In {SITE.concertsSince1993} Konzerten hat der
                Verein durch eine vorbildliche Konzertorganisation die Vereinsziele umgesetzt.
                Viele Lisdorfer, aber ebenso viele Auswärtige zählen heute zu den eifrigsten
                Konzertbesuchern.
              </p>
            </article>
          </FadeIn>

          <FadeIn>
            <div className="my-16 flex justify-center">
              <Ornament />
            </div>
          </FadeIn>

          <FadeIn>
            <blockquote className="mx-auto max-w-2xl rounded-2xl border border-gold-200 bg-gold-50/60 p-8 text-center">
              <p className="headline text-xl italic leading-relaxed text-royal-800 sm:text-2xl">
                „Die Kirchenmusik hat auch die Aufgabe der Verkündigung. Sie hat daher
                apostolische Bedeutung. Alle, die entweder Musik komponieren oder sie als
                Dirigenten, Sänger und Instrumentalisten aufführen, sie alle üben zweifellos,
                wenn auch in verschiedenen Formen, ein wahres und echtes Apostolat aus."
              </p>
              <footer className="mt-4 text-xs uppercase tracking-[0.2em] text-gold-700">
                Pius XII. · Enzyklika zur Kirchenmusik, 25. Dezember 1955
              </footer>
            </blockquote>
          </FadeIn>

          <FadeIn>
            <div className="mt-20">
              <h2 className="headline text-2xl font-medium text-royal-800 sm:text-3xl">
                Vorstand
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Der Vorstand des Fördervereins arbeitet ehrenamtlich und ist für Sie Ansprechpartner.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {BOARD.map((p) => (
                  <div
                    key={p.role}
                    className="rounded-2xl border border-royal-700/10 bg-white p-5 shadow-card"
                  >
                    <div className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                      {p.role}
                    </div>
                    <div className="headline mt-1 text-lg text-royal-800">{p.name}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-sm">
                <Link href="/kontakt" className="link-underline">
                  Kontakt aufnehmen
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <PartnersStrip />
    </>
  );
}
