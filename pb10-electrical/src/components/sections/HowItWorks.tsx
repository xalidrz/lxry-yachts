import { ClipboardCheck, MessageCircle, ShieldCheck, Wrench } from "lucide-react";
import { m } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Accent, SectionHeading } from "@/components/SectionHeading";

const steps = [
  { icon: MessageCircle, title: "Call or Message", text: "Tell us what you need — a repair, an upgrade, or the date of your celebration." },
  { icon: ClipboardCheck, title: "Free Site Visit & Quote", text: "We come to see the space, talk through options and give you a clear, fair price." },
  { icon: Wrench, title: "Installation / Setup", text: "Our team does the work carefully and on schedule, at the time we agreed." },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative overflow-hidden bg-surface py-24 md:py-32">
      <div aria-hidden className="bg-circuit absolute inset-0 opacity-70" />
      <div className="container relative">
        <SectionHeading
          eyebrow="How it works"
          title={
            <span id="how-title">
              From first call to <Accent>finished job</Accent>
            </span>
          }
          intro="Four simple steps, the same for a panel upgrade and a wedding night."
        />

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* the "energised" line: fills in as the section scrolls into view */}
          <span aria-hidden className="absolute left-7 top-7 hidden h-[calc(100%-3.5rem)] w-px bg-white/10 max-lg:block lg:hidden" />
          <m.span aria-hidden className="absolute left-7 top-7 hidden h-[calc(100%-3.5rem)] w-px origin-top bg-gradient-to-b from-volt to-brandred shadow-[0_0_12px_rgba(247,147,30,0.9)] max-lg:block lg:hidden" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-20% 0px" }} transition={{ duration: 1.8, ease: "easeInOut" }} />
          <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-white/10 lg:block" />
          <m.span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px origin-left bg-gradient-to-r from-volt via-volt-light to-brandred shadow-[0_0_12px_rgba(247,147,30,0.9)] lg:block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-20% 0px" }} transition={{ duration: 1.8, ease: "easeInOut" }} />

          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.15} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
                <Node n={i + 1}>
                  <Icon className="size-6" strokeWidth={1.8} />
                </Node>
                <div>
                  <h3 className="text-[1.3rem]">{title}</h3>
                  <p className="mt-2.5 text-[0.97rem] text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}

          <li>
            <Reveal delay={0.45} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
              <Node n={4}>
                <ShieldCheck className="size-6" strokeWidth={1.8} />
              </Node>
              <div>
                <h3 className="text-[1.3rem]">All Wrapped Up</h3>
                <dl className="mt-3 space-y-3 text-[0.97rem]">
                  <div>
                    <dt className="label inline-block rounded bg-brandred px-2 py-0.5 text-[0.72rem] leading-tight">Events</dt>
                    <dd className="mt-1 text-muted-foreground">Takedown &amp; cleanup — we remove everything and leave the space tidy.</dd>
                  </div>
                  <div>
                    <dt className="label inline-block rounded bg-brandred px-2 py-0.5 text-[0.72rem] leading-tight">Electrical</dt>
                    <dd className="mt-1 text-muted-foreground">Final inspection — we test the work and walk you through it.</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </li>
        </ol>
      </div>
    </section>
  );
}

function Node({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="relative z-10 shrink-0">
      <span className="grid size-14 place-items-center rounded-full border border-volt/70 bg-ink text-volt-light shadow-[0_0_24px_-2px_rgba(247,147,30,0.55)]">{children}</span>
      <span className="label absolute -right-1.5 -top-1.5 grid size-6 place-items-center rounded-full bg-volt-gradient text-[0.8rem] font-semibold text-ink">{n}</span>
    </div>
  );
}
