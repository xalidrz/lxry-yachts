import { ExternalLink, MessageSquareQuote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { SectionLink } from "@/components/section-link";
import { googleReviews, previewReviews, type GoogleReview } from "@/data/reviews";
import { links, site } from "@/config/site";

/** Rating stars. Fractional values fill part of the last star (4.7 shows 4 full + 70%). Red only. */
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

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6">
      <Stars value={review.rating} className="size-5" />
      <blockquote className="mt-4 flex-1 leading-relaxed text-ink/90">&ldquo;{review.text}&rdquo;</blockquote>
      <footer className="mt-5 border-t border-white/10 pt-4">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold text-ink">
          {review.author}
          {review.localGuide ? (
            <span className="rounded-full border border-white/15 bg-steel px-2.5 py-0.5 text-xs font-medium uppercase tracking-[0.12em] text-ink/80">
              Local Guide
            </span>
          ) : null}
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted">
          <MessageSquareQuote className="size-3.5 text-signal" aria-hidden />
          Google review
        </p>
      </footer>
    </article>
  );
}

/**
 * preview = home-page version: rating block, tags and three reviews, with a link to /reviews.
 * Reviews scroll sideways on mobile and sit in a grid from tablet up.
 */
export function Reviews({ preview = false }: { preview?: boolean }) {
  const shown = preview ? previewReviews : googleReviews;

  return (
    <section id="reviews" className={preview ? "bg-graphite py-20 sm:py-28" : "bg-graphite py-16 sm:py-24"}>
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {preview ? (
          <Reveal>
            <SectionHeading eyebrow="Reviews" title="What Hayward says" />
          </Reveal>
        ) : null}

        <div className={preview ? "mt-12 grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16" : "grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16"}>
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
            <p className="font-display text-sm font-bold uppercase tracking-[0.24em] text-muted">
              What reviewers tag us for
            </p>
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
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <div
            role="region"
            aria-label="Google reviews. Scroll sideways to read more."
            tabIndex={0}
            className="snap-scroll -mx-5 overflow-x-auto px-5 pb-4 md:mx-0 md:overflow-visible md:px-0 md:pb-0"
          >
            <ul className="flex snap-x snap-mandatory gap-3 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {shown.map((r) => (
                <li key={r.author} className="w-[86%] shrink-0 snap-start sm:w-[60%] md:w-auto">
                  <ReviewCard review={r} />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="ghost" className="h-14 px-8 text-lg">
              <a href={links.reviews} target="_blank" rel="noopener noreferrer">
                Read all reviews on Google
                <ExternalLink className="size-5" aria-hidden />
              </a>
            </Button>
            {preview ? <SectionLink href="/reviews">All {googleReviews.length} reviews here</SectionLink> : null}
          </div>
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink/90">Reviewers mention:</span> Honest work · Fair pricing · Explains
            the repair · Owner-run
          </p>
        </Reveal>
      </div>
    </section>
  );
}
