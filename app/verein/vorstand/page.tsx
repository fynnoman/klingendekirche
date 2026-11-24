import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { SITE } from "@/lib/data";
import { listBoardMembers, getSiteSettings } from "@/lib/content/queries";
import type { BoardMemberRow, SiteSettings } from "@/lib/content/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Der Vorstand" };

export default async function VorstandPage() {
  const [board, settings] = await Promise.all([
    listBoardMembers().catch(() => [] as BoardMemberRow[]),
    getSiteSettings().catch(() => ({}) as Partial<SiteSettings>)
  ]);

  const chair = settings.address_chair_de || SITE.address.chair.de;
  const street = settings.address_street || SITE.address.street;
  const city = settings.address_city || SITE.address.city;
  const phone = settings.phone || SITE.phone;
  const phoneHref = settings.phoneHref || SITE.phoneHref;
  const email = settings.email || SITE.email;

  return (
    <>
      <PageHero
        eyebrow="Ehrenamt"
        title="Der Vorstand"
        subtitle="Die gewählten Vertreter des Fördervereins arbeiten ehrenamtlich und bereiten das Programm der Klingenden Kirche vor."
      />

      <section className="py-16">
        <div className="container-wide">
          {board.length === 0 ? (
            <p className="text-neutral-600">
              Die Vorstandsliste wird in Kürze veröffentlicht.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {board.map((p, i) => (
                <FadeIn key={p.id} delay={(i % 3) * 0.06}>
                  <div className="rounded-2xl border border-royal-700/10 bg-white p-6 shadow-card">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                      {p.role_de}
                    </div>
                    <div className="headline mt-1 text-xl text-royal-800">
                      {p.name}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}

          <FadeIn>
            <div className="mt-16 rounded-2xl border border-royal-700/10 bg-cream-100/70 p-8 sm:p-10">
              <h3 className="headline text-xl text-royal-800">Kontakt zum Vorstand</h3>
              <div className="mt-4 text-sm leading-relaxed text-neutral-700">
                <div className="font-medium text-royal-800">{chair}</div>
                <div>{street}</div>
                <div>{city}</div>
                <div className="mt-3">
                  Telefon:{" "}
                  <a className="link-underline" href={`tel:${phoneHref}`}>
                    {phone}
                  </a>
                </div>
                <div>
                  E-Mail:{" "}
                  <a className="link-underline" href={`mailto:${email}`}>
                    {email}
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
