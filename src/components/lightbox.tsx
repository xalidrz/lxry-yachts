"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Photo } from "@/data/photos";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Full-screen photo viewer on a solid dark surface. Left and right arrow keys (or the buttons)
 * browse the given list, Escape closes. `index` is null when closed.
 */
export function Lightbox({
  photos,
  index,
  onIndexChange,
  label = "Photo",
}: {
  photos: Photo[];
  index: number | null;
  onIndexChange: (i: number | null) => void;
  label?: string;
}) {
  const count = photos.length;
  const go = (dir: 1 | -1) => index !== null && onIndexChange((index + dir + count) % count);
  const photo = index === null ? null : photos[index];

  return (
    <Dialog open={index !== null} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogContent
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        <DialogTitle className="sr-only">{label}</DialogTitle>
        <DialogDescription className="sr-only">Use the left and right arrow keys to move between photos. Press Escape to close.</DialogDescription>
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <span className="font-mono text-sm tracking-[0.18em] text-ink">{index !== null ? `${pad(index + 1)}/${pad(count)}` : ""}</span>
          <DialogClose asChild>
            <button type="button" aria-label="Close" className="grid size-11 place-items-center border border-line text-ink hover:border-signal">
              <X className="size-5" aria-hidden />
            </button>
          </DialogClose>
        </div>
        <div className="relative min-h-0 flex-1">
          {photo ? <Image key={photo.file} src={photo.file} alt={photo.alt} fill sizes="100vw" quality={80} priority className="object-contain" /> : null}
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-line bg-graphite text-ink hover:border-signal">
            <ArrowLeft className="size-5" aria-hidden />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-line bg-graphite text-ink hover:border-signal">
            <ArrowRight className="size-5" aria-hidden />
          </button>
        </div>
        {photo ? <p className="shrink-0 border-t border-line px-5 py-3 text-sm text-muted">{photo.alt}</p> : null}
      </DialogContent>
    </Dialog>
  );
}
