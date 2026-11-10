import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import PartnersStrip from "@/components/PartnersStrip";
import { SITE } from "@/lib/data";

export const metadata = { title: "Mitgliedschaft" };

const benefits = [
  {
    title: "Konzerte und Veranstaltungen",
    text:
      "Zugang zu einem ganzjährigen Konzertprogramm aus Chor-, Orchester- und Orgelkonzerten in der Lisdorfer Pfarrkirche."
  },
  {
    title: "Orgelakademie und Wettbewerb",
    text:
      "Einblick in die Europäische Orgelakademie und den Internationalen Orgel-Kompositionswettbewerb — über das Konzertpublikum hinaus."
  },
  {
    title: "Vereinsreisen und Begegnungen",
    text:
      "Gemeinsame Fahrten zu bedeutenden Orgeln in Deutschland, Frankreich und darüber hinaus."
  },
  {
    title: "Vertraute Gemeinschaft",
    text:
      "Ein Kreis von 275 Menschen, die Kirchenmusik tragen und leben — von Stammbesuchern bis zu jungen Musikstudierenden."
  }
];

export default function MitgliedschaftPage() {
  return (
    <>
      <PageHero
        eyebrow="Mitmachen"
        title="Mitglied werden"
        subtitle="Unterstützen Sie die Kirchenmusik in Lisdorf. Werden Sie Teil eines Vereins, der seit 1993 ein bedeutendes Programm trägt."
      />

      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-5">
            <div className="md:col-span-3">
              <FadeIn>
                <h2 className="headline text-2xl font-medium text-royal-800 sm:text-3xl">
                  Ihr Beitrag trägt die Musik.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                  Als gemeinnütziger Verein leben wir vom Engagement unserer Mitglieder und
                  Freunde. Mit Ihrer Mitgliedschaft unterstützen Sie die Pflege der MAYER-Orgel,
                  die Veranstaltung internationaler Konzerte und die Nachwuchsarbeit.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {benefits.map((b) => (
                    <div
                      key={b.title}
                      className="rounded-2xl border border-royal-700/10 bg-white p-5 shadow-card"
                    >
                      <div className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                        Vorteil
                      </div>
                      <div className="headline mt-1 text-lg text-royal-800">{b.title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-700">{b.text}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div className="md:col-span-2">
              <FadeIn delay={0.1}>
                <div className="sticky top-28 rounded-3xl border border-royal-700/10 bg-royal-800 p-8 text-cream-50 shadow-plate">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-gold-200">
                    Mitgliedschaft
                  </div>
                  <div className="headline mt-2 text-3xl font-medium">Werden Sie Mitglied</div>
                  <p className="mt-4 text-sm text-cream-50/85">
                    Senden Sie uns gerne eine Nachricht oder sprechen Sie uns direkt an. Wir
                    schicken Ihnen das Aufnahmeformular zu.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-cream-50/90">
                    <li>
                      <span className="text-gold-200">·</span> Jahresbeitrag: nach Beitragsordnung
                    </li>
                    <li>
                      <span className="text-gold-200">·</span> Familien- und Fördermitgliedschaft
                    </li>
                    <li>
                      <span className="text-gold-200">·</span> Spendenquittung für steuerliche
                      Zwecke
                    </li>
                  </ul>
                  <div className="mt-8 space-y-3">
                    <Link
                      href="/kontakt"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-5 py-3 text-sm font-medium text-royal-800 transition hover:bg-gold-300"
                    >
                      Aufnahmeformular anfragen
                    </Link>
                    <a
                      href={`mailto:${SITE.email}?subject=Mitgliedschaft%20Klingende%20Kirche`}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-cream-50/25 px-5 py-3 text-sm font-medium text-cream-50 transition hover:bg-white/5"
                    >
                      E-Mail schreiben
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <PartnersStrip />
    </>
  );
}
