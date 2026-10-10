"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { PearlButton } from "@/components/ui/pearl-button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion";
import { SectionLink } from "@/components/section-link";
import { categoryCounts, photos, photosIn, previewPhotos, type PhotoCategory } from "@/data/photos";
import { cn } from "@/lib/utils";

type Tab = "all" | PhotoCategory;
const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "engine", label: "Engine" },
  { id: "electrical", label: "Electrical" },
  { id: "shop", label: "Shop" },
];

/** preview = home-page version: six curated photos, no tabs, link to /work. */
export function Gallery({ preview = false }: { preview?: boolean }) {
  const [tab, setTab] = useState<Tab>("all");
  const [active, setActive] = useState<number | null>(null);

  const visible = useMemo(() => (preview ? previewPhotos : photosIn(tab)), [preview, tab]);

  const step = useCallback(
    (d: number) => setActive((i) => (i === null ? i : (i + d + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, step]);

  const current = active === null ? null : visible[active];

  return (
    <section id="work" className={preview ? "bg-graphite py-20 sm:py-28" : "bg-graphite py-16 sm:py-24"}>
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {preview ? (
          <Reveal>
            <SectionHeading
              eyebrow="Our work"
              title="Straight from the shop floor"
              intro="Real jobs in our Hayward bays: engines, wiring, under-car work and the cars that come through. Every photo is untouched."
            />
          </Reveal>
        ) : (
          <div role="tablist" aria-label="Photo categories" className="flex flex-wrap gap-2">
          {tabs.map((f) => (
            <PearlButton
              key={f.id}
              role="tab"
              aria-selected={tab === f.id}
              variant={tab === f.id ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTab(f.id)}
            >
              {f.label}
              <span className={cn("text-xs", tab === f.id ? "text-white" : "text-ink/80")}>{categoryCounts[f.id]}</span>
            </PearlButton>
          ))}
          </div>
        )}

        <ul className={cn("columns-2 gap-3 md:columns-3 md:gap-4", preview ? "mt-12" : "mt-8")}>
          {visible.map((p, i) => (
            <li key={p.file} className="mb-3 break-inside-avoid md:mb-4">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Open photo: ${p.alt}`}
                className="group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-surface text-left transition-[border-color,box-shadow] duration-200 hover:border-signal hover:ring-2 hover:ring-signal"
              >
                <Image
                  src={p.file}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 1152px) 368px, (min-width: 768px) 33vw, 50vw"
                  quality={75}
                  loading="lazy"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-2 right-2 flex size-9 items-center justify-center rounded-full bg-graphite text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="size-4" aria-hidden />
                </span>
              </button>
            </li>
          ))}
        </ul>
        {preview ? (
          <Reveal className="mt-10">
            <SectionLink href="/work">See all {photos.length} photos</SectionLink>
          </Reveal>
        ) : null}
      </div>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="items-center justify-center">
          <DialogTitle className="sr-only">Photo viewer</DialogTitle>
          <DialogDescription className="sr-only">Use the arrow keys to move between photos. Press Escape to close.</DialogDescription>
          <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6">
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-muted">
              {active !== null ? active + 1 : 0} / {visible.length}
            </p>
            <DialogClose asChild>
              <PearlButton variant="secondary" size="icon" aria-label="Close photo viewer">
                <X className="size-5" aria-hidden />
              </PearlButton>
            </DialogClose>
          </div>
          <div className="relative flex min-h-0 w-full flex-1 items-center justify-center px-3 sm:px-20">
            {current ? (
              <Image
                key={current.file}
                src={current.file}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="100vw"
                quality={80}
                priority
                className="max-h-full w-auto max-w-full object-contain"
              />
            ) : null}
            {visible.length > 1 ? (
              <>
                <PearlButton variant="secondary" size="icon" aria-label="Previous photo" onClick={() => step(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 sm:left-5">
                  <ChevronLeft className="size-6" aria-hidden />
                </PearlButton>
                <PearlButton variant="secondary" size="icon" aria-label="Next photo" onClick={() => step(1)} className="absolute right-2 top-1/2 -translate-y-1/2 sm:right-5">
                  <ChevronRight className="size-6" aria-hidden />
                </PearlButton>
              </>
            ) : null}
          </div>
          <p className="mx-auto w-full max-w-3xl px-5 py-4 text-center text-sm leading-relaxed text-muted">{current?.alt}</p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
