import { about } from "@/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function About() {
  return (
    <section id="apropos" className="bg-cream px-5 py-24 sm:px-8 md:py-36">
      <Reveal>
        <SectionHeading eyebrow={about.eyebrow} title={about.title} />
      </Reveal>
      <Reveal delay={120} className="mx-auto mt-12 max-w-2xl space-y-6 text-center text-lg leading-relaxed text-ink">
        {about.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Reveal>
    </section>
  );
}
