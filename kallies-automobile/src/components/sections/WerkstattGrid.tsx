import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { services } from "@/data/content";

export function WerkstattGrid({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="section bg-white" aria-labelledby="werkstatt-title">
      <div className="container">
        {withHeading && (
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Werkstattservice"
              title={<span id="werkstatt-title">Rundum gut betreut</span>}
              lead="Von der Hauptuntersuchung bis zur Reparatur: Ihr Fahrzeug ist bei unseren Fachleuten in guten Händen."
            />
            <Button asChild variant="outline" className="self-start md:self-auto">
              <Link to="/werkstattservice">
                Alle Leistungen <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        )}
        <ul className={`${withHeading ? "mt-12" : ""} grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4`}>
          {services.map((s, i) => (
            <li key={s.title} className="bg-paper">
              <Reveal delay={i * 80} className="group h-full p-8 transition-colors duration-300 hover:bg-white">
                <span className="flex size-14 items-center justify-center rounded-lg bg-ink text-brand transition-transform duration-300 group-hover:-translate-y-1">
                  <s.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-grey">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
