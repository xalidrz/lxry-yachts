import { Reveal } from "@/components/reveal";

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <Reveal className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>}
    </Reveal>
  );
}
