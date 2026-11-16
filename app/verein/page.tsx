"use client";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { Ornament } from "@/components/Ornament";
import { SITE, BOARD } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { l } from "@/lib/i18n";

export default function VereinPage() {
  const { lang, t } = useLang();

  const subnav =
    lang === "en"
      ? [
          { label: "The association", href: "/verein" },
          { label: "Board", href: "/verein/vorstand" },
          { label: "Statutes", href: "/verein/satzung" },
          { label: "Membership", href: "/mitgliedschaft" },
          { label: "The organ", href: "/orgel" },
          { label: "The church", href: "/verein/kirche" }
        ]
      : [
          { label: "Der Verein", href: "/verein" },
          { label: "Vorstand", href: "/verein/vorstand" },
          { label: "Satzung", href: "/verein/satzung" },
          { label: "Mitgliedschaft", href: "/mitgliedschaft" },
          { label: "Die Orgel", href: "/orgel" },
          { label: "Die Kirche", href: "/verein/kirche" }
        ];

  const title = lang === "en" ? "The association" : "Der Verein";
  const subtitle =
    lang === "en"
      ? "A forum for ambitious sacred music in Saarlouis-Lisdorf, carried by people who understand music as proclamation and community."
      : "Ein Forum für anspruchsvolle Kirchenmusik in Saarlouis-Lisdorf, getragen von Menschen, die Musik als Verkündigung und Gemeinschaft verstehen.";

  const paragraphs =
    lang === "en"
      ? [
          "The idea of the Klingende Kirche association in Saarlouis-Lisdorf has been bearing fruit since 1993.",
          "To promote ambitious sacred music and to care for and maintain the new MAYER organ, the Klingende Kirche association was founded in 1993. Through outstanding musical activities, this institution has succeeded in making the Lisdorf organ and the Lisdorf Klingende Kirche known to a wide and interested public.",
          "In the rich cultural life of the city of Saarlouis and far beyond, the engagement of the association has become indispensable."
        ]
      : [
          "Die Idee des Fördervereins „Klingende Kirche“ Saarlouis-Lisdorf trägt seit 1993 Früchte.",
          "Zur Förderung einer anspruchsvollen Kirchenmusik und zur Pflege und Unterhaltung der neuen MAYER-Orgel wurde 1993 der Förderverein „Klingende Kirche“ gegründet. Dieser Institution ist es durch hervorragende kirchenmusikalische Aktivitäten gelungen, die Lisdorfer Orgel und die Lisdorfer „Klingende Kirche“ zu einem Begriff in einer großen interessierten Öffentlichkeit zu machen.",
          "Aus dem kulturell reichhaltigen Angebot der Kreisstadt Saarlouis und weit darüber hinaus ist das Engagement des Fördervereins nicht mehr wegzudenken."
        ];

  const h2a = lang === "en" ? "Programme and highlights" : "Programm und Akzente";
  const p2 =
    lang === "en"
      ? "Organ highlights such as the Saarlouis Organ Days with the internationally acclaimed organ composition competition, as well as the European Organ Academy, alternate every year with the rich programme. Great choral, instrumental, orchestral and solo concerts carry the musical message of the Lisdorf Klingende Kirche far beyond the Saarlouis area."
      : "Orgelmusikalische Leckerbissen wie die Saarlouiser Orgeltage mit dem international stark beachteten Orgel-Kompositions-Wettbewerb sowie die Europäische Orgelakademie wechseln sich jährlich in dem Veranstaltungsreigen ab. Dazwischen tragen große Chor-, Instrumental-, Orchester- und Solo-Konzerte die musikalische Botschaft der Lisdorfer „Klingenden Kirche“ weit über den Saarlouiser Bereich hinaus.";

  const h2b =
    lang === "en" ? "A hallmark for sacred music" : "Ein Markenzeichen für Kirchenmusik";
  const p3 =
    lang === "en"
      ? `The Lisdorf church has become a well-known hallmark for many friends of balanced sacred music. In ${SITE.concertsSince1993} concerts the association has realised its goals through exemplary concert organisation. Many people from Lisdorf and even more from elsewhere are among the most eager concert visitors today.`
      : `Die Lisdorfer Kirche ist für viele Freunde der ausgewogenen Kirchenmusik zu einem bekannten Markenzeichen geworden. In ${SITE.concertsSince1993} Konzerten hat der Verein durch eine vorbildliche Konzertorganisation die Vereinsziele umgesetzt. Viele Lisdorfer, aber ebenso viele Auswärtige zählen heute zu den eifrigsten Konzertbesuchern.`;

  const boardTitle = lang === "en" ? "Board" : "Vorstand";
  const boardLead =
    lang === "en"
      ? "The board of the association works on a voluntary basis and is here as your contact."
      : "Der Vorstand des Fördervereins arbeitet ehrenamtlich und ist für Sie Ansprechpartner.";
  const contact = lang === "en" ? "Get in touch" : "Kontakt aufnehmen";

  return (
    <>
      <PageHero
        eyebrow={`${t("home.since").toLowerCase()} ${SITE.foundedYear}`}
        title={title}
        subtitle={subtitle}
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
                {paragraphs[0]}
              </p>
              <p>{paragraphs[1]}</p>
              <p>{paragraphs[2]}</p>

              <h2>{h2a}</h2>
              <p>{p2}</p>

              <h2>{h2b}</h2>
              <p>{p3}</p>
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
                {lang === "en"
                  ? "“Sacred music also has the task of proclamation. It therefore has an apostolic significance. All those who either compose music or perform it as conductors, singers and instrumentalists exercise, without doubt, though in different forms, a true and genuine apostolate.”"
                  : "„Die Kirchenmusik hat auch die Aufgabe der Verkündigung. Sie hat daher apostolische Bedeutung. Alle, die entweder Musik komponieren oder sie als Dirigenten, Sänger und Instrumentalisten aufführen, sie alle üben zweifellos, wenn auch in verschiedenen Formen, ein wahres und echtes Apostolat aus.“"}
              </p>
              <footer className="mt-4 text-xs uppercase tracking-[0.2em] text-gold-700">
                {lang === "en"
                  ? "Pius XII · Encyclical on sacred music, 25 December 1955"
                  : "Pius XII. · Enzyklika zur Kirchenmusik, 25. Dezember 1955"}
              </footer>
            </blockquote>
          </FadeIn>

          <FadeIn>
            <div className="mt-20">
              <h2 className="headline text-2xl font-medium text-royal-800 sm:text-3xl">
                {boardTitle}
              </h2>
              <p className="mt-2 text-sm text-neutral-600">{boardLead}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {BOARD.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-royal-700/10 bg-white p-5 shadow-card"
                  >
                    <div className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                      {l(p.role, lang)}
                    </div>
                    <div className="headline mt-1 text-lg text-royal-800">{p.name}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-sm">
                <Link href="/kontakt" className="link-underline">
                  {contact}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
