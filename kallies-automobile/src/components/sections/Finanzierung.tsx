import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const points = [
  "Persönliche Beratung direkt im Autohaus",
  "Finanzierung gemeinsam mit unserem Partner Santander",
  "Ihr bisheriges Fahrzeug können Sie in Zahlung geben",
];

export function Finanzierung() {
  return (
    <section className="section bg-white" aria-labelledby="finanzierung-title">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="overflow-hidden rounded-lg border border-line">
          <img
            src="/images/standort.webp"
            alt="Autohaus Kallies Automobile in Zeitz mit Fahnen von Nissan und Santander und mehreren Fahrzeugen auf dem Hof"
            width={700}
            height={368}
            loading="lazy"
            className="aspect-[4/3] size-full object-cover"
          />
        </Reveal>
        <Reveal delay={120}>
          <SectionHeading
            eyebrow="Finanzierung"
            title={<span id="finanzierung-title">Ihr Wunschauto, passend finanziert.</span>}
            lead="Wir finden die Finanzierung, die zu Ihrem Budget passt – verständlich erklärt und ohne Umwege."
          />
          <ul className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-brand-ink" strokeWidth={2.5} aria-hidden />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 inline-flex items-center gap-3 border border-line px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-grey">Finanzierungspartner</span>
            <span className="font-display text-lg font-bold tracking-tight">Santander</span>
          </div>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link to="/kontakt?betreff=Finanzierung">Finanzierung anfragen</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-grey">Finanzierung vorbehaltlich Bonitätsprüfung. Konditionen auf Anfrage.</p>
        </Reveal>
      </div>
    </section>
  );
}
