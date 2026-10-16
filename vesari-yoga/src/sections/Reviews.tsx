import { Star } from "lucide-react";
import { reviews } from "@/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/ui/card";

export function Reviews() {
  return (
    <section id="avis" data-tone="dark" className="bg-espresso px-5 py-24 text-cream sm:px-8 md:py-36">
      <Reveal>
        <SectionHeading tone="dark" eyebrow={reviews.eyebrow} title={reviews.title} />
      </Reveal>
      <div className="mx-auto mt-16 max-w-3xl">
        {reviews.items.map((review) => (
          <Reveal key={review.author}>
            <Card className="p-8 text-center sm:p-12">
              <div role="img" aria-label={`${review.stars} étoiles sur 5`} className="flex justify-center gap-1.5 text-gold">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <Star key={i} aria-hidden="true" strokeWidth={1.25} className="size-6 fill-current" />
                ))}
              </div>
              <blockquote className="mt-8 font-serif text-2xl leading-snug sm:text-3xl">« {review.text} »</blockquote>
              <p className="mt-8 font-medium text-gold">{review.author}</p>
              <p className="mt-1 text-sm text-cream-dim">
                {reviews.source} · {reviews.rating}/5 · {reviews.count}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
