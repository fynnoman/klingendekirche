import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { OrnamentDouble } from "@/components/Ornament";
import { ORGAN_FACTS, ORGEL_HISTORY, ORGEL_GALLERY } from "@/lib/data";

export const metadata = { title: "Die MAYER-Orgel" };

export default function OrgelPage() {
  return (
    <>
      <PageHero
        eyebrow="MAYER-Orgel · Lisdorf"
        title="Orgel"
        subtitle="Die Mayer-Orgel in der Kath. Kirche Crispinus und Crispinianus Saarlouis-Lisdorf."
      />

      {/* Lead quote */}
      <section className="py-12 sm:py-16">
        <div className="container-rail text-center">
          <FadeIn>
            <div className="flex justify-center">
              <OrnamentDouble />
            </div>
            <p className="display mt-8 text-2xl italic leading-[1.3] text-royal-800 sm:text-3xl md:text-4xl">
              „Der künstlerische Wert einer Orgel setzt ein harmonisches
              Zusammenspiel von Architektur, Prospektgestaltung, Disposition,
              Zuordnung der einzelnen Teilwerke und letztlich eine vollkommene
              Intonation voraus."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Image + essay */}
      <section className="pb-20">
        <div className="container-wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <FadeIn className="md:col-span-5">
              <div className="sticky top-28 overflow-hidden rounded-3xl border border-royal-700/10 bg-white shadow-plate">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/orgel/mayer-orgel-lisdorf.png"
                    alt="MAYER-Orgel in der Pfarrkirche St. Crispinus und Crispinianus Lisdorf"
                    fill
                    priority
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="border-t border-royal-700/10 bg-cream-50 px-6 py-4">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                    Pfarrkirche St. Crispinus und Crispinianus
                  </div>
                  <div className="mt-1 text-sm text-royal-800">
                    MAYER-Orgel, Neubau 1987
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="md:col-span-7">
              <div className="prose-essay space-y-5 text-[16px] leading-relaxed text-neutral-800">
                <p>
                  Bei dem Neubau der Lisdorfer Orgel im Jahre 1987 durch die
                  Orgelbaufirma Hugo Mayer, Heusweiler / Saar galt es im Besonderen,
                  das neue Orgelwerk harmonisch dem barocken Charakter des
                  Innenraumes der Kirche so anzupassen, dass eine homogene Einheit
                  und Wechselbeziehung zwischen Raum und Orgelwerk entsteht.
                </p>
                <p>
                  Nach intensiven Überlegungen wurde ein Orgelgehäuse mit einem
                  barocken Prospekt getreu dem großen Vorbild der bekannten Meister
                  konzipiert. Das Schwingen und Klingen der Töne lässt sich schon
                  beim Anblick erahnen.
                </p>
                <p>
                  In der reichhaltigen Disposition mit 45 Registern sind die
                  einzelnen Pfeifenfamilien vielfältig vertreten. Mit viel
                  Einfühlungsvermögen gelang es, die vielen Pfeifenreihen der
                  Akustik des Kirchenraumes anzupassen und somit einen homogenen
                  Gesamtklang zu erhalten, der sowohl die feinen und zarten Stimmen
                  als auch die kräftigen Rohrwerke zur vollen Entfaltung kommen
                  lässt.
                </p>
                <p>
                  Traktiert wird die Orgel vom angebauten Spielschrank am
                  Orgelgehäuse über eine mechanische Holztraktur, über dünne
                  Holzleisten, den Abstrakten und Wellen.
                </p>
                <p>
                  Das ebenfalls mit mechanischen Manubrien ausgestattete Registerwerk
                  wurde mit drei Kombinationstritten ausgerüstet, durch welche es
                  dem Organisten ermöglicht wird, die einzelnen Klangfarben für
                  Principale, Mixturen und Zungen mit einem Fußtritt abzurufen.
                </p>
                <p>
                  Das Schnitzwerk des Orgelprospektes wurde durch die Werkstatt
                  Martin Mrziglod, Tholey / Saar gefertigt und im Jahre 1992
                  vollendet.
                </p>
              </div>

              {/* Facts */}
              <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-royal-700/10 bg-royal-700/10 sm:grid-cols-2">
                {ORGAN_FACTS.map((f) => (
                  <div key={f.label} className="bg-white px-5 py-5">
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                      {f.label}
                    </dt>
                    <dd className="mt-1 text-sm text-royal-800">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Image gallery with captions */}
      <section className="border-t border-royal-700/10 bg-cream-100/60 py-16 sm:py-20">
        <div className="container-wide">
          <FadeIn>
            <div className="mb-10 flex items-end justify-between border-b border-royal-700/10 pb-6">
              <div>
                <div className="eyebrow">Bilder</div>
                <h2 className="display mt-4 text-3xl text-royal-800 sm:text-4xl">
                  Eindrücke
                </h2>
              </div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                Foto-Material in Vorbereitung
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {ORGEL_GALLERY.map((g, i) => (
              <FadeIn key={g.caption} delay={(i % 3) * 0.06}>
                <figure className="group overflow-hidden rounded-2xl border border-royal-700/10 bg-white shadow-card">
                  <div className="relative aspect-[4/3] overflow-hidden bg-royal-900/5">
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 50% 40%, rgba(197,159,74,0.14), transparent 55%), repeating-linear-gradient(135deg, rgba(31,59,130,0.04) 0 10px, transparent 10px 20px)"
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        aria-hidden
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-royal-700/35"
                      >
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <circle cx="9" cy="10" r="2" />
                        <path d="M21 17l-5-5L5 20" />
                      </svg>
                    </div>
                  </div>
                  <figcaption className="border-t border-royal-700/10 px-5 py-4">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                      Abbildung
                    </div>
                    <div className="mt-1 text-sm text-royal-800">{g.caption}</div>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Weitere Information */}
      <section className="py-16 sm:py-20">
        <div className="container-wide">
          <FadeIn>
            <div className="mb-10 flex items-end justify-between border-b border-royal-700/10 pb-6">
              <div>
                <div className="eyebrow">Weitere Information</div>
                <h2 className="display mt-4 text-3xl text-royal-800 sm:text-4xl">
                  Zur Geschichte der Lisdorfer Orgeln
                </h2>
              </div>
            </div>
          </FadeIn>

          <ul className="grid gap-4 md:grid-cols-2">
            {ORGEL_HISTORY.map((h, i) => (
              <FadeIn key={h.slug} delay={(i % 2) * 0.05}>
                <li>
                  <Link
                    href={`/orgel/${h.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-royal-700/10 bg-white p-6 shadow-card transition hover:border-gold-300"
                  >
                    <div>
                      {h.year && (
                        <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                          {h.year}
                        </div>
                      )}
                      <div className="headline mt-1 text-lg text-royal-800">
                        {h.title}
                      </div>
                    </div>
                    <span className="text-xl text-royal-700 transition group-hover:translate-x-0.5 group-hover:text-gold-600">
                      →
                    </span>
                  </Link>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
