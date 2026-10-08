import { ExternalLink, Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Accent, SectionHeading } from "@/components/SectionHeading";
import { Stars } from "@/components/Stars";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const reviews = ["Best customer service, great quality, genuine price.", "Pricing was fair and service was excellent throughout the process."];

export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div aria-hidden className="absolute left-1/2 top-1/3 size-[640px] -translate-x-1/2 rounded-full bg-volt/[0.07] blur-[130px]" />
      <div className="container relative">
        <SectionHeading
          eyebrow="Reviews"
          title={
            <span id="reviews-title">
              Trusted by <Accent>Edmonton</Accent> customers
            </span>
          }
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.2fr_1.2fr]">
          <Reveal className="h-full">
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-volt/40 bg-surface p-8 text-center shadow-[0_0_60px_-20px_rgba(247,147,30,0.5)]">
              <p className="label text-[0.9rem] text-muted-foreground">Google rating</p>
              <p className="text-volt-gradient mt-2 font-heading text-[5.5rem] leading-none">{site.rating.toFixed(1)}</p>
              <Stars rating={site.rating} className="mt-4" size="size-7" />
              <p className="mt-4 text-sm text-muted-foreground">Rated by customers on Google</p>
            </div>
          </Reveal>

          {reviews.map((text, i) => (
            <Reveal key={text} delay={0.12 * (i + 1)} className="h-full">
              <figure className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-8 transition-colors hover:border-volt/50">
                <Quote aria-hidden className="size-9 text-volt/70" strokeWidth={1.5} />
                <blockquote className="mt-5 flex-1 font-heading text-[1.35rem] leading-snug md:text-[1.5rem]">“{text}”</blockquote>
                <figcaption className="label mt-6 flex items-center gap-2.5 text-[0.85rem] text-muted-foreground">
                  <span aria-hidden className="h-px w-6 bg-brandred" />
                  Google review
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
              Read all reviews on Google <ExternalLink />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
