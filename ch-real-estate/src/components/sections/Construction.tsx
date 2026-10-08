import { ArrowRight, BrickWall, House, PencilRuler, Hammer } from "lucide-react";
import { Gold, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

const services = [
  {
    icon: BrickWall,
    title: "Grey Structure",
    text: "Foundation, columns, slabs and brickwork built to engineered drawings, with tested materials and site supervision at every pour.",
    points: ["Excavation & foundation", "RCC columns, beams & slabs", "Brickwork & plaster"],
  },
  {
    icon: House,
    title: "Turnkey Construction",
    text: "Complete, end-to-end construction. We take your plot to a finished home — you receive the keys, not a to-do list.",
    points: ["Structure + full finishing", "Electrical, plumbing & fixtures", "Fixed-scope agreement"],
  },
  {
    icon: Hammer,
    title: "Renovation & Remodeling",
    text: "Give an existing house, shop or office a fresh layout and a premium finish without rebuilding from scratch.",
    points: ["Layout changes & extensions", "Kitchens, baths & facades", "Flooring, ceilings & lighting"],
  },
  {
    icon: PencilRuler,
    title: "Architectural Design & Map Approval",
    text: "Considered plans, 3D visuals and complete documentation, with approval handled through the relevant authority.",
    points: ["Architectural & structural design", "3D elevations", "Map approval support"],
  },
];

export function Construction({ onQuote }: { onQuote: (service: string) => void }) {
  return (
    <section id="construction" aria-labelledby="construction-title" className="scroll-mt-20 border-y border-gold/15 bg-surface py-28">
      <div className="container">
        <SectionHeading
          id="construction-title"
          eyebrow="Construction Services"
          title={
            <>
              Built with precision. <Gold>Delivered with pride.</Gold>
            </>
          }
          description="Whether you own a plot or an old house, our in-house team designs, builds and finishes to the standard your family deserves."
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden border border-gold/20 bg-ink p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/70 hover:shadow-gold-glow">
                <span className="font-heading absolute right-6 top-5 text-5xl text-gold/10 transition-colors duration-500 group-hover:text-gold/25" aria-hidden>
                  0{i + 1}
                </span>
                <div className="mb-8 flex size-16 items-center justify-center border border-gold/40 text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold-gradient group-hover:text-ink">
                  <s.icon className="size-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-[1.5rem] leading-snug text-cream">{s.title}</h3>
                <p className="mt-4 text-[1rem] text-muted-foreground">{s.text}</p>
                <ul className="mt-6 space-y-2.5 border-t border-gold/15 pt-6 text-[0.95rem] text-cream/85">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3">
                      <span className="mt-[0.7em] h-px w-4 shrink-0 bg-gold" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  onClick={() => onQuote(s.title)}
                  className="label mt-auto inline-flex items-center gap-2 pt-8 text-[0.9rem] text-gold transition-colors hover:text-gold-light"
                >
                  Request a quote <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
