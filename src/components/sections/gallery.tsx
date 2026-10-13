"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { Lightbox } from "@/components/lightbox";
import { SectionHead } from "@/components/section-head";
import { workColumns } from "@/data/photos";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Parallax travel per column over the section's scroll, in px. Negative = up. Columns 1 and 3 rise, 2 sinks. */
const TRAVEL = [-110, 80, -60];
const GRID: Record<number, string> = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" };
const pad = (n: number) => String(n).padStart(2, "0");

function Column({
  i,
  active,
  progress,
  parallax,
  onOpen,
}: {
  i: number;
  active: boolean;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  parallax: boolean;
  onOpen: (col: number, photo: number) => void;
}) {
  const col = workColumns[i];
  const travel = TRAVEL[i % TRAVEL.length];
  // travel < 0: the column drifts up as the page scrolls; travel > 0: it drifts down.
  const y = useTransform(progress, [0, 1], [-travel / 2, travel / 2]);
  return (
    <div className={cn(active ? "block" : "hidden", "md:block")}>
      <p className="mb-4 border-b border-line pb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {pad(i + 1)} · {col.label.toUpperCase()}
      </p>
      <m.ul className="space-y-3" style={parallax ? { y } : undefined}>
        {col.photos.map((p, k) => (
          <li key={p.file}>
            <button
              type="button"
              onClick={() => onOpen(i, k)}
              aria-label={`Open photo ${k + 1} of ${col.photos.length} in ${col.label}: ${p.alt}`}
              className="work-tile block w-full overflow-hidden border border-line bg-surface"
            >
              <Image
                src={p.file}
                alt=""
                width={p.width}
                height={p.height}
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 30vw, 100vw"
                quality={75}
                priority={i === 0 && k === 0}
                loading={k === 0 ? "eager" : "lazy"}
                className="block h-auto w-full"
              />
            </button>
          </li>
        ))}
      </m.ul>
    </div>
  );
}

export function Gallery({ h1 = false }: { h1?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<{ col: number; photo: number } | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const cols = workColumns;
  const openCol = open ? cols[open.col] : null;

  return (
    <section id="gallery" className="border-b border-line bg-graphite pb-20 pt-6 sm:pb-28 sm:pt-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead n="09" title="The work" as={h1 ? "h1" : "h2"} intro="Photos from the shop floor, sorted by what they show." />

        {/* Phones: one column at a time */}
        <div role="tablist" aria-label="Photo categories" className="mt-10 flex gap-2 overflow-x-auto md:hidden">
          {cols.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              type="button"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={cn(
                "h-11 shrink-0 border px-4 font-mono text-xs uppercase tracking-[0.16em]",
                tab === i ? "border-signal bg-signal-deep text-white" : "border-line text-muted hover:border-steel hover:text-ink",
              )}
            >
              {c.tab}
            </button>
          ))}
        </div>

        <div
          ref={ref}
          className={cn("mt-8 grid gap-4 pb-28 md:mt-12 md:pb-32", GRID[cols.length] ?? "md:grid-cols-3")}
        >
          {cols.map((c, i) => (
            <Column key={c.id} i={i} active={tab === i} progress={scrollYProgress} parallax={desktop && !reduce} onOpen={(col, photo) => setOpen({ col, photo })} />
          ))}
        </div>
      </div>

      <Lightbox
        photos={openCol?.photos ?? []}
        index={open ? open.photo : null}
        onIndexChange={(i) => setOpen((o) => (o && i !== null ? { col: o.col, photo: i } : null))}
        label={openCol ? `${openCol.label} photos` : "Photos"}
      />
    </section>
  );
}
