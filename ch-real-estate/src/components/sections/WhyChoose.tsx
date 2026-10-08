import { Gem, ShieldCheck, CalendarCheck, Scale } from "lucide-react";
import { Gold, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

const points = [
  { icon: ShieldCheck, title: "Verified Properties", text: "Ownership, files and documents are checked before any listing goes live." },
  { icon: Scale, title: "Transparent Pricing", text: "Clear quotes and agreed rates. What we say up front is what you pay." },
  { icon: Gem, title: "Quality Materials", text: "Branded, tested materials and skilled crews — built to last generations." },
  { icon: CalendarCheck, title: "On-Time Delivery", text: "A written schedule with milestones, and a team that keeps to it." },
];

export function WhyChoose() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 bg-ink py-28">
      <div className="container grid items-start gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            id="about-title"
            align="left"
            className="mb-8 md:mb-8"
            eyebrow="Why Choose CH"
            title={
              <>
                One team. <Gold>Total accountability.</Gold>
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="max-w-lg text-lg text-muted-foreground">
              CH Real Estate &amp; Builder's helps families and investors in Wah Cantt buy, sell, rent and build — from
              a verified plot to a finished home. Because the agency and the construction team work under one roof,
              you never have to chase two companies for one dream.
            </p>
            <div className="mt-10 h-px w-24 bg-gold-gradient" aria-hidden />
          </Reveal>
        </div>

        <div className="grid gap-px border border-gold/20 bg-gold/20 sm:grid-cols-2">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="bg-ink">
              <div className="group h-full bg-ink p-9 transition-colors duration-500 hover:bg-surface">
                <p.icon className="mb-7 size-9 text-gold transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.3} />
                <h3 className="text-[1.5rem] text-cream">{p.title}</h3>
                <p className="mt-3 text-[1rem] text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
