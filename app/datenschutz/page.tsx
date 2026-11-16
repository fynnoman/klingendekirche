"use client";
import PageHero from "@/components/PageHero";
import { useLang } from "@/components/LanguageProvider";

export default function DatenschutzPage() {
  const { lang } = useLang();
  const s =
    lang === "en"
      ? {
          eyebrow: "Legal",
          title: "Privacy",
          h1: "General note",
          p1: "The protection of your personal data is important to us. Below we inform you about the processing of your personal data when using this website.",
          h2: "Controller",
          p2: "Klingende Kirche Association Saarlouis-Lisdorf e.V., address as in the imprint.",
          h3: "Contact",
          p3: "When contacting us by e-mail or via the contact form, your details are stored for the purpose of processing the enquiry. No data is passed on to third parties.",
          h4: "Your rights",
          p4: "You have the right at any time to information, correction, deletion and restriction of the processing of your stored data, as well as a right to object and complain."
        }
      : {
          eyebrow: "Rechtliches",
          title: "Datenschutz",
          h1: "Allgemeiner Hinweis",
          p1: "Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie über die Verarbeitung Ihrer personenbezogenen Daten im Rahmen der Nutzung dieser Website.",
          h2: "Verantwortliche Stelle",
          p2: "Förderverein Klingende Kirche Saarlouis-Lisdorf e.V., Anschrift siehe Impressum.",
          h3: "Kontaktaufnahme",
          p3: "Bei einer Kontaktaufnahme per E-Mail oder über das Kontaktformular werden Ihre Angaben zum Zwecke der Bearbeitung der Anfrage gespeichert. Eine Weitergabe an Dritte findet nicht statt.",
          h4: "Ihre Rechte",
          p4: "Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer gespeicherten Daten sowie ein Widerspruchs- und Beschwerderecht."
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
          <h2>{s.h4}</h2>
          <p>{s.p4}</p>
        </div>
      </section>
    </>
  );
}
