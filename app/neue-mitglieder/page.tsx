"use client";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { NEW_MEMBERS_2026, SITE } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";

export default function NeueMitgliederPage() {
  const { lang } = useLang();

  const eyebrow =
    lang === "en"
      ? `Year 2026 · Total membership ${SITE.members}`
      : `Jahr 2026 · Mitgliederbestand ${SITE.members}`;
  const title =
    lang === "en"
      ? "With joy we welcome our new members"
      : "Mit Freude begrüßen wir unsere neuen Mitglieder";
  const subtitle =
    lang === "en"
      ? "Thank you for supporting sacred music in Lisdorf."
      : "Danke, dass Sie die Kirchenmusik in Lisdorf mittragen.";

  const body: string[] =
    lang === "en"
      ? [
          "Members support the many sacred music activities of the association in one of the most beautiful baroque churches of the Saarland with a monthly contribution of 2.50 € (young people and students pay 0.50 € per month). Their willingness to become members gives us courage to continue caring for good and ambitious music in our Lisdorf church and far beyond.",
          "On behalf of the board and the members of the association, our heartfelt thanks."
        ]
      : [
          "Die Mitglieder unterstützen mit einem monatlichen Beitrag von 2,50 € (Jugendliche und Studenten zahlen monatlich 0,50 €) die Finanzierung der vielseitigen kirchenmusikalischen Vereinsaktivitäten in einer der schönsten Barockkirchen des Saarlandes. Mit ihrer Bereitschaft, Mitglied zu werden, geben sie uns Mut, weiterhin für eine gute und anspruchsvolle Musik in unserer Lisdorfer Kirche und weit darüber hinaus Sorge zu tragen.",
          "Im Namen des Vorstandes und der Vereinsmitglieder herzlichen Dank."
        ];

  const btnJoin = lang === "en" ? "Join us too" : "Auch Mitglied werden";
  const btnObit = lang === "en" ? "In memoriam" : "Nachruf";

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <section className="py-16">
        <div className="container-rail">
          <FadeIn>
            <ul className="divide-y divide-royal-700/10 overflow-hidden rounded-3xl border border-royal-700/10 bg-white shadow-card">
              {NEW_MEMBERS_2026.map((m) => (
                <li
                  key={m}
                  className="flex items-center gap-4 px-6 py-4 text-[15px] text-royal-800 sm:px-8"
                >
                  <span
                    aria-hidden
                    className="h-2 w-2 shrink-0 rounded-full bg-gold-400"
                  />
                  {m}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 rounded-3xl border border-royal-700/10 bg-cream-100/70 p-8 sm:p-10">
              {body.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-[15px] leading-relaxed text-neutral-700"
                      : "mt-4 text-[15px] leading-relaxed text-neutral-700"
                  }
                >
                  {p}
                </p>
              ))}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/mitgliedschaft" className="btn-primary">
                  {btnJoin}
                </Link>
                <Link href="/nachruf" className="btn-ghost">
                  {btnObit}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
