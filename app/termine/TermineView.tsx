"use client";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import EventCard from "@/components/EventCard";
import { useLang } from "@/components/LanguageProvider";
import type { EventRow } from "@/lib/tickets/types";
import type { NewsRow } from "@/lib/content/types";

export default function TermineView({
  events,
  news
}: {
  events: EventRow[];
  news: NewsRow[];
}) {
  const { lang } = useLang();

  const eyebrow = lang === "en" ? "Calendar and news" : "Kalender und Aktuelles";
  const title = lang === "en" ? "Events and news" : "Termine und Neues";
  const subtitle =
    lang === "en"
      ? "Our programme for the coming season and current news from the life of the association."
      : "Unser Programm für die kommende Saison und aktuelle Meldungen aus dem Vereinsleben.";

  const upcomingTitle = lang === "en" ? "Upcoming events" : "Kommende Veranstaltungen";
  const upcomingLead =
    lang === "en"
      ? "Tickets are available online, by phone or at the box office."
      : "Karten erhalten Sie online, telefonisch oder an der Abendkasse.";

  const newsTitle = lang === "en" ? "Latest news" : "Aktuelle Meldungen";
  const newsLead =
    lang === "en"
      ? "News from the association, reports from the parish and notes on fundraising."
      : "Nachrichten aus dem Verein, Berichte aus der Pfarrgemeinde und Hinweise zu Spendenaktionen.";

  const readMore = lang === "en" ? "Read more" : "Weiter lesen";
  const noneUpcoming =
    lang === "en"
      ? "No concerts scheduled yet. New dates will be published here soon."
      : "Noch keine Konzerte geplant. Neue Termine werden hier bald veröffentlicht.";

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <section className="py-16">
        <div className="container-wide">
          <FadeIn>
            <h2 className="headline text-2xl font-medium text-royal-800 sm:text-3xl">
              {upcomingTitle}
            </h2>
            <p className="mt-2 text-sm text-neutral-600">{upcomingLead}</p>
          </FadeIn>

          {events.length === 0 ? (
            <FadeIn>
              <p className="mt-10 rounded-2xl border border-royal-700/10 bg-cream-100/70 p-6 text-sm text-neutral-700">
                {noneUpcoming}
              </p>
            </FadeIn>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {events.map((e, i) => (
                <FadeIn key={e.id} delay={i * 0.06}>
                  <div id={e.id}>
                    <EventCard e={e} />
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-royal-700/10 bg-cream-100/50 py-16">
        <div className="container-wide">
          <FadeIn>
            <h2 className="headline text-2xl font-medium text-royal-800 sm:text-3xl">
              {newsTitle}
            </h2>
            <p className="mt-2 text-sm text-neutral-600">{newsLead}</p>
          </FadeIn>

          <div className="mt-10 space-y-5">
            {news.length === 0 && (
              <p className="text-sm text-neutral-500">
                Noch keine aktuellen Meldungen.
              </p>
            )}
            {news.map((n, i) => {
              const dateLabel = new Date(
                n.published_at + "T00:00:00Z"
              ).toLocaleDateString(lang === "en" ? "en-GB" : "de-DE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                timeZone: "UTC"
              });
              const title =
                lang === "en" && n.title_en ? n.title_en : n.title_de;
              const excerpt =
                lang === "en" && n.excerpt_en
                  ? n.excerpt_en
                  : n.excerpt_de ?? "";
              const category =
                lang === "en" && n.category_en
                  ? n.category_en
                  : n.category_de ?? "News";
              return (
                <FadeIn key={n.id} delay={i * 0.06}>
                  <article className="group grid gap-6 rounded-2xl border border-royal-700/10 bg-white p-6 shadow-card transition hover:shadow-plate sm:grid-cols-[1fr_auto]">
                    <div>
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]">
                        <span className="text-gold-600">{category}</span>
                        <span className="text-neutral-400">· {dateLabel}</span>
                      </div>
                      <h3 className="headline mt-2 text-xl font-medium text-royal-800 sm:text-2xl">
                        {title}
                      </h3>
                      {excerpt && (
                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-700">
                          {excerpt}
                        </p>
                      )}
                    </div>
                    <Link
                      href={`/news/${n.id}`}
                      className="btn-ghost h-fit self-end whitespace-nowrap"
                    >
                      {readMore} →
                    </Link>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
