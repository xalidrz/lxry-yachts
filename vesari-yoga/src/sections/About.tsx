import { about } from "@/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function About() {
  return (
    <section id="apropos" className="px-5 py-24 sm:px-8 md:py-32">
      <Reveal>
        <SectionHeading eyebrow={about.eyebrow} title={about.title} />
      </Reveal>
      <Reveal delay={120} className="mx-auto mt-12 max-w-2xl space-y-6 text-center text-lg leading-relaxed text-charcoal-soft">
        {about.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Reveal>
    </section>
  );
}
