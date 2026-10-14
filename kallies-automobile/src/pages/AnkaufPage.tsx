import { AnkaufPanel } from "@/components/sections/AnkaufPanel";
import { Faq } from "@/components/sections/Faq";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { BadgeEuro, FileCheck2, Gauge } from "lucide-react";

const perks = [
  { icon: Gauge, title: "Schnelle & professionelle Preisschätzung", text: "Ein transparenter, fairer Preis dank Experteneinschätzung." },
  { icon: BadgeEuro, title: "Top-Preise", text: "Dank großem Netzwerk und jahrelanger Erfahrung im Autohandel." },
  { icon: FileCheck2, title: "Reibungslose Abmeldung", text: "Nach dem Verkauf übernehmen wir die Abmeldung und sämtliche Formalitäten." },
];

export default function AnkaufPage() {
  usePageMeta("Auto verkaufen – Gebrauchtwagen-Ankauf | Kallies Automobile Zeitz", "Verkaufen Sie Ihr Auto sicher, einfach und schnell: kostenlose Online-Bewertung, faire Preise, Abmeldung inklusive.");
  return (
    <>
      <PageHeader eyebrow="Gebrauchtwagen-Ankauf" title="Verkaufen Sie Ihr Auto sicher, einfach, schnell." lead="Einfach und stressfrei ein Angebot für Ihren Gebrauchtwagen erhalten – für fast alle Marken und Modelle, unabhängig vom Zustand." />
      <AnkaufPanel />
      <section className="section bg-white">
        <div className="container">
          <h2 className="display-2 max-w-2xl">Deshalb sollten Sie an uns verkaufen</h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {perks.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 90} className="h-full border-t border-ink pt-8">
                  <p.icon className="size-8 text-brand-ink" strokeWidth={1.5} aria-hidden />
                  <h3 className="mt-6 font-display text-xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-grey">{p.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Faq />
    </>
  );
}
