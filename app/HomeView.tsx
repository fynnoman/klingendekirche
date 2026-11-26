"use client";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { Ornament } from "@/components/Ornament";
import { SITE } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { eventText, formatEventDate, type EventRow } from "@/lib/tickets/types";

const CATEGORY_EN: Record<string, string> = {
  Konzert: "Concert",
  Orgel: "Organ",
  Vortrag: "Lecture",
  Chor: "Choir",
  Besonderes: "Special"
};

function categoryLabel(cat: string, lang: "de" | "en"): string {
  return lang === "en" ? (CATEGORY_EN[cat] ?? cat) : cat;
}

export default function HomeView({
  featured
}: {
  featured: EventRow | null;
}) {
  const { lang, t } = useLang();

  return (
    <>
      {featured && (
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-cream-50">
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 hidden w-[62%] bg-cover bg-center opacity-[0.22] md:block"
              style={{
                backgroundImage: "url('/images/orgel/mayer-orgel-lisdorf.png')"
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(253,251,246,1) 38%, rgba(253,251,246,0.6) 62%, rgba(253,251,246,0) 100%), radial-gradient(900px 500px at 10% 0%, rgba(197,159,74,0.12), transparent 60%), radial-gradient(900px 500px at 100% 100%, rgba(31,59,130,0.08), transparent 60%)"
              }}
            />
          </div>

          <div className="container-xl pt-14 pb-20 sm:pt-20 sm:pb-28 md:pt-24 md:pb-36">
            <div className="grid items-end gap-14 md:grid-cols-12">
              <div className="md:col-span-8 md:pr-6 lg:col-span-7">
                <FadeIn>
                  <div className="mb-8 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700">
                    <Ornament />
                    <span>{t("home.next_concert_eyebrow")}</span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.05}>
                  {(() => {
                    const title = eventText(featured.title_de, featured.title_en, lang);
                    const parts = title.split(" ");
                    const first = parts[0];
                    const rest = parts.slice(1).join(" ");
                    return (
                      <h1 className="display text-[clamp(44px,8vw,112px)] leading-[0.95] tracking-tight text-royal-900">
                        {first}
                        <br />
                        <span className="italic text-royal-700">{rest}</span>
                      </h1>
                    );
                  })()}
                </FadeIn>

                {featured.subtitle_de && (
                  <FadeIn delay={0.1}>
                    <p className="mt-6 max-w-xl text-lg italic leading-snug text-neutral-700 sm:text-xl">
                      {eventText(featured.subtitle_de, featured.subtitle_en, lang)}
                    </p>
                  </FadeIn>
                )}

                <FadeIn delay={0.15}>
                  <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-royal-700/15 pt-6 text-sm text-neutral-700">
                    <div className="flex items-center gap-3">
                      <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-gold-600">
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
                      </svg>
                      <span className="text-royal-900">
                        {formatEventDate(featured.date, lang)}
                      </span>
                    </div>
                    {featured.time && (
                      <div className="flex items-center gap-3">
                        <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-gold-600">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" strokeLinecap="round" />
                        </svg>
                        <span className="text-royal-900">{featured.time}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-gold-600">
                        <path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      <span>{eventText(featured.venue_de, featured.venue_en, lang)}</span>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    {featured.sale_active &&
                    featured.price_cents > 0 &&
                    featured.capacity > 0 ? (
                      <Link
                        href={`/tickets/${featured.id}`}
                        className="btn-primary text-base px-8 py-4"
                      >
                        {t("home.book_tickets")}
                        <svg aria-hidden width="16" height="16" viewBox="0 0 20 20" fill="none">
                          <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    ) : (
                      <Link
                        href={`/termine#${featured.id}`}
                        className="btn-primary text-base px-8 py-4"
                      >
                        {lang === "en" ? "Concert details" : "Zum Konzert"}
                      </Link>
                    )}
                    <Link href="/verein" className="btn-ghost text-base px-8 py-4">
                      {t("home.about_us")}
                    </Link>
                  </div>
                </FadeIn>
              </div>

              <FadeIn delay={0.1} className="md:col-span-4 lg:col-span-5">
                <div className="relative mx-auto max-w-sm md:ml-auto md:mr-0">
                  <div className="relative overflow-hidden rounded-[28px] border border-royal-700/10 bg-white shadow-plate">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={featured.image_url ?? "/images/orgel/mayer-orgel-lisdorf.png"}
                        alt={eventText(featured.title_de, featured.title_en, lang)}
                        fill
                        priority
                        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 38vw, 90vw"
                        className="object-cover"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-royal-900/70 via-royal-900/10 to-transparent" />
                      <div className="absolute inset-x-6 bottom-6 text-cream-50">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-200">
                          {categoryLabel(featured.category, lang)}
                        </div>
                        <div className="mt-1 text-sm text-cream-50/85">
                          {eventText(featured.venue_de, featured.venue_en, lang)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute -left-4 -top-6 flex flex-col items-center rounded-2xl bg-royal-800 px-5 py-4 text-center text-cream-50 shadow-plate sm:-left-6 sm:-top-8">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gold-200">
                      {new Date(featured.date + "T00:00:00Z")
                        .toLocaleDateString(lang === "en" ? "en-GB" : "de-DE", {
                          month: "short",
                          timeZone: "UTC"
                        })
                        .replace(".", "")}
                    </div>
                    <div className="display mt-0.5 text-5xl leading-none text-cream-50">
                      {new Date(featured.date + "T00:00:00Z")
                        .getUTCDate()
                        .toString()
                        .padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-cream-50/70">
                      {new Date(featured.date + "T00:00:00Z").getUTCFullYear()}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </section>
      )}

      <section className="border-t border-royal-700/10 bg-white">
        <div className="container-xl py-10 sm:py-12">
          <FadeIn>
            <div className="flex justify-center">
              <Link
                href="/termine"
                className="btn-ghost text-sm px-7 py-3 tracking-[0.18em] uppercase"
              >
                {t("home.all_events")} →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-royal-700/10 bg-cream-100/60">
        <div className="container-xl py-16 sm:py-24">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
            <FadeIn className="md:col-span-5">
              <Link
                href="/orgel"
                className="group relative block overflow-hidden rounded-3xl border border-royal-700/10 bg-white shadow-plate"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/orgel/mayer-orgel-lisdorf.png"
                    alt="MAYER organ"
                    fill
                    className="object-cover transition duration-[1200ms] group-hover:scale-[1.02]"
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.1} className="md:col-span-7">
              <div className="eyebrow">{t("home.organ_eyebrow")}</div>
              <h2 className="display mt-5 text-4xl leading-[1.05] text-royal-800 sm:text-5xl md:text-6xl">
                {t("home.organ_title_a")}
                <br />
                <span className="italic">{t("home.organ_title_b")}</span>
              </h2>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-neutral-700">
                {t("home.organ_lead")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/orgel" className="btn-primary">
                  {t("home.to_organ")}
                </Link>
                <Link href="/verein" className="btn-ghost">
                  {t("home.about_association")}
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-t border-royal-700/10 bg-white">
        <div className="container-xl py-16 sm:py-20">
          <div className="grid gap-8 md:grid-cols-12">
            <FadeIn className="md:col-span-7">
              <div className="rounded-3xl border border-royal-700/10 bg-royal-800 p-10 text-cream-50 shadow-plate sm:p-14">
                <div className="text-[11px] uppercase tracking-[0.22em] text-gold-200">
                  {t("home.membership_eyebrow")}
                </div>
                <h2 className="display mt-4 text-3xl text-cream-50 sm:text-4xl md:text-5xl">
                  {t("home.membership_title_a")}
                  <br />
                  <span className="italic text-gold-200">
                    {t("home.membership_title_b")}
                  </span>
                </h2>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-cream-50/85">
                  {t("home.membership_lead")}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/mitgliedschaft"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-royal-800 transition hover:bg-gold-300"
                  >
                    {t("home.become_member")}
                  </Link>
                  <a
                    href="/downloads/beitrittserklaerung.pdf"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-50/25 px-6 py-3 text-sm font-medium text-cream-50 transition hover:bg-white/5"
                  >
                    {t("home.pdf_declaration")}
                  </a>
                </div>
              </div>
            </FadeIn>

            <div className="grid gap-4 md:col-span-5">
              <FadeIn delay={0.05}>
                <Link
                  href="/neue-mitglieder"
                  className="group block h-full rounded-2xl border border-royal-700/10 bg-cream-50 p-7 transition hover:border-gold-300 hover:shadow-card"
                >
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                    2026
                  </div>
                  <div className="display mt-3 text-2xl text-royal-800">
                    {t("home.new_members_card_title")}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    {t("home.new_members_card_lead")}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.18em] text-royal-700 group-hover:text-gold-600">
                    {t("home.view")} →
                  </span>
                </Link>
              </FadeIn>

              <FadeIn delay={0.1}>
                <Link
                  href="/nachruf"
                  className="group block h-full rounded-2xl border border-royal-700/10 bg-cream-50 p-7 transition hover:border-gold-300 hover:shadow-card"
                >
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                    {t("home.in_memoriam")}
                  </div>
                  <div className="display mt-3 text-2xl text-royal-800">
                    {t("home.obituary_card_title")}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    {t("home.obituary_card_lead")}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.18em] text-royal-700 group-hover:text-gold-600">
                    {t("home.view")} →
                  </span>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
