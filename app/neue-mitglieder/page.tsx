import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { NEW_MEMBERS_2026, SITE } from "@/lib/data";

export const metadata = { title: "Neue Mitglieder" };

export default function NeueMitgliederPage() {
  return (
    <>
      <PageHero
        eyebrow={`Jahr 2026 · Mitgliederbestand ${SITE.members}`}
        title="Mit Freude begrüßen wir unsere neuen Mitglieder"
        subtitle="Danke, dass Sie die Kirchenmusik in Lisdorf mittragen."
      />

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
              <p className="text-[15px] leading-relaxed text-neutral-700">
                Die Mitglieder unterstützen mit einem monatlichen Beitrag von 2,50 €
                (Jugendliche und Studenten zahlen monatlich 0,50 €) die Finanzierung
                der vielseitigen kirchenmusikalischen Vereinsaktivitäten in einer der
                schönsten Barockkirchen des Saarlandes. Mit ihrer Bereitschaft,
                Mitglied zu werden, geben sie uns Mut, weiterhin für eine gute und
                anspruchsvolle Musik in unserer Lisdorfer Kirche und weit darüber
                hinaus Sorge zu tragen.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                Im Namen des Vorstandes und der Vereinsmitglieder herzlichen Dank.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/mitgliedschaft" className="btn-primary">
                  Auch Mitglied werden
                </Link>
                <Link href="/nachruf" className="btn-ghost">
                  Nachruf
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
