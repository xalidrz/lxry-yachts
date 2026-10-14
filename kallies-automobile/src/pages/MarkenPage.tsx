import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ALL, allMakes } from "@/lib/inventory";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function MarkenPage() {
  usePageMeta("Marken im Bestand | Kallies Automobile Zeitz", "Nissan, Renault, Dacia, Mercedes-Benz, Volkswagen, Kia, Ford, Opel und mehr – alle Marken im aktuellen Bestand.");
  const makes = allMakes().map((m) => [m, ALL.filter((v) => v.make === m).length] as const).sort((a, b) => b[1] - a[1]);
  return (
    <>
      <PageHeader eyebrow="Marken" title="Markenvielfalt zu Top-Konditionen." lead="Als freies Autohaus mit Fokus auf Nissan, Renault und Dacia bieten wir eine große Auswahl – bis hin zu Mercedes-Benz und Volkswagen." />
      <section className="section">
        <ul className="container grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {makes.map(([make, n], i) => (
            <li key={make} className="bg-white">
              <Reveal delay={(i % 3) * 70} className="h-full">
                <Link to={`/fahrzeuge?marke=${encodeURIComponent(make)}`} className="group flex h-full items-center justify-between p-8 transition-colors hover:bg-paper">
                  <span>
                    <span className="block font-display text-2xl font-bold uppercase tracking-[0.08em]">{make}</span>
                    <span className="mt-1 block text-sm text-grey">{n} {n === 1 ? "Fahrzeug" : "Fahrzeuge"} im Bestand</span>
                  </span>
                  <ArrowUpRight className="size-6 text-grey transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-ink" aria-hidden />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
