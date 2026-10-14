import { Link } from "react-router-dom";
import { brands } from "@/data/site";

/** Text wordmarks only — each one filters the inventory by make. */
export function BrandStrip() {
  return (
    <section aria-label="Unsere Marken" className="border-y border-line bg-white">
      <div className="container py-10 md:py-12">
        <p className="eyebrow mb-6 text-center">Marken im Bestand</p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:flex lg:justify-between">
          {brands.map((b) => (
            <li key={b} className="text-center">
              <Link
                to={`/fahrzeuge?marke=${encodeURIComponent(b)}`}
                className="font-display text-lg font-bold uppercase tracking-[0.12em] text-grey transition-colors hover:text-ink md:text-xl"
              >
                {b}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
