import PageHero from "@/components/PageHero";
import { SITE } from "@/lib/data";

export const metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Impressum" />
      <section className="py-16">
        <div className="container-rail prose-verein">
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            Förderverein Klingende Kirche Saarlouis-Lisdorf e.V.
            <br />
            {SITE.address.street}
            <br />
            {SITE.address.city}
          </p>
          <h2>Vertreten durch</h2>
          <p>
            1. Vorsitzender: Manfred Boßmann
            <br />
            Fax: {SITE.fax}
          </p>
          <h2>Kontakt</h2>
          <p>
            Telefon: {SITE.phone}
            <br />
            E-Mail: {SITE.email}
          </p>
          <h2>Registereintrag</h2>
          <p>Eintragung im Vereinsregister. Registergericht: Amtsgericht Saarlouis.</p>
          <h2>Verantwortlich für den Inhalt</h2>
          <p>Manfred Boßmann, Anschrift wie oben.</p>
        </div>
      </section>
    </>
  );
}
