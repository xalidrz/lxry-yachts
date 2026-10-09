import { BadgeDollarSign, ShieldCheck, UserRound, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/config/site";

const points: { icon: LucideIcon; title: string; body: string; proof: string }[] = [
  {
    icon: ShieldCheck,
    title: "Trustworthy",
    body: "“Trustworthy” is the tag reviewers use most. Honest answers about what your car needs, and what it doesn't.",
    proof: "“Trustworthy mechanic” · 7 Google reviews",
  },
  {
    icon: UserRound,
    title: "Owner-run",
    body: `${site.owner} handles your car personally. You deal with the person doing the work, not a service desk.`,
    proof: "“Helpful owner” · 4 Google reviews",
  },
  {
    icon: BadgeDollarSign,
    title: "Fair pricing",
    body: "Honest work at a fair price. Reviewers call out the money they saved by bringing their car here.",
    proof: "“Cost savings” and “Honest work” · 4 Google reviews",
  },
];

export function WhyElite() {
  return (
    <section id="why" className="bg-carbon-surface scroll-mt-20 border-y border-white/10 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Why Elite" title="Honest shop. Real owner." />
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {points.map((p, i) => (
            <Reveal as="li" index={i} key={p.title} className="bg-graphite p-7 sm:p-9">
              <p.icon className="size-10 text-signal" strokeWidth={1.6} aria-hidden />
              <h3 className="mt-6 font-display text-4xl font-extrabold uppercase tracking-tight text-ink">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              <p className="mt-6 border-t border-white/10 pt-4 text-sm font-medium text-ink/80">{p.proof}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
