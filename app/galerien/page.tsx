"use client";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { GALLERIES } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { l } from "@/lib/i18n";

export default function GalerienPage() {
  const { lang } = useLang();
  const eyebrow = lang === "en" ? "Review" : "Rückblick";
  const title = lang === "en" ? "Galleries" : "Galerien";
  const subtitle =
    lang === "en"
      ? "Images and reports of our concerts, consecrations and journeys of recent years."
      : "Bilder und Berichte unserer Konzerte, Weihen und Reisen aus der jüngeren Vergangenheit.";
  const galleryLabel = lang === "en" ? "Gallery" : "Galerie";
  const toGallery = lang === "en" ? "Open gallery" : "Zur Galerie";

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {GALLERIES.map((g, i) => (
              <FadeIn key={g.id} delay={(i % 3) * 0.08}>
                <Link
                  href={`/galerien#${g.id}`}
                  className="group block overflow-hidden rounded-2xl border border-royal-700/10 bg-white shadow-card transition hover:border-gold-300 hover:shadow-plate"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${g.cover}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-900/40 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]">
                      <span className="text-gold-600">{galleryLabel}</span>
                      <span className="text-neutral-400">· {l(g.dateLabel, lang)}</span>
                    </div>
                    <h3 className="headline mt-2 text-lg font-medium leading-snug text-royal-800">
                      {l(g.title, lang)}
                    </h3>
                    <p className="mt-1 text-sm italic text-neutral-600">
                      {l(g.subtitle, lang)}
                    </p>
                    <p className="mt-3 line-clamp-3 text-sm text-neutral-700">
                      {l(g.excerpt, lang)}
                    </p>
                    <div className="mt-4 text-sm font-medium text-royal-700 group-hover:text-gold-600">
                      {toGallery} →
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
