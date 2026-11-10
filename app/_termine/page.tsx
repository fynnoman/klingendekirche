import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import EventCard from "@/components/EventCard";
import PartnersStrip from "@/components/PartnersStrip";
import { EVENTS, NEWS } from "@/lib/data";

export const metadata = {
  title: "Termine & Neues",
  description:
    "Konzerte, Vespern, Orgelakademie und Neues aus dem Förderverein Klingende Kirche Saarlouis-Lisdorf."
};

export default function TermineePage() {
  return (
    <>
      <PageHero
        eyebrow="Kalender und Aktuelles"
        title="Termine und Neues"
        subtitle="Unser Programm für die kommende Saison und aktuelle Meldungen aus dem Vereinsleben."
      />

      <section className="py-16">
        <div className="container-wide">
          <FadeIn>
            <h2 className="headline text-2xl font-medium text-royal-800 sm:text-3xl">
              Kommende Veranstaltungen
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Karten erhalten Sie online über das Kontaktformular, telefonisch oder an der
              Abendkasse.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {EVENTS.map((e, i) => (
              <FadeIn key={e.id} delay={i * 0.06}>
                <div id={e.id}>
                  <EventCard e={e} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-royal-700/10 bg-cream-100/50 py-16">
        <div className="container-wide">
          <FadeIn>
            <h2 className="headline text-2xl font-medium text-royal-800 sm:text-3xl">
              Aktuelle Meldungen
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Nachrichten aus dem Verein, Berichten aus der Pfarrgemeinde und Hinweise zu
              Spendenaktionen.
            </p>
          </FadeIn>

          <div className="mt-10 space-y-5">
            {NEWS.map((n, i) => (
              <FadeIn key={n.id} delay={i * 0.06}>
                <article className="group grid gap-6 rounded-2xl border border-royal-700/10 bg-white p-6 shadow-card transition hover:shadow-plate sm:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]">
                      <span className="text-gold-600">{n.category}</span>
                      <span className="text-neutral-400">· {n.dateLabel}</span>
                    </div>
                    <h3 className="headline mt-2 text-xl font-medium text-royal-800 sm:text-2xl">
                      {n.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-700">
                      {n.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/news/${n.id}`}
                    className="btn-ghost h-fit self-end whitespace-nowrap"
                  >
                    Weiter lesen →
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <PartnersStrip />
    </>
  );
}
