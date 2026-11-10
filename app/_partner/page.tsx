import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { PARTNERS } from "@/lib/data";

export const metadata = { title: "Partner und Förderer" };

export default function PartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Netzwerk"
        title="Partner und Förderer"
        subtitle="Unser Programm lebt von einem starken Netzwerk aus Kommune, Kirche, Kultur und Handwerk."
      />

      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map((p, i) => (
              <FadeIn key={p.name} delay={(i % 3) * 0.06}>
                <div className="rounded-2xl border border-royal-700/10 bg-white p-6 shadow-card">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                    Partner
                  </div>
                  <div className="headline mt-2 text-lg text-royal-800">{p.name}</div>
                  {p.note && (
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{p.note}</p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-16 rounded-3xl border border-royal-700/10 bg-cream-100/70 p-8 sm:p-10">
              <h3 className="headline text-xl text-royal-800">
                Werden Sie Partner der Klingenden Kirche
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-700">
                Als Unternehmen, Stiftung oder Institution können Sie unser Programm gezielt
                unterstützen. Von Konzertpatenschaften über Druckkosten bis zu einzelnen Projekten
                der Orgelakademie oder des Kompositionswettbewerbs finden wir gemeinsam ein
                passendes Engagement.
              </p>
              <a href="/kontakt" className="btn-primary mt-6">
                Gespräch vereinbaren
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
