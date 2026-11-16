"use client";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { PARTNERS } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { l } from "@/lib/i18n";

export default function PartnerPage() {
  const { lang } = useLang();
  const eyebrow = lang === "en" ? "Network" : "Netzwerk";
  const title = lang === "en" ? "Partners and supporters" : "Partner und Förderer";
  const subtitle =
    lang === "en"
      ? "Our programme thrives on a strong network of municipalities, church, culture and craft."
      : "Unser Programm lebt von einem starken Netzwerk aus Kommune, Kirche, Kultur und Handwerk.";

  const partnerLabel = lang === "en" ? "Partner" : "Partner";
  const ctaTitle =
    lang === "en"
      ? "Become a partner of the Klingende Kirche"
      : "Werden Sie Partner der Klingenden Kirche";
  const ctaText =
    lang === "en"
      ? "As a company, foundation or institution you can support our programme in a targeted way. From concert sponsorships through printing costs to individual projects of the organ academy or the composition competition, we will find a suitable engagement together."
      : "Als Unternehmen, Stiftung oder Institution können Sie unser Programm gezielt unterstützen. Von Konzertpatenschaften über Druckkosten bis zu einzelnen Projekten der Orgelakademie oder des Kompositionswettbewerbs finden wir gemeinsam ein passendes Engagement.";
  const ctaBtn = lang === "en" ? "Schedule a conversation" : "Gespräch vereinbaren";

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map((p, i) => {
              const name = l(p.name, lang);
              return (
                <FadeIn key={p.logo} delay={(i % 3) * 0.06}>
                  <div className="flex h-full flex-col rounded-2xl border border-royal-700/10 bg-white p-8 shadow-card">
                    <div className="flex flex-1 items-center justify-center">
                      <div className="relative h-20 w-full">
                        <Image
                          src={p.logo}
                          alt={name}
                          fill
                          className="object-contain"
                          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                        />
                      </div>
                    </div>
                    <div className="mt-6 border-t border-royal-700/10 pt-4">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                        {partnerLabel}
                      </div>
                      <div className="headline mt-1 text-base text-royal-800">{name}</div>
                      {p.note && (
                        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                          {l(p.note, lang)}
                        </p>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn>
            <div className="mt-16 rounded-3xl border border-royal-700/10 bg-cream-100/70 p-8 sm:p-10">
              <h3 className="headline text-xl text-royal-800">{ctaTitle}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-700">
                {ctaText}
              </p>
              <Link href="/kontakt" className="btn-primary mt-6">
                {ctaBtn}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
