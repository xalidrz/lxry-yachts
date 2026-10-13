"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { featuredReview, marqueeRows, reviewsForTopic, topics, type Review, type ReviewTopic } from "@/lib/reviews";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { links, site } from "@/config/site";
import { cn } from "@/lib/utils";

function Stars() {
  return (
    <div className="flex gap-1" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-4 fill-signal text-signal" aria-hidden />
      ))}
    </div>
  );
}

function ReviewCard({ r, grid = false }: { r: Review; grid?: boolean }) {
  return (
    <article
      className={cn(
        "flex flex-col border border-line bg-surface p-6 transition-colors hover:border-signal",
        grid ? "h-full" : "mr-4 w-[20rem] shrink-0 sm:w-[24rem]",
      )}
    >
      <Stars />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/90">{r.text}</blockquote>
      <footer className="mt-5 border-t border-line pt-4">
        <p className="font-display text-xl font-bold uppercase leading-none tracking-tight text-ink">{r.name}</p>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {r.badge ? `${r.badge} · ` : ""}
          {r.year}
        </p>
        {r.tag ? (
          <p className="mt-3 inline-block border border-line px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink/80">{r.tag}</p>
        ) : null}
      </footer>
    </article>
  );
}

/**
 * One marquee row. It scrolls by moving scrollLeft, so on phones the row is also a normal swipeable
 * strip. It stops while hovered or touched, while off screen and when paused, then carries on from
 * wherever it was left. The cards are rendered twice so the loop never shows a seam.
 */
function MarqueeRow({ items, dir, running, label }: { items: Review[]; dir: 1 | -1; running: boolean; label: string }) {
  const el = useRef<HTMLDivElement>(null);
  const hover = useRef(false);
  const touching = useRef(false);
  const visible = useRef(false);
  const runningRef = useRef(running);
  const resume = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const half = () => node.scrollWidth / 2;
    let pos = dir === 1 ? 0 : half();
    node.scrollLeft = pos;
    let raf = 0;
    let last = performance.now();
    const SPEED = 26; // px per second

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (!visible.current || hover.current || touching.current || !runningRef.current) {
        pos = node.scrollLeft; // stay in step with any manual scrolling
        return;
      }
      const h = half();
      pos += dir * SPEED * dt;
      if (pos >= h) pos -= h;
      if (pos <= 0) pos += h;
      node.scrollLeft = pos;
    };
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.05 });
    io.observe(node);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      if (resume.current) clearTimeout(resume.current);
    };
  }, [dir]);

  const wrapManual = () => {
    const node = el.current;
    if (!node || !(hover.current || touching.current)) return;
    const h = node.scrollWidth / 2;
    if (node.scrollLeft >= h) node.scrollLeft -= h;
    else if (node.scrollLeft <= 0) node.scrollLeft += h;
  };

  return (
    <div
      ref={el}
      role="region"
      aria-label={label}
      className="snap-scroll flex overflow-x-auto"
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
      onTouchStart={() => {
        touching.current = true;
        if (resume.current) clearTimeout(resume.current);
      }}
      onTouchEnd={() => {
        resume.current = setTimeout(() => (touching.current = false), 2000);
      }}
      onScroll={wrapManual}
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="flex" aria-hidden={copy === 1 ? true : undefined}>
          {items.map((r) => (
            <ReviewCard key={`${copy}-${r.name}`} r={r} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function Reviews() {
  const reduce = usePrefersReducedMotion();
  const [topic, setTopic] = useState<ReviewTopic | "all">("all");
  const [running, setRunning] = useState(true);
  const f = featuredReview;
  // Rows scroll only on "All" and only when motion is welcome; otherwise a static grid.
  const marquee = topic === "all" && !reduce;
  const list = reviewsForTopic(topic);

  return (
    <section id="reviews" className="grid-lines border-b border-line bg-graphite pb-16 pt-6 sm:pb-24 sm:pt-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead n="06" title="What our customers say" as="h1" />
        <Reveal index={1} className="mt-6">
          <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-ink sm:text-sm">
            <span>{site.rating.value.toFixed(1)}★ on Google</span>
            <span className="text-muted" aria-hidden>
              ·
            </span>
            <span>{site.rating.count} reviews</span>
            <span className="text-muted" aria-hidden>
              ·
            </span>
            <span>Customers since {site.customersSince}</span>
          </p>
        </Reveal>

        <Reveal index={2} className="mt-12">
          <figure className="relative border border-line bg-surface p-6 sm:p-10 lg:p-14">
            <span aria-hidden className="pointer-events-none absolute left-4 top-0 select-none font-display text-[9rem] font-extrabold leading-[0.9] text-signal sm:left-8 sm:text-[14rem]">
              &ldquo;
            </span>
            <blockquote className="relative pt-16 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:pt-24 sm:text-5xl lg:max-w-4xl">
              {f.text}
            </blockquote>
            <figcaption className="relative mt-8">
              <p className="font-display text-2xl font-bold uppercase tracking-tight text-ink">{f.name}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                {f.badge ? `${f.badge} · ` : ""}
                {f.year}
              </p>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label="Show reviews about" className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={topic === t.id}
                onClick={() => setTopic(t.id)}
                className={cn(
                  "h-11 border px-4 font-mono text-xs uppercase tracking-[0.16em]",
                  topic === t.id ? "border-signal bg-signal-deep text-white" : "border-line text-muted hover:border-steel hover:text-ink",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          {marquee ? (
            <button
              type="button"
              onClick={() => setRunning((v) => !v)}
              className="inline-flex h-11 items-center gap-2 border border-line px-4 font-mono text-xs uppercase tracking-[0.16em] text-muted hover:border-steel hover:text-ink"
            >
              {running ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
              {running ? "Pause scrolling" : "Resume scrolling"}
            </button>
          ) : null}
        </div>
      </div>

      {marquee ? (
        <div className="mt-6 space-y-4">
          <MarqueeRow items={[...marqueeRows[0]]} dir={1} running={running} label="Customer reviews, first row" />
          <MarqueeRow items={[...marqueeRows[1]]} dir={-1} running={running} label="Customer reviews, second row" />
        </div>
      ) : (
        <ul className="mx-auto mt-6 grid max-w-7xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {list.map((r) => (
            <li key={r.name}>
              <ReviewCard r={r} grid />
            </li>
          ))}
        </ul>
      )}

      <div className="mx-auto mt-10 max-w-7xl px-5 lg:px-8">
        <Button
          href={links.reviews}
          target="_blank"
          rel="noopener noreferrer"
          label={`Read all ${site.rating.count} reviews on Google`}
          icon={<ArrowUpRight aria-hidden />}
          className="rounded-full"
        />
      </div>
    </section>
  );
}
