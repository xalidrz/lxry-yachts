import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Gem, Handshake, MapPinned, PencilRuler, BrickWall } from "lucide-react";
import { Gold, SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

const steps = [
  { icon: MapPinned, title: "Site Visit", text: "We inspect your plot, measure it and listen to what you need — free of charge." },
  { icon: PencilRuler, title: "Design & Approval", text: "Plans, 3D elevations and a fixed estimate. We handle the map approval." },
  { icon: BrickWall, title: "Grey Structure", text: "Foundation to roof slab, supervised closely, with materials tested on site." },
  { icon: Gem, title: "Finishing", text: "Flooring, joinery, electrical, plumbing and paint — finished to a premium standard." },
  { icon: Handshake, title: "Handover", text: "Final walkthrough, snag fixes and keys in hand. Support continues after handover." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 65%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const [active, setActive] = useState(-1);

  useMotionValueEvent(progress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.floor(v * (steps.length - 1) + 0.04)));
  });

  return (
    <section id="process" aria-labelledby="process-title" className="scroll-mt-20 overflow-hidden bg-ink py-28">
      <div className="container">
        <SectionHeading
          id="process-title"
          eyebrow="How We Build"
          title={
            <>
              Five clear steps from <Gold>plot to keys</Gold>
            </>
          }
          description="A transparent process with a milestone you can see at every stage — no surprises, no hidden costs."
        />

        <div ref={ref} className="relative">
          {/* Desktop: horizontal line (centres of first & last columns) */}
          <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-gold/20 lg:block" aria-hidden>
            <motion.div className="h-full origin-left bg-gold-gradient shadow-[0_0_14px_rgba(232,200,120,0.8)]" style={{ scaleX: progress }} />
          </div>
          {/* Mobile: vertical line */}
          <div className="absolute bottom-8 left-8 top-8 w-px -translate-x-1/2 bg-gold/20 lg:hidden" aria-hidden>
            <motion.div className="h-full origin-top bg-gold-gradient shadow-[0_0_14px_rgba(232,200,120,0.8)]" style={{ scaleY: progress }} />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {steps.map((s, i) => {
              const on = i <= active;
              return (
                <li key={s.title} className="flex gap-6 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                  <div
                    className={cn(
                      "relative z-10 flex size-16 shrink-0 items-center justify-center border bg-ink transition-all duration-700",
                      on ? "border-gold bg-surface-2 text-gold-light shadow-[0_0_30px_-4px_rgba(201,160,74,0.6)]" : "border-gold/25 text-gold/50",
                    )}
                  >
                    <s.icon className="size-6" strokeWidth={1.5} />
                    <span
                      className={cn(
                        "label absolute -right-2.5 -top-2.5 flex size-6 items-center justify-center text-[0.72rem] transition-colors duration-700",
                        on ? "bg-gold-gradient text-ink" : "bg-surface-2 text-muted-foreground",
                      )}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div className="lg:mt-8">
                    <h3 className={cn("text-[1.45rem] transition-colors duration-700", on ? "text-cream" : "text-cream/50")}>{s.title}</h3>
                    <p className={cn("mt-3 text-[0.98rem] transition-colors duration-700 lg:px-2", on ? "text-muted-foreground" : "text-muted-foreground/50")}>
                      {s.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
