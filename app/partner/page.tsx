import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { listPublicPartners } from "@/lib/content/queries";

export const dynamic = "force-dynamic";
export const metadata = { title: "Partner und Förderer" };

export default async function PartnerPage() {
  const partners = await listPublicPartners().catch(() => []);
  return (
    <>
      <PageHero
        eyebrow="Netzwerk"
        title="Partner und Förderer"
        subtitle="Unser Programm lebt von einem starken Netzwerk aus Kommune, Kirche, Kultur und Handwerk."
      />

      <section className="py-16">
        <div className="container-wide">
          {partners.length === 0 ? (
            <p className="text-neutral-600">Partner werden bald hier erscheinen.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((p, i) => (
                <FadeIn key={p.id} delay={(i % 3) * 0.06}>
                  <div className="flex h-full flex-col rounded-2xl border border-royal-700/10 bg-white p-8 shadow-card">
                    <div className="flex flex-1 items-center justify-center">
                      <div className="relative h-20 w-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.logo_url}
                          alt={p.name_de}
                          className="absolute inset-0 h-full w-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="mt-6 border-t border-royal-700/10 pt-4">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                        Partner
                      </div>
                      <div className="headline mt-1 text-base text-royal-800">
                        {p.website_url ? (
                          <a
                            href={p.website_url}
                            target="_blank"
                            rel="noopener"
                            className="hover:text-gold-600"
                          >
                            {p.name_de}
                          </a>
                        ) : (
                          p.name_de
                        )}
                      </div>
                      {p.note_de && (
                        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                          {p.note_de}
                        </p>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}

          <FadeIn>
            <div className="mt-16 rounded-3xl border border-royal-700/10 bg-cream-100/70 p-8 sm:p-10">
              <h3 className="headline text-xl text-royal-800">
                Werden Sie Partner der Klingenden Kirche
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-700">
                Als Unternehmen, Stiftung oder Institution können Sie unser Programm
                gezielt unterstützen. Von Konzertpatenschaften über Druckkosten bis
                zu einzelnen Projekten der Orgelakademie oder des
                Kompositionswettbewerbs finden wir gemeinsam ein passendes
                Engagement.
              </p>
              <Link href="/kontakt" className="btn-primary mt-6">
                Gespräch vereinbaren
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
