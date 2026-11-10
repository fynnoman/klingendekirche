import PageHero from "@/components/PageHero";

export const metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Datenschutz" />
      <section className="py-16">
        <div className="container-rail prose-verein">
          <h2>Allgemeiner Hinweis</h2>
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend
            informieren wir Sie über die Verarbeitung Ihrer personenbezogenen Daten im Rahmen der
            Nutzung dieser Website.
          </p>
          <h2>Verantwortliche Stelle</h2>
          <p>
            Förderverein Klingende Kirche Saarlouis-Lisdorf e.V., Anschrift siehe Impressum.
          </p>
          <h2>Kontaktaufnahme</h2>
          <p>
            Bei einer Kontaktaufnahme per E-Mail oder über das Kontaktformular werden Ihre Angaben
            zum Zwecke der Bearbeitung der Anfrage gespeichert. Eine Weitergabe an Dritte findet
            nicht statt.
          </p>
          <h2>Ihre Rechte</h2>
          <p>
            Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung
            der Verarbeitung Ihrer gespeicherten Daten sowie ein Widerspruchs- und
            Beschwerderecht.
          </p>
        </div>
      </section>
    </>
  );
}
