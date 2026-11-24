import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { getGalleryById, listGalleryImages } from "@/lib/content/queries";
import GallerySwiper from "./GallerySwiper";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const g = await getGalleryById(id).catch(() => null);
  return { title: g?.title_de ?? "Beitrag" };
}

export default async function GalleryDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gallery = await getGalleryById(id).catch(() => null);
  if (!gallery || gallery.archived) notFound();

  const images = await listGalleryImages(id).catch(() => []);
  const dateLabel = gallery.date
    ? new Date(gallery.date + "T00:00:00Z").toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "UTC"
      })
    : null;

  return (
    <>
      <PageHero
        eyebrow={dateLabel ?? "Beitrag"}
        title={gallery.title_de}
        subtitle={gallery.excerpt_de ?? undefined}
      />

      <section className="py-14">
        <div className="container-rail">
          {images.length > 0 && <GallerySwiper images={images} />}

          {gallery.body_de && (
            <article
              className="prose-gallery mx-auto mt-10 max-w-3xl text-[16px] leading-relaxed text-neutral-800"
              dangerouslySetInnerHTML={{ __html: gallery.body_de }}
            />
          )}
        </div>
      </section>

      <style>{`
        .prose-gallery h2 {
          font-family: 'Instrument Serif', 'Cormorant Garamond', Georgia, serif;
          font-size: 1.85rem;
          color: #0a1033;
          margin: 1.4em 0 0.4em;
        }
        .prose-gallery h3 {
          font-family: 'Instrument Serif', 'Cormorant Garamond', Georgia, serif;
          font-size: 1.45rem;
          color: #0a1033;
          margin: 1.2em 0 0.3em;
        }
        .prose-gallery h4 {
          font-size: 1.15rem;
          font-weight: 600;
          color: #0a1033;
          margin: 1em 0 0.3em;
        }
        .prose-gallery p { margin: 0.7em 0; }
        .prose-gallery ul, .prose-gallery ol { margin: 0.7em 0 0.7em 1.25em; }
        .prose-gallery a { color: #0a1033; text-decoration: underline; }
      `}</style>
    </>
  );
}
