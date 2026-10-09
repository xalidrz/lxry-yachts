import { Reveal } from "@/components/reveal";

export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display mt-3 text-4xl font-semibold leading-tight text-cream md:text-5xl">{title}</h2>
      <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
      {sub ? <p className="mt-5 text-base text-cream/65 md:text-lg">{sub}</p> : null}
    </Reveal>
  );
}
