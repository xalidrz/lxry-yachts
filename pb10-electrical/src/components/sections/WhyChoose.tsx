import { BadgeDollarSign, Clock, MapPin, ShieldCheck, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Accent, SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { site, telHref } from "@/lib/site";

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

        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-volt/40 bg-gradient-to-br from-surface-2 to-ink px-6 py-12 text-center md:px-12">
            <div aria-hidden className="absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-volt/20 blur-[90px]" />
            <h3 className="relative text-[clamp(1.6rem,3.6vw,2.4rem)]">
              Ready for a <Accent>free quote</Accent>?
            </h3>
            <p className="relative mx-auto mt-3 max-w-xl text-muted-foreground">Electrical job or wedding date — tell us what you have planned and we'll take it from there.</p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#contact">Get a Free Quote</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={telHref}>
                  <Phone /> {site.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
