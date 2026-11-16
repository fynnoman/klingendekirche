"use client";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import type { NewsItem } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { l } from "@/lib/i18n";

export default function NewsDetailView({ article }: { article: NewsItem }) {
  const { lang } = useLang();
  const back = lang === "en" ? "Back to overview" : "Zur Übersicht";

  return (
    <>
      <PageHero
        eyebrow={l(article.category, lang)}
        title={l(article.title, lang)}
        subtitle={l(article.excerpt, lang)}
      />
      <section className="py-16">
        <div className="container-rail">
          <FadeIn>
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {l(article.dateLabel, lang)}
            </div>
            <article className="prose-verein mt-6">
              {article.body.map((p, i) => (
                <p key={i}>{l(p, lang)}</p>
              ))}
            </article>
            <div className="mt-10">
              <Link href="/termine" className="link-underline">
                ← {back}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
