"use client";

import { DoorOpen, MessageCircle, Sparkles } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const icons = [MessageCircle, DoorOpen, Sparkles];

export function HowItWorks() {
  const { t } = useLang();
  return (
    <section id="why-us" className="section bg-ink-2">
      <div className="container">
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} />
        <ol className="relative mx-auto grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
          {/* connecting line (desktop) */}
          <div aria-hidden className="absolute inset-x-[16%] top-8 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent md:block" />
          {t.why.steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <li key={i}>
                <Reveal delay={i * 0.12} className="relative flex flex-col items-center text-center">
                  <span className="relative grid size-16 place-items-center rounded-full border border-gold bg-ink text-gold-light shadow-gold-glow">
                    <Icon className="size-7" strokeWidth={1.5} />
                    <span className="font-display absolute -end-1 -top-1 grid size-7 place-items-center rounded-full bg-gold-gradient text-sm font-semibold text-ink">{i + 1}</span>
                  </span>
                  <h3 className="font-display mt-6 text-2xl font-semibold text-cream">{s.title}</h3>
                  <p className="mt-2 max-w-xs text-cream/65">{s.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
