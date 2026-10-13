import { ArrowUpRight, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { links, site } from "@/config/site";

/** Sends people to Google to write a review. There is deliberately no form here: feedback on our own site would go nowhere. */
export function ReviewCta() {
  return (
    <section aria-labelledby="review-cta-title" className="border-b border-line grid-lines bg-graphite pb-16 pt-6 sm:pb-24 sm:pt-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="grid gap-10 border border-line bg-surface p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal-bright">Been here? Tell others.</p>
            <h2 id="review-cta-title" className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl">
              Been to the shop? Tell Hayward how it went.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">Reviews help other drivers find an honest mechanic.</p>
          </div>

          <div className="flex min-w-0 flex-col items-start gap-6 lg:items-end">
            {/* Decoration only: it is not a rating control. Hover fills the stars red, one after another. */}
            <div className="star-row flex gap-2 sm:gap-3" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="star size-12 text-signal sm:size-16" style={{ ["--i" as string]: i }} strokeWidth={1.5} />
              ))}
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button
                href={links.writeReview}
                target="_blank"
                rel="noopener noreferrer"
                label="Leave a Google review"
                icon={<ArrowUpRight aria-hidden />}
                className="rounded-full"
              />
              <Button
                href={links.tel}
                variant="outline"
                label={`Something not right? Call ${site.owner}`}
                icon={<Phone aria-hidden />}
                className="max-w-full rounded-full px-4 text-[0.8125rem] tracking-[0.04em] sm:px-6 sm:text-[1.0625rem] sm:tracking-[0.1em]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
