"use client";
import PageHero from "@/components/PageHero";
import { SITE } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";

export default function ImpressumPage() {
  const { lang } = useLang();

  const s =
    lang === "en"
      ? {
          eyebrow: "Legal",
          title: "Imprint",
          h1: "Information in accordance with § 5 TMG",
          h2: "Represented by",
          h3: "Contact",
          h4: "Register entry",
          h5: "Responsible for the content",
          chair: "Chairman",
          phone: "Phone",
          email: "E-mail",
          reg: "Entry in the register of associations. Register court: Amtsgericht Saarlouis.",
          responsible: "Manfred Boßmann, address as above."
        }
      : {
          eyebrow: "Rechtliches",
          title: "Impressum",
          h1: "Angaben gemäß § 5 TMG",
          h2: "Vertreten durch",
          h3: "Kontakt",
          h4: "Registereintrag",
          h5: "Verantwortlich für den Inhalt",
          chair: "1. Vorsitzender",
          phone: "Telefon",
          email: "E-Mail",
          reg: "Eintragung im Vereinsregister. Registergericht: Amtsgericht Saarlouis.",
          responsible: "Manfred Boßmann, Anschrift wie oben."
        };

  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} />
      <section className="py-16">
        <div className="container-rail prose-verein">
          <h2>{s.h1}</h2>
          <p>
            Förderverein Klingende Kirche Saarlouis-Lisdorf e.V.
            <br />
            {SITE.address.street}
            <br />
            {SITE.address.city}
          </p>
          <h2>{s.h2}</h2>
          <p>
            {s.chair}: Manfred Boßmann
            <br />
            Fax: {SITE.fax}
          </p>
          <h2>{s.h3}</h2>
          <p>
            {s.phone}: {SITE.phone}
            <br />
            {s.email}: {SITE.email}
          </p>
          <h2>{s.h4}</h2>
          <p>{s.reg}</p>
          <h2>{s.h5}</h2>
          <p>{s.responsible}</p>
        </div>
      </section>
    </>
  );
}
