"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { GalleryImage } from "@/lib/engraving-gallery";
import type { Locale } from "@/lib/i18n";

/** `open` is a template containing "{alt}" (functions cannot be passed from server components). */
type Labels = { close: string; prev: string; next: string; open: string; viewer: string };

/** Masonry grid of sample photos; clicking one opens a lightbox with previous/next. */
export function EngravingGallery({
  images,
  locale,
  labels,
}: {
  images: GalleryImage[];
  locale: Locale;
  labels: Labels;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : images[index];
  const step = (d: number) =>
    setIndex((i) => (i === null ? i : (i + d + images.length) % images.length));

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4 [&>li]:mb-3 sm:[&>li]:mb-4">
        {images.map((img, i) => (
          <li key={img.src} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={labels.open.replace("{alt}", img.alt[locale])}
              className="block w-full cursor-zoom-in overflow-hidden rounded-xl border bg-muted transition-shadow duration-150 hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
            >
              <Image
                src={img.src}
                alt={img.alt[locale]}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1280px) 280px, (min-width: 1024px) 33vw, 50vw"
                className="h-auto w-full"
              />
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={index !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <DialogContent
          closeLabel={labels.close}
          closeClassName="z-10 bg-black/60 text-white hover:bg-black/80 hover:text-white"
          className="max-w-5xl border-0 bg-black/90 p-3 text-white sm:p-4"
        >
          <DialogTitle className="sr-only">{labels.viewer}</DialogTitle>
          <DialogDescription className="sr-only">{current?.alt[locale]}</DialogDescription>
          {current && (
            <div className="relative">
              <Image
                src={current.src}
                alt={current.alt[locale]}
                width={current.width}
                height={current.height}
                sizes="(min-width: 1024px) 960px, 100vw"
                loading="eager"
                className="mx-auto h-auto max-h-[78dvh] w-auto max-w-full rounded-lg object-contain"
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={labels.prev}
                    className="absolute start-1 top-1/2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors duration-150 hover:bg-black/80"
                  >
                    <ChevronLeft className="size-6 rtl:-scale-x-100" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={labels.next}
                    className="absolute end-1 top-1/2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors duration-150 hover:bg-black/80"
                  >
                    <ChevronRight className="size-6 rtl:-scale-x-100" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
