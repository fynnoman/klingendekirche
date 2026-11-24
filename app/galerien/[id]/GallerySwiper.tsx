"use client";

import { useRef, useState } from "react";
import type { GalleryImageRow } from "@/lib/content/types";

export default function GallerySwiper({ images }: { images: GalleryImageRow[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  function scrollTo(i: number) {
    const el = ref.current;
    if (!el) return;
    const target = el.children[i] as HTMLElement | undefined;
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    setActive(i);
  }

  function onScroll() {
    const el = ref.current;
    if (!el) return;
    const w = el.clientWidth;
    const i = Math.round(el.scrollLeft / w);
    if (i !== active) setActive(i);
  }

  if (images.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto rounded-3xl border border-royal-700/10 bg-cream-100/40"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((img) => (
          <figure
            key={img.id}
            className="relative aspect-[4/3] w-full flex-shrink-0 snap-center sm:aspect-[16/10]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.image_url}
              alt={img.caption_de ?? ""}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {img.caption_de && (
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-royal-900/70 to-transparent px-5 py-4 text-sm text-cream-50">
                {img.caption_de}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollTo(Math.max(0, active - 1))}
            aria-label="Vorheriges Bild"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-royal-700/15 bg-white/85 text-royal-800 shadow-plate backdrop-blur hover:bg-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollTo(Math.min(images.length - 1, active + 1))}
            aria-label="Nächstes Bild"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-royal-700/15 bg-white/85 text-royal-800 shadow-plate backdrop-blur hover:bg-white"
          >
            ›
          </button>
          <div className="mt-4 flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Bild ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-royal-800" : "w-1.5 bg-royal-700/25 hover:bg-royal-700/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
