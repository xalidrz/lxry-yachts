import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselControls, CarouselItem } from "@/components/ui/carousel";
import { REVIEWS_ARE_PLACEHOLDER, reviews } from "@/data/content";
import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";

function Stars({ n, className }: { n: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className ?? ""}`} role="img" aria-label={`${n} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`size-4 ${i <= n ? "fill-brand text-brand" : "text-white/30"}`} aria-hidden />
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section className="on-dark section bg-ink text-white" aria-labelledby="reviews-title">
      <div className="container">
        <Carousel>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Das sagen unsere Kunden</p>
              <h2 id="reviews-title" className="display-2 mt-4">
                {site.rating.value}/{site.rating.outOf} Sterne
              </h2>
              <p className="mt-4 flex items-center gap-3 text-lg text-white/80">
                <Stars n={5} /> <span>aus {site.rating.count} Bewertungen</span>
              </p>
            </div>
            <CarouselControls dark />
          </div>

          <Reveal className="mt-12">
            <CarouselContent>
              {reviews.map((r) => (
                <CarouselItem key={r.name} className="md:basis-1/2 lg:basis-1/3">
                  <figure className="flex h-full flex-col rounded-lg border border-white/15 p-8">
                    <Stars n={r.stars} />
                    <blockquote className="mt-6 flex-1 text-lg leading-relaxed">„{r.text}“</blockquote>
                    <figcaption className="mt-8 border-t border-white/15 pt-4 text-sm">
                      <span className="font-semibold">{r.name}</span>
                      <span className="text-white/70"> · {r.place}</span>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Reveal>
          {REVIEWS_ARE_PLACEHOLDER && <p className="mt-6 text-xs text-white/70">Platzhalter-Texte – vor Livegang durch die echten Google-/Trustindex-Bewertungen ersetzen.</p>}
        </Carousel>
      </div>
    </section>
  );
}
