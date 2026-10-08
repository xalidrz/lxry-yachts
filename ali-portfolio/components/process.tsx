import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  "I study your business and current website.",
  "I build a free preview so you can see it before paying.",
  "You request changes; I refine it.",
  "Your website goes live on your domain.",
];

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading eyebrow="Process" title="How I work" intro="You see the website before you pay for it." />
      <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
        {/* connecting line: vertical on mobile, horizontal on md+ */}
        <span aria-hidden className="absolute bottom-4 left-5 top-4 w-px bg-border md:bottom-auto md:left-5 md:right-5 md:top-5 md:h-px md:w-auto" />
        {steps.map((text, i) => (
          <Reveal as="li" key={text} delay={i * 90} className="relative flex gap-5 md:block">
            <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground ring-8 ring-background">
              {i + 1}
            </span>
            <p className="pt-1.5 text-base leading-relaxed md:mt-5 md:pt-0 md:pr-2">{text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
