"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { SectionHead } from "@/components/section-head";
import { galleryPhotos } from "@/data/photos";

const count = galleryPhotos.length;
const pad = (n: number) => String(n).padStart(2, "0");

export function Gallery() {
  const strip = useRef<HTMLUListElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [open, setOpen] = useState<number | null>(null);

  const scrollBy = (dir: 1 | -1) =>
    strip.current?.scrollBy({ left: dir * Math.min(strip.current.clientWidth * 0.8, 640), behavior: "smooth" });

  const go = (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + count) % count));
  const photo = open === null ? null : galleryPhotos[open];

  return (
    <section id="gallery" className="border-b border-line bg-graphite py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead n="08" title="The work" />
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-muted sm:block">Drag or scroll</span>
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll gallery left" className="grid size-11 place-items-center border border-line text-ink hover:border-signal">
              <ArrowLeft className="size-5" aria-hidden />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll gallery right" className="grid size-11 place-items-center border border-line text-ink hover:border-signal">
              <ArrowRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={strip}
        className="snap-scroll mt-10 flex cursor-grab gap-3 overflow-x-auto px-5 active:cursor-grabbing lg:px-8"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !strip.current) return;
          drag.current = { down: true, x: e.clientX, left: strip.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d.down || !strip.current) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 5) d.moved = true;
          strip.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => (drag.current.down = false)}
        onPointerLeave={() => (drag.current.down = false)}
      >
        {galleryPhotos.map((p, i) => (
          <li key={p.file} className="shrink-0">
            <button
              type="button"
              onClick={() => {
                if (!drag.current.moved) setOpen(i);
              }}
              className="group relative block overflow-hidden border border-line"
              aria-label={`Open photo ${i + 1} of ${count}: ${p.alt}`}
            >
              <Image
                src={p.file}
                alt=""
                width={p.width}
                height={p.height}
                sizes="(min-width: 640px) 420px, 80vw"
                quality={75}
                draggable={false}
                loading="lazy"
                className="h-[19rem] w-auto max-w-none select-none object-cover sm:h-[24rem]"
              />
              <span className="absolute left-0 top-0 bg-graphite px-3 py-1.5 font-mono text-xs text-signal-bright">
                {pad(i + 1)}/{pad(count)}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          <DialogTitle className="sr-only">Gallery photo</DialogTitle>
          <DialogDescription className="sr-only">Use the left and right arrow keys to move between photos. Press Escape to close.</DialogDescription>
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
            <span className="font-mono text-sm tracking-[0.18em] text-ink">
              {open !== null ? `${pad(open + 1)}/${pad(count)}` : ""}
            </span>
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
    </section>
  );
}
