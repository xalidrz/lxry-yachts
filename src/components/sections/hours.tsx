import { ArrowUpRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { DayNight, HoursClock } from "@/components/hours-clock";
import { googleReviews } from "@/data/reviews";
import { links, site } from "@/config/site";
import { cn } from "@/lib/utils";

/** 06: the 24-hour clock. The week table lives on the Location page and the summary in the footer. */
export function Hours({ h1 = false }: { h1?: boolean }) {
  return (
    <section id="hours" className="grid-lines border-b border-line bg-graphite py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1fr_auto] lg:gap-16 lg:px-8">
        <div className="space-y-8">
          <SectionHead
            n="06"
            title="Hours"
            as={h1 ? "h1" : "h2"}
            intro="Red on the clock is when the shop is open. The needle follows Pacific time, the shop’s local time, wherever you are."
          />
          <Reveal index={1} className="space-y-6">
            <p className="max-w-md text-sm leading-relaxed text-ink/85">
              {site.profile.appointments}. Pick a day and a time window and {site.owner} will text you back.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/book" label="Request a time" />
              <Button href="/location" variant="outline" label="Full week" />
            </div>
            <DayNight />
          </Reveal>
        </div>
        <div className="lg:justify-self-end">
          <HoursClock />
        </div>
      </div>
    </section>
  );
}

const featured = ["Ashwin Kumar", "Maria Naranjo", "Arav Parmar"].map((n) => googleReviews.find((r) => r.author === n)!);

/** Google rating and three real reviews, exactly as written. */
export function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="border-b border-line bg-graphite py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="flex flex-col border border-line bg-surface p-6 sm:p-8">
            <h2 id="reviews-title" className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Google rating
            </h2>
            <div className="mt-3 flex items-end gap-4">
              <p className="font-display text-8xl font-extrabold leading-none tracking-tight text-ink">{site.rating.value.toFixed(1)}</p>
              <div className="pb-2">
                <div className="flex gap-1" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={cn("size-5", i < 4 ? "fill-ink text-ink" : "text-ink")} />
                  ))}
                </div>
                <p className="mt-2 font-mono text-sm text-muted">{site.rating.count} Google reviews</p>
              </div>
            </div>
            <div className="mt-auto pt-8">
              <Button href={links.reviews} target="_blank" rel="noopener noreferrer" label="See reviews on Google" icon={<ArrowUpRight aria-hidden />} />
            </div>
          </Reveal>

          <Reveal index={1} className="border border-line bg-surface p-6 sm:p-8">
            <ul className="space-y-5">
              {featured.map((r) => (
                <li key={r.author} className="border-l-2 border-line pl-4">
                  <blockquote className="text-sm leading-relaxed text-ink/90">&ldquo;{r.text}&rdquo;</blockquote>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    {r.author}
                    {r.localGuide ? " · Local Guide" : ""} · {r.rating}★
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
