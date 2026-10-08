import { useCallback, useMemo, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { m } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { Accent, SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { gallery, type GalleryCategory } from "@/data/gallery";
import { cn } from "@/lib/utils";

type Filter = "all" | GalleryCategory;
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "electrical", label: "Electrical" },
  { id: "wedding", label: "Wedding Lighting" },
];

interface GalleryProps {
  /** Show only one kind of work and hide the filter chips. */
  category?: GalleryCategory;
  /** Show at most this many photos, with a link to the full gallery. */
  limit?: number;
  /** Replace the section heading with a custom one (inner pages that already have an h1). */
  heading?: { eyebrow: string; title: React.ReactNode; intro?: string } | "none";
}

export function Gallery({ category, limit, heading }: GalleryProps = {}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const items = useMemo(() => {
    const kind = category ?? filter;
    const list = kind === "all" ? gallery : gallery.filter((g) => g.category === kind);
    return limit ? list.slice(0, limit) : list;
  }, [filter, category, limit]);
  const current = open !== null ? items[open] : null;

  const step = useCallback((dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)), [items.length]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  return (
    <section id="gallery" aria-labelledby={heading === "none" ? undefined : "gallery-title"} aria-label={heading === "none" ? "Project photos" : undefined} className={cn("relative bg-ink", heading === "none" ? "pb-24 pt-4 md:pb-32" : "py-24 md:py-32")}>
      <div className="container">
        {heading === "none" ? null : (
          <SectionHeading
            eyebrow={heading?.eyebrow ?? "Recent projects"}
            title={
              <span id="gallery-title">
                {heading?.title ?? (
                  <>
                    Our work, <Accent>lit up</Accent>
                  </>
                )}
              </span>
            }
            intro={heading?.intro ?? "Real jobs across Edmonton. Tap any photo to see it full size."}
          />
        )}

        {!category && !limit && (
        <Reveal delay={0.1} className={cn(heading !== "none" && "mt-10")}>
          <div role="group" aria-label="Filter gallery" className="flex flex-wrap items-center justify-center gap-2">
            {filters.map((f) => (
              <Button key={f.id} variant="chip" size="sm" className="px-4" data-active={filter === f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
              </Button>
            ))}
          </div>
        </Reveal>
        )}

        <m.ul key={category ?? filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className={cn("columns-1 gap-4 sm:columns-2 lg:columns-3", (heading !== "none" || (!category && !limit)) && "mt-10")}>
          {items.map((g, i) => (
            <li key={g.id} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open photo: ${g.title}`}
                className="group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-surface text-left transition-all duration-500 hover:border-volt/60 hover:shadow-volt-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-light"
              >
                {/* very tall photos are cropped to 3:4 in the grid so the columns stay balanced; the lightbox shows them whole */}
                <img
                  src={g.thumb}
                  alt={g.alt}
                  width={g.width}
                  height={g.height}
                  loading="lazy"
                  decoding="async"
                  style={{ aspectRatio: `${g.width} / ${Math.min(g.height, g.width * (4 / 3))}` }}
                  className="block h-auto w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-md:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <span>
                    <span className={cn("label mb-1 inline-block rounded bg-brandred px-2 py-0.5 text-[0.7rem] leading-tight text-white")}>{g.category === "wedding" ? "Wedding lighting" : "Electrical"}</span>
                    <span className="block font-heading text-[1.05rem] leading-tight">{g.title}</span>
                  </span>
                  <Expand aria-hidden className="size-5 shrink-0 text-volt-light" />
                </span>
              </button>
            </li>
          ))}
        </m.ul>

        {limit && (
          <div className="mt-6 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/gallery">
                View the full gallery <ArrowRight />
              </Link>
            </Button>
          </div>
        )}
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent
          className="inset-0 flex flex-col items-center justify-center px-4 py-16 md:px-24"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLElement).focus();
          }}
          onKeyDown={onKey}
          onClick={(e) => e.target === e.currentTarget && setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={onTouchEnd}
        >
          {current && (
            <>
              <DialogTitle className="sr-only">{current.title}</DialogTitle>
              <DialogDescription className="sr-only">{current.alt}</DialogDescription>
              <figure className="flex max-h-full max-w-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
                <img key={current.id} src={current.src} alt={current.alt} className="max-h-[calc(100svh-9.5rem)] w-auto max-w-full animate-in rounded-lg object-contain shadow-[0_0_80px_-10px_rgba(247,147,30,0.35)] fade-in-0 zoom-in-95 duration-300" />
                <figcaption className="mt-4 text-center">
                  <span className="font-heading text-lg">{current.title}</span>
                  <span className="label ml-3 text-[0.85rem] text-muted-foreground">
                    {(open ?? 0) + 1} / {items.length}
                  </span>
                </figcaption>
              </figure>
              {items.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur transition-colors hover:border-volt hover:text-volt-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-light md:left-6">
                    <ChevronLeft className="size-6" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur transition-colors hover:border-volt hover:text-volt-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-light md:right-6">
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}
              <DialogClose aria-label="Close photo" className="absolute right-3 top-3 grid size-12 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur transition-colors hover:border-volt hover:text-volt-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-light md:right-6 md:top-6">
                <X className="size-6" />
              </DialogClose>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
