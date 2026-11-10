import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import PartnersStrip from "@/components/PartnersStrip";
import { ORGAN_FACTS } from "@/lib/data";

export const metadata = { title: "Die MAYER-Orgel" };

const register = [
  { werk: "Hauptwerk", stimmen: ["Principal 8′", "Bourdon 16′", "Octave 4′", "Superoctave 2′", "Mixtur IV", "Trompete 8′"] },
  { werk: "Schwellwerk", stimmen: ["Geigenprincipal 8′", "Rohrflöte 8′", "Salicional 8′", "Voix céleste 8′", "Hautbois 8′", "Flûte octaviante 4′"] },
  { werk: "Rückpositiv", stimmen: ["Gedackt 8′", "Quintadena 8′", "Principal 4′", "Waldflöte 2′", "Sesquialtera II", "Cromorne 8′"] },
  {
    werk: "Pedal",
    stimmen: [
      "Principalbass 16′",
      "Subbass 16′",
      "Octavbass 8′",
      "Bassflöte 8′",
      "Fagott 16′",
      "Gregoriusbass 32′ (seit 2026)"
    ]
  }
];

export default function OrgelPage() {
  return (
    <>
      <PageHero
        eyebrow="Instrument"
        title="Die MAYER-Orgel"
        subtitle="1993 erbaut durch Hugo Mayer Orgelbau, 2026 um ein Gregoriusbass 32′-Register erweitert. Das Instrument steht im Zentrum unseres Vereinslebens."
      />

      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-3">
              <FadeIn>
                <h2 className="headline text-2xl text-royal-800 sm:text-3xl">
                  Ein Instrument aus Lisdorf, für Lisdorf.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                  Die Orgel wurde 1993 durch den Orgelbaumeister Hugo Mayer aus Heusweiler erbaut
                  und in der katholischen Pfarrkirche St. Crispinus und Crispinianus eingeweiht.
                  Sie löste das vorherige, nicht mehr sanierbare Instrument ab und steht seitdem
                  im Mittelpunkt des kirchenmusikalischen Lebens unserer Gemeinde.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                  Im Oktober 2026 wurde das Instrument um ein Gregoriusbass 32′-Register erweitert.
                  Das neue Pedalregister verleiht dem Pleno ein tragendes Fundament und öffnet die
                  Pforten für ein erweitertes Repertoire.
                </p>
              </FadeIn>

              <FadeIn>
                <div className="mt-10">
                  <h3 className="headline text-xl text-royal-800">Disposition</h3>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    {register.map((w) => (
                      <div
                        key={w.werk}
                        className="rounded-2xl border border-royal-700/10 bg-white p-5 shadow-card"
                      >
                        <div className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                          {w.werk}
                        </div>
                        <ul className="mt-2 space-y-1.5 text-sm text-neutral-700">
                          {w.stimmen.map((s) => (
                            <li key={s} className="flex items-baseline gap-2">
                              <span className="text-gold-500">·</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs italic text-neutral-500">
                    Auszug der Disposition. Die vollständige Spezifikation erhalten Sie bei
                    Hugo Mayer Orgelbau GmbH.
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="md:col-span-2">
              <FadeIn delay={0.1}>
                <div className="sticky top-28 space-y-6">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-royal-700/10 shadow-plate">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=70')"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-900/80 to-transparent" />
                    <div className="absolute inset-x-5 bottom-5 text-cream-50">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-gold-200">
                        Hugo Mayer Orgelbau
                      </div>
                      <div className="headline mt-1 text-xl font-medium">
                        Opus Lisdorf, 1993 / 2026
                      </div>
                    </div>
                  </div>
                  <dl className="divide-y divide-royal-700/10 overflow-hidden rounded-2xl border border-royal-700/10 bg-white shadow-card">
                    {ORGAN_FACTS.map((f) => (
                      <div
                        key={f.label}
                        className="grid grid-cols-5 items-center px-5 py-3 text-sm"
                      >
                        <dt className="col-span-2 text-[11px] uppercase tracking-[0.18em] text-gold-600">
                          {f.label}
                        </dt>
                        <dd className="col-span-3 text-right font-medium text-royal-800">
                          {f.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <Link href="/news/orgel-32-fuss-register" className="btn-primary w-full">
                    Zur Orgelerweiterung
                  </Link>
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
