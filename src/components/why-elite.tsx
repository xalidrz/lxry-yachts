import Image from "next/image";
import { BadgeCheck, BadgeDollarSign, UserRound, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { owner } from "@/data/owner";
import { site } from "@/config/site";

const points: { icon: LucideIcon; title: string; body: string; proof: string }[] = [
  {
    icon: BadgeCheck,
    title: "Honest work",
    body: "Customers say they never get upsold. “Honest” is the word that keeps coming up in the reviews.",
    proof: "“Honest work” · 2 Google reviews",
  },
  {
    icon: UserRound,
    title: "Owner-run",
    body: `${site.owner} explains the problem so you understand it.`,
    proof: "“Helpful owner” · 4 Google reviews",
  },
  {
    icon: BadgeDollarSign,
    title: "Fair pricing",
    body: "Reviewers call the pricing fair and reasonable.",
    proof: "“Cost savings” · 2 Google reviews",
  },
];

export function WhyElite() {
  return (
    <section id="why" className="bg-carbon-surface border-y border-white/10 py-20 sm:py-28">
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

        <Reveal className="mt-4">
          <article className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-graphite p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
            <div className="relative flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-steel sm:w-44">
              {owner.photo ? (
                <Image src={owner.photo} alt={owner.photoAlt} fill sizes="176px" quality={80} className="object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-center text-muted">
                  <UserRound className="size-10" strokeWidth={1.5} aria-hidden />
                  <span className="text-sm font-medium uppercase tracking-[0.14em]">Photo coming soon</span>
                </div>
              )}
            </div>
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-[0.28em] text-signal">Meet {owner.name}</p>
              <h3 className="mt-2 font-display text-5xl font-extrabold uppercase leading-none tracking-tight text-ink">
                {owner.name}
              </h3>
              <p className="mt-2 font-display text-xl font-semibold uppercase tracking-[0.14em] text-muted">{owner.role}</p>
              <p className="mt-4 text-lg leading-relaxed text-ink/90">{owner.caption}</p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
