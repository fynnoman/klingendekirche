import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import PartnersStrip from "@/components/PartnersStrip";
import { GALLERIES } from "@/lib/data";

export const metadata = {
  title: "Galerien",
  description:
    "Bilder und Berichte vergangener Konzerte, Orgelweihen und Reisen des Fördervereins Klingende Kirche Saarlouis-Lisdorf."
};

export default function GalerienPage() {
  return (
    <>
      <PageHero
        eyebrow="Rückblick"
        title="Galerien"
        subtitle="Bilder und Berichte unserer Konzerte, Weihen und Reisen aus der jüngeren Vergangenheit."
      />

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
                      <span className="text-gold-600">Galerie</span>
                      <span className="text-neutral-400">· {g.dateLabel}</span>
                    </div>
                    <h3 className="headline mt-2 text-lg font-medium leading-snug text-royal-800">
                      {g.title}
                    </h3>
                    <p className="mt-1 text-sm italic text-neutral-600">{g.subtitle}</p>
                    <p className="mt-3 line-clamp-3 text-sm text-neutral-700">{g.excerpt}</p>
                    <div className="mt-4 text-sm font-medium text-royal-700 group-hover:text-gold-600">
                      Zur Galerie →
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <PartnersStrip />
    </>
  );
}
