"use client";
import PageHero from "@/components/PageHero";
import { useLang } from "@/components/LanguageProvider";

export default function DisclaimerPage() {
  const { lang } = useLang();
  const s =
    lang === "en"
      ? {
          eyebrow: "Legal",
          title: "Disclaimer",
          h1: "Liability for content",
          p1: "The content of this website has been created with the greatest care. However, we cannot guarantee the accuracy, completeness or timeliness of the content.",
          h2: "Liability for links",
          p2: "Our offer contains links to external websites of third parties, on whose content we have no influence. Therefore we cannot assume any liability for this external content.",
          h3: "Copyright",
          p3: "The content and works on these pages created by the association are subject to German copyright law. Reproduction, editing, distribution and any kind of use outside the limits of copyright require the written consent of the association."
        }
      : {
          eyebrow: "Rechtliches",
          title: "Disclaimer",
          h1: "Haftung für Inhalte",
          p1: "Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.",
          h2: "Haftung für Links",
          p2: "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte kann daher keine Gewähr übernommen werden.",
          h3: "Urheberrecht",
          p3: "Die durch den Verein erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des Vereins."
        };

  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} />
      <section className="py-16">
        <div className="container-rail prose-verein">
          <h2>{s.h1}</h2>
          <p>{s.p1}</p>
          <h2>{s.h2}</h2>
          <p>{s.p2}</p>
          <h2>{s.h3}</h2>
          <p>{s.p3}</p>
        </div>
      </section>
    </>
  );
}
