import PageHero from "@/components/PageHero";

export const metadata = { title: "Disclaimer" };

export default function DisclaimerPage() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Disclaimer" />
      <section className="py-16">
        <div className="container-rail prose-verein">
          <h2>Haftung für Inhalte</h2>
          <p>
            Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>
          <h2>Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Für diese fremden Inhalte kann daher keine Gewähr übernommen werden.
          </p>
          <h2>Urheberrecht</h2>
          <p>
            Die durch den Verein erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
            deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
            der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
            Zustimmung des Vereins.
          </p>
        </div>
      </section>
    </>
  );
}
