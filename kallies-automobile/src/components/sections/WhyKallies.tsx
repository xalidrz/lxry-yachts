import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { reasons } from "@/data/content";

export function WhyKallies() {
  return (
    <section className="section" aria-labelledby="warum-title">
      <div className="container">
        <SectionHeading eyebrow="Warum Kallies Automobile?" title={<span id="warum-title">Ein Autohaus, das Sie kennt.</span>} />
        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {reasons.map((r, i) => (
            <li key={r.title}>
              <Reveal delay={i * 100} className="h-full border-t border-ink pt-8">
                <div className="flex items-center justify-between">
                  <r.icon className="size-8 text-brand-ink" strokeWidth={1.5} aria-hidden />
                  <span className="font-display text-sm font-semibold tabular-nums text-grey">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-bold">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-grey">{r.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
