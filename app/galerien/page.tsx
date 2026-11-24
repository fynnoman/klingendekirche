import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { listPublicGalleries } from "@/lib/content/queries";

export const dynamic = "force-dynamic";
export const metadata = { title: "Galerien" };

function formatDeDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });
}

export default async function GalerienPage() {
  const items = await listPublicGalleries().catch(() => []);
  return (
    <>
      <PageHero
        eyebrow="Rückblick"
        title="Beiträge und Galerien"
        subtitle="Berichte und Bilder von Konzerten, Weihen und besonderen Momenten."
      />

      <section className="py-16">
        <div className="container-wide">
          {items.length === 0 ? (
            <p className="text-neutral-600">Noch keine Beiträge veröffentlicht.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {items.map((g, i) => (
                <FadeIn key={g.id} delay={(i % 3) * 0.08}>
                  <Link
                    href={`/galerien/${g.id}`}
                    className="group block overflow-hidden rounded-2xl border border-royal-700/10 bg-white shadow-card transition hover:border-gold-300 hover:shadow-plate"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {g.cover_url ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url('${g.cover_url}')` }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-cream-100" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-royal-900/40 to-transparent" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]">
                        <span className="text-gold-600">Beitrag</span>
                        {g.date && (
                          <span className="text-neutral-400">
                            · {formatDeDate(g.date)}
                          </span>
                        )}
                      </div>
                      <h3 className="headline mt-2 text-lg font-medium leading-snug text-royal-800">
                        {g.title_de}
                      </h3>
                      {g.excerpt_de && (
                        <p className="mt-2 line-clamp-3 text-sm text-neutral-700">
                          {g.excerpt_de}
                        </p>
                      )}
                      <div className="mt-4 text-sm font-medium text-royal-700 group-hover:text-gold-600">
                        Beitrag öffnen →
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
