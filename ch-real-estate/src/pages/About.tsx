import { Link } from "react-router-dom";
import { Building2, HardHat } from "lucide-react";
import { Gold, SectionHeading } from "@/components/SectionHeading";
import { PageHeader } from "@/components/PageHeader";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { areas } from "@/lib/filters";
import { usePageMeta } from "@/lib/seo";

const pillars = [
  {
    icon: Building2,
    title: "Real estate",
    text: "We list, verify and sell or rent houses, plots, apartments and commercial property across Wah Cantt. Every listing is physically inspected and its documents are reviewed before we show it to you.",
  },
  {
    icon: HardHat,
    title: "Construction",
    text: "From grey structure to complete turnkey homes, renovation and design with map approval, our in-house team builds with tested materials, written schedules and milestone-based payments.",
  },
];

export default function About() {
  usePageMeta("/about");
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title={
          <>
            One trusted name for <Gold>buying, selling &amp; building</Gold>
          </>
        }
        description="CH Real Estate & Builder's is a Wah Cantt agency and construction company. We help families and investors find the right property — and build the home they have in mind."
        crumbs={[{ label: "About" }]}
        image="/images/hero.svg"
      />

      <section className="bg-ink py-24" aria-label="Our story">
        <div className="container grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHeading
            align="left"
            className="mb-0 md:mb-0"
            eyebrow="Who we are"
            title={
              <>
                Property and construction, <Gold>under one roof</Gold>
              </>
            }
          />
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Buying a plot is only the beginning — most people then face the harder task of finding a designer, getting
              approval, hiring a contractor and keeping all of them on schedule. We started CH to remove that friction.
            </p>
            <p>
              Because our agency and construction teams work together, the person who helps you choose a plot is
              already thinking about what can be built on it, and the team that builds knows exactly what you were
              promised. One company, one conversation, one standard.
            </p>
            <p>
              We work with honesty about price and timelines, and we would rather tell you something is not worth buying
              than sell you a problem.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-gold/15 bg-surface py-24" aria-label="What we do">
        <div className="container grid gap-6 md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="h-full border border-gold/20 bg-ink p-10">
                <p.icon className="mb-7 size-10 text-gold" strokeWidth={1.3} />
                <h2 className="text-3xl text-cream">{p.title}</h2>
                <p className="mt-4 text-[1.05rem] text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <WhyChoose />

      <section className="border-t border-gold/15 bg-surface py-24" aria-labelledby="areas-title">
        <div className="container">
          <SectionHeading
            id="areas-title"
            eyebrow="Where we work"
            title={
              <>
                Areas we <Gold>serve</Gold>
              </>
            }
            description="We buy, sell, rent and build across Wah Cantt. Choose an area to see what is available."
          />
          <Reveal className="flex flex-wrap justify-center gap-3">
            {areas.map((a) => (
              <Link
                key={a}
                to={`/buy?area=${encodeURIComponent(a)}`}
                className="label border border-gold/30 px-6 py-3 text-[0.95rem] text-cream transition-colors hover:border-gold hover:bg-gold/10 hover:text-gold-light"
              >
                {a}
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
