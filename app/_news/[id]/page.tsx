import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import PartnersStrip from "@/components/PartnersStrip";
import { NEWS } from "@/lib/data";

export function generateStaticParams() {
  return NEWS.map((n) => ({ id: n.id }));
}

export default async function NewsDetail({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = NEWS.find((n) => n.id === id);
  if (!article) notFound();

  return (
    <>
      <PageHero eyebrow={article.category} title={article.title} subtitle={article.excerpt} />
      <section className="py-16">
        <div className="container-rail">
          <FadeIn>
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {article.dateLabel}
            </div>
            <article className="prose-verein mt-6">
              {article.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </article>
            <div className="mt-10">
              <Link href="/termine" className="link-underline">
                ← Zur Übersicht
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
      <PartnersStrip />
    </>
  );
}
