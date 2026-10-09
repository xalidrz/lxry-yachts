import { Activity, CarFront, Disc3, Droplets, Gauge, MoveVertical, Wrench, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";

type Service = {
  title: string;
  blurb: string;
  icon: LucideIcon;
  /** false = not yet confirmed by the owner (shown with a "Call to confirm" tag) */
  confirmed: boolean;
};

const services: Service[] = [
  { title: "Rideshare / Uber Vehicle Inspections", blurb: "Inspection for rideshare drivers who need their vehicle checked.", icon: CarFront, confirmed: true },
  { title: "Oil Change", blurb: "Straightforward oil and oil-filter service.", icon: Droplets, confirmed: true },
  { title: "Engine Diagnostics & Misfire Repair", blurb: "Find the cause of a misfire or rough running, then fix it.", icon: Activity, confirmed: true },
  { title: "Auto Electrical & Wiring", blurb: "Wiring faults, harness repairs and electrical troubleshooting.", icon: Zap, confirmed: true },
  { title: "Brakes", blurb: "Brake inspection and repair.", icon: Disc3, confirmed: false },
  { title: "Suspension", blurb: "Suspension checks and repairs.", icon: MoveVertical, confirmed: false },
  { title: "Check Engine Light", blurb: "Warning light on? We read the codes and trace the problem.", icon: Gauge, confirmed: false },
  { title: "General Maintenance", blurb: "Routine upkeep to keep your car on the road.", icon: Wrench, confirmed: false },
];

export function Services() {
  return (
    <section id="services" className="bg-carbon scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="What we work on"
            intro="Mechanical and electrical work, handled by the owner. Call for a quote on your car."
          />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal as="li" index={i % 4} key={s.title} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-white/20">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100" />
                <s.icon className="size-9 text-signal" strokeWidth={1.75} aria-hidden />
                <h3 className="mt-5 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{s.blurb}</p>
                {s.confirmed ? null : (
                  <span className="mt-5 inline-flex w-fit rounded-full border border-white/15 bg-steel px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-ink/80">
                    Call to confirm
                  </span>
                )}
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
