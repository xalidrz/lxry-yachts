import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { filledReviews as filled } from "@/data/reviews";
import { links, site } from "@/config/site";

function Stars({ value, className = "size-6" }: { value: number; className?: string }) {
  return (
    <span className="flex gap-1" role="img" aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-block">
            <Star className={`${className} text-steel`} fill="currentColor" strokeWidth={0} aria-hidden />
            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={`${className} text-signal`} fill="currentColor" strokeWidth={0} aria-hidden />
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-graphite py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Reviews" title="What Hayward says" />
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Reveal className="rounded-2xl border border-white/10 bg-surface p-8 sm:p-10">
            <p className="font-display text-[7rem] font-extrabold leading-none tracking-tight text-ink sm:text-[9rem]">
              {site.rating.value}
              <span className="font-sans text-[0.62em] font-black text-signal">★</span>
            </p>
            <div className="mt-4">
              <Stars value={site.rating.value} />
            </div>
            <p className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-ink">
              {site.rating.count} Google reviews
            </p>
          </Reveal>

          <Reveal index={1}>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.24em] text-muted">
              What reviewers tag us for
            </h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {site.reviewTags.map((t) => (
                <li
                  key={t.label}
                  className="flex items-center gap-2.5 rounded-full border border-white/15 bg-surface py-2 pl-5 pr-2 font-display text-lg font-bold uppercase tracking-wide text-ink"
                >
                  {t.label}
                  <span className="flex min-w-8 items-center justify-center rounded-full bg-signal px-2.5 py-0.5 text-base text-white">
                    {t.count}
                  </span>
                </li>
              ))}
            </ul>
            <Button asChild variant="ghost" className="mt-9 h-14 px-8 text-lg">
              <a href={links.reviews} target="_blank" rel="noopener noreferrer">
                Read all reviews on Google
                <ExternalLink className="size-5" aria-hidden />
              </a>
            </Button>
          </Reveal>
        </div>

        {filled.length > 0 ? (
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {filled.map((r, i) => (
              <Reveal as="li" index={i} key={`${r.author}-${i}`} className="rounded-2xl border border-white/10 bg-surface p-6">
                <Stars value={r.rating} className="size-5" />
                <blockquote className="mt-4 leading-relaxed text-ink/90">“{r.text}”</blockquote>
                <p className="mt-4 text-sm text-muted">
                  {r.author}
                  {r.date ? ` · ${r.date}` : ""} · Google
                </p>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
