import { BadgeDollarSign, Clock, MapPin, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Accent, SectionHeading } from "@/components/SectionHeading";

const reasons = [
  { icon: BadgeDollarSign, title: "Fair Pricing", text: "Clear quotes with no surprises. Genuine prices for honest work." },
  { icon: ShieldCheck, title: "Quality Work", text: "Careful, tidy installation — whether it's a panel or a house full of lights." },
  { icon: Clock, title: "Jobs Finished On Time", text: "We show up when we say we will and finish when we promised." },
  { icon: MapPin, title: "Serving Edmonton & Area", text: "Local to Edmonton, so we're close when you need us." },
] as const;

export function WhyChoose() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="relative overflow-hidden bg-surface py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Why choose us"
          title={
            <span id="why-title">
              The <Accent>PB10</Accent> difference
            </span>
          }
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="bg-surface">
              <Reveal delay={i * 0.08} className="group relative h-full overflow-hidden p-8 transition-colors duration-500 hover:bg-surface-2">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brandred transition-transform duration-500 group-hover:scale-x-100" />
                <span aria-hidden className="font-heading text-6xl text-white/[0.06]">
                  0{i + 1}
                </span>
                <Icon className="mt-2 size-9 text-volt-light" strokeWidth={1.6} />
                <h3 className="mt-5 text-[1.3rem]">{title}</h3>
                <p className="mt-3 text-[0.97rem] text-muted-foreground">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
