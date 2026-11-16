"use client";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { DECEASED_MEMBERS_2026 } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";

export default function NachrufPage() {
  const { lang } = useLang();

  const eyebrow = lang === "en" ? "In memoriam · 2026" : "In Gedenken · 2026";
  const title =
    lang === "en"
      ? "We mourn the loss of our deceased members"
      : "Wir betrauern den Tod unserer verstorbenen Vereinsmitglieder";
  const subtitle =
    lang === "en"
      ? "We remember them with great gratitude."
      : "Wir gedenken ihnen mit großer Dankbarkeit.";

  const body =
    lang === "en"
      ? "The deceased have earned great merit as long-standing and engaged members in promoting ambitious sacred music. We remember them with great gratitude. Our sincere condolences go to the families."
      : "Die Verstorbenen haben sich als langjährige und engagierte Mitglieder um die Förderung einer anspruchsvollen Kirchenmusik verdient gemacht. Wir gedenken ihnen mit großer Dankbarkeit. Den Familien gilt unsere aufrichtige Anteilnahme.";

  const signature =
    lang === "en"
      ? "The board of the Klingende Kirche association"
      : "Der Vorstand des Fördervereins „Klingende Kirche“";

  const newMembers = lang === "en" ? "New members" : "Neue Mitglieder";
  const membership = lang === "en" ? "Membership" : "Mitgliedschaft";

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <section className="py-16">
        <div className="container-rail">
          <FadeIn>
            <ul className="divide-y divide-royal-700/10 overflow-hidden rounded-3xl border border-royal-700/10 bg-white shadow-card">
              {DECEASED_MEMBERS_2026.map((m) => (
                <li
                  key={m}
                  className="flex items-center gap-4 px-6 py-5 text-[15px] text-royal-800 sm:px-8"
                >
                  <span aria-hidden className="h-px w-6 shrink-0 bg-royal-700/30" />
                  {m}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 rounded-3xl border border-royal-700/10 bg-cream-100/70 p-8 sm:p-10">
              <p className="text-[15px] leading-relaxed text-neutral-700">{body}</p>
              <p className="mt-6 text-[13px] uppercase tracking-[0.18em] text-gold-700">
                {signature}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/neue-mitglieder" className="btn-ghost">
                  {newMembers}
                </Link>
                <Link href="/mitgliedschaft" className="btn-ghost">
                  {membership}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
