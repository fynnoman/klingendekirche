import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { ORGAN_FACTS } from "@/lib/data";

export const metadata = { title: "Die MAYER-Orgel" };

export default function OrgelPage() {
  return (
    <>
      <PageHero
        eyebrow="MAYER-Orgel · Lisdorf"
        title="Die Orgel"
        subtitle="Das klingende Herzstück des Fördervereins. Die MAYER-Orgel der Pfarrkirche St. Crispinus und Crispinianus Saarlouis-Lisdorf."
      />

      <section className="py-16 sm:py-20">
        <div className="container-wide">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <FadeIn className="md:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-royal-700/10 bg-white shadow-plate">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/orgel/mayer-orgel-lisdorf.png"
                    alt="MAYER-Orgel in der Pfarrkirche St. Crispinus und Crispinianus Lisdorf"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 45vw, 100vw"
                    priority
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="md:col-span-6">
              <div className="eyebrow">Das Instrument</div>
              <h2 className="display mt-4 text-4xl text-royal-800 sm:text-5xl">
                Ein Instrument
                <br />
                <span className="italic">mit großer Geschichte.</span>
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-neutral-700">
                Die ausführliche Beschreibung der Orgel, ihrer Disposition und ihrer
                Geschichte folgt in Kürze.
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-royal-700/10 bg-royal-700/10">
                {ORGAN_FACTS.map((f) => (
                  <div key={f.label} className="bg-white px-5 py-6">
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                      {f.label}
                    </dt>
                    <dd className="mt-1 text-sm text-royal-800">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/termine" className="btn-primary">
                  Konzerttermine
                </Link>
                <Link href="/mitgliedschaft" className="btn-ghost">
                  Orgel unterstützen
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-t border-royal-700/10 bg-cream-100/60 py-16">
        <div className="container-rail">
          <FadeIn>
            <div className="rounded-3xl border border-royal-700/10 bg-white p-10 text-center shadow-card">
              <div className="eyebrow justify-center">In Vorbereitung</div>
              <h3 className="display mt-4 text-2xl text-royal-800 sm:text-3xl">
                Weitere Informationen folgen
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-700">
                An dieser Stelle entsteht eine ausführliche Dokumentation der
                Lisdorfer MAYER-Orgel: Disposition, Geschichte, Fotos und
                Hörbeispiele. Schauen Sie bald wieder vorbei.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
