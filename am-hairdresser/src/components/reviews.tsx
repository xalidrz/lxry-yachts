"use client";

import { ExternalLink, Star } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { reviews } from "@/data/reviews";
import { site } from "@/data/site";

export function Reviews() {
  const { t, lang } = useLang();
  const filled = reviews.filter((r) => r.text.en.trim() || r.text.ar.trim());

  return (
    <section id="reviews" className="section">
      <div className="container">
        <SectionHeading eyebrow={t.reviews.eyebrow} title={t.reviews.title} />

        <Reveal className="flex flex-col items-center gap-6 text-center">
          <div className="glass inline-flex items-center gap-5 rounded-full px-7 py-4" dir="ltr">
            <span className="font-display text-5xl font-semibold text-cream">{site.rating}</span>
            <div className="text-start">
              <div className="flex gap-0.5" role="img" aria-label={`${site.rating} / 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-1 text-sm text-cream/70" dir={lang === "ar" ? "rtl" : "ltr"}>{t.reviews.sub}</p>
            </div>
          </div>
          <Button asChild size="lg">
            <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink />
              {t.reviews.cta}
            </a>
          </Button>
        </Reveal>

        {filled.length > 0 && (
          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {filled.map((r, i) => (
              <li key={i}>
                <Reveal delay={i * 0.08} className="h-full">
                  <Card className="h-full p-6">
                    <div className="flex gap-0.5" role="img" aria-label={`${r.rating} / 5`}>
                      {Array.from({ length: r.rating }).map((_, k) => (
                        <Star key={k} className="size-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="mt-4 text-cream/85">{(lang === "ar" ? r.text.ar || r.text.en : r.text.en || r.text.ar)}</p>
                    <p className="mt-4 text-sm text-cream/55">{[r.author, r.date].filter(Boolean).join(" · ")}</p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
