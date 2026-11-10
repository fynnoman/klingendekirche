import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import PartnersStrip from "@/components/PartnersStrip";
import { BOARD, SITE } from "@/lib/data";

export const metadata = { title: "Vorstand" };

export default function VorstandPage() {
  return (
    <>
      <PageHero
        eyebrow="Ehrenamt"
        title="Der Vorstand"
        subtitle="Die gewählten Vertreter des Fördervereins arbeiten ehrenamtlich und bereiten das Programm der Klingenden Kirche vor."
      />

      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BOARD.map((p, i) => (
              <FadeIn key={p.role} delay={(i % 3) * 0.06}>
                <div className="rounded-2xl border border-royal-700/10 bg-white p-6 shadow-card">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                    {p.role}
                  </div>
                  <div className="headline mt-1 text-xl text-royal-800">{p.name}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-16 rounded-2xl border border-royal-700/10 bg-cream-100/70 p-8 sm:p-10">
              <h3 className="headline text-xl text-royal-800">Kontakt zum Vorstand</h3>
              <div className="mt-4 text-sm leading-relaxed text-neutral-700">
                <div className="font-medium text-royal-800">{SITE.address.chair}</div>
                <div>{SITE.address.street}</div>
                <div>{SITE.address.city}</div>
                <div className="mt-3">
                  Fon: <a className="link-underline" href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
                </div>
                <div>
                  E-Mail:{" "}
                  <a className="link-underline" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <PartnersStrip />
    </>
  );
}
