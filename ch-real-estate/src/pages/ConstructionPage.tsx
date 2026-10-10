import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Gold, SectionHeading } from "@/components/SectionHeading";
import { PageHeader } from "@/components/PageHeader";
import { Process } from "@/components/sections/Process";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { services } from "@/data/services";
import { contactLink } from "@/lib/site";
import { usePageMeta } from "@/lib/seo";

const faqs = [
  {
    q: "Can you build on a plot I already own?",
    a: "Yes. Most of our construction clients already own a plot. We visit the site, review the plot and your requirements, and then prepare a design and a written scope before any work begins.",
  },
  {
    q: "Do you handle map approval?",
    a: "Yes. We prepare the architectural and structural documentation and support the approval process with the relevant authority, so you do not have to chase it yourself.",
  },
  {
    q: "How long does construction take?",
    a: "It depends on the size and design of the house and on the scope — grey structure only, or complete turnkey. After the site visit we give you a written schedule with milestones, and we keep you updated against it.",
  },
  {
    q: "Can I choose my own materials and finishes?",
    a: "Absolutely. We recommend materials and brands at different budgets and show you options for flooring, joinery, fixtures and paint. The choices that go into your home are agreed with you in writing.",
  },
  {
    q: "How does payment work?",
    a: "Payments are tied to completed milestones rather than paid all upfront. The schedule is written into your agreement so both sides know exactly what is due and when.",
  },
  {
    q: "Can you renovate while we are still living in the house?",
    a: "In many cases, yes — we phase the work room by room to limit disruption. For larger structural changes we will advise honestly if it makes more sense to move out for a short period.",
  },
];

export default function ConstructionPage() {
  usePageMeta("/construction");
  return (
    <>
      <PageHeader
        eyebrow="Construction Services"
        title={
          <>
            Built with precision. <Gold>Delivered with pride.</Gold>
          </>
        }
        description="From a bare plot to a finished home. Grey structure, complete turnkey builds, renovation and design — handled by one in-house team."
        crumbs={[{ label: "Construction" }]}
        image="/images/proj-residency.svg"
      >
        <Button asChild size="lg">
          <Link to={contactLink({ interest: "Construction", message: "I'd like to book a free site visit and quote." })}>
            Book a free site visit <ArrowRight />
          </Link>
        </Button>
      </PageHeader>

      <section className="bg-ink py-24" aria-label="Our services">
        <div className="container space-y-8">
          {services.map((s, i) => (
            <Reveal key={s.id}>
              <article
                id={s.id}
                className="scroll-mt-28 grid gap-10 border border-gold/20 bg-surface p-8 sm:p-12 lg:grid-cols-[auto_1fr_1fr] lg:items-start lg:gap-14"
              >
                <div className="flex items-center gap-5 lg:flex-col lg:items-start">
                  <div className="flex size-20 items-center justify-center border border-gold/40 text-gold">
                    <s.icon className="size-9" strokeWidth={1.4} />
                  </div>
                  <span className="font-heading text-5xl text-gold/25" aria-hidden>
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] text-cream">{s.title}</h2>
                  <p className="mt-5 text-[1.05rem] leading-relaxed text-muted-foreground">{s.detail}</p>
                  <p className="mt-5 border-l-2 border-gold/50 pl-4 text-[0.98rem] text-cream/85">
                    <span className="label mr-2 text-[0.8rem] text-gold">Ideal for</span>
                    {s.idealFor}
                  </p>
                </div>
                <div>
                  <p className="label mb-5 text-[0.85rem] text-gold">What's included</p>
                  <ul className="space-y-3.5">
                    {[...s.points].map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-[1.02rem] text-cream/90">
                        <Check className="mt-1 size-4 shrink-0 text-gold" /> {pt}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="mt-8">
                    <Link to={contactLink({ interest: "Construction", message: `I'd like a quote for: ${s.title}.` })}>
                      Request a quote <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="border-y border-gold/15">
        <Process />
      </div>

      <section className="bg-surface py-24" aria-labelledby="faq-title">
        <div className="container grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            id="faq-title"
            align="left"
            className="mb-0 md:mb-0"
            eyebrow="Questions"
            title={
              <>
                Good to <Gold>know</Gold>
              </>
            }
            description="The questions we hear most before a project starts. Anything else — just ask."
          />
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="border-t border-gold/20">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`q${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Planning to build? <Gold>Start with a site visit.</Gold>
          </>
        }
        text="We visit your plot, listen to what you need and follow up with a design direction and a clear estimate — at no cost."
        interest="Construction"
        message="I'd like to book a free site visit and quote."
      />
    </>
  );
}
