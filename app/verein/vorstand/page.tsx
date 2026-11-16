"use client";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { BOARD, SITE } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { l } from "@/lib/i18n";

export default function VorstandPage() {
  const { lang, t } = useLang();
  const eyebrow = lang === "en" ? "Volunteer" : "Ehrenamt";
  const title = lang === "en" ? "The board" : "Der Vorstand";
  const subtitle =
    lang === "en"
      ? "The elected representatives of the association work on a voluntary basis and prepare the programme of the Klingende Kirche."
      : "Die gewählten Vertreter des Fördervereins arbeiten ehrenamtlich und bereiten das Programm der Klingenden Kirche vor.";
  const contactHeading =
    lang === "en" ? "Contact the board" : "Kontakt zum Vorstand";

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BOARD.map((p, i) => (
              <FadeIn key={i} delay={(i % 3) * 0.06}>
                <div className="rounded-2xl border border-royal-700/10 bg-white p-6 shadow-card">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                    {l(p.role, lang)}
                  </div>
                  <div className="headline mt-1 text-xl text-royal-800">{p.name}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-16 rounded-2xl border border-royal-700/10 bg-cream-100/70 p-8 sm:p-10">
              <h3 className="headline text-xl text-royal-800">{contactHeading}</h3>
              <div className="mt-4 text-sm leading-relaxed text-neutral-700">
                <div className="font-medium text-royal-800">
                  {l(SITE.address.chair, lang)}
                </div>
                <div>{SITE.address.street}</div>
                <div>{SITE.address.city}</div>
                <div className="mt-3">
                  {t("header.phone")}:{" "}
                  <a className="link-underline" href={`tel:${SITE.phoneHref}`}>
                    {SITE.phone}
                  </a>
                </div>
                <div>
                  {t("footer.email_label")}:{" "}
                  <a className="link-underline" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
