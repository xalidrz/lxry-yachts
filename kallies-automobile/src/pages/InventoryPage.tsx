import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Reveal } from "@/components/Reveal";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { VehicleFilters } from "@/components/vehicles/VehicleFilters";
import { InquiryDialog } from "@/components/vehicles/InquiryDialog";
import { usePageMeta } from "@/hooks/usePageMeta";
import type { Vehicle } from "@/data/vehicles";
import { ALL, activeCount, defaultFilters, filtersFromParams, matches, paramsFromFilters, pickFeatured, sortOptions, sortVehicles, type Filters, type SortKey } from "@/lib/inventory";

const PAGE_SIZE = 12;

interface Props {
  title?: string;
  eyebrow?: string;
  lead?: string;
  /** Pre-applied, e.g. Harley-Davidson */
  preset?: Partial<Filters>;
}

export default function InventoryPage({ title = "Fahrzeugbestand", eyebrow = "Gebrauchtwagen & Neufahrzeuge", lead = "Alle Fahrzeuge aus unserem Autohaus in Zeitz – gefiltert nach Ihren Wünschen.", preset }: Props) {
  usePageMeta(`${title} | Kallies Automobile Zeitz`, lead);
  const [params, setParams] = useSearchParams();
  const { filters, sort } = useMemo(() => filtersFromParams(params, preset), [params, preset]);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [inquiry, setInquiry] = useState<Vehicle | null>(null);

  const update = (next: Filters, nextSort: SortKey = sort) => {
    setParams(paramsFromFilters(next, nextSort, preset), { replace: true });
    setLimit(PAGE_SIZE);
  };

  const results = useMemo(() => sortVehicles(ALL.filter((v) => matches(v, filters)), sort), [filters, sort]);
  const shown = results.slice(0, limit);
  const count = activeCount(filters) - (preset?.makes?.length ?? 0);

  return (
    <>
      <section className="on-dark bg-ink text-white">
        <div className="container py-12 md:py-16">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-2 mt-4">{title}</h1>
          <p className="mt-4 max-w-xl text-white/75">{lead}</p>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
          <aside className="hidden lg:block" aria-label="Filter">
            <VehicleFilters filters={filters} onChange={update} className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4" />
          </aside>

          <section aria-label="Suchergebnisse">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
              <h2 className="font-sans text-base font-semibold" aria-live="polite">
                {results.length} {results.length === 1 ? "Fahrzeug" : "Fahrzeuge"} gefunden
              </h2>
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <SlidersHorizontal aria-hidden /> Filter{count > 0 && ` (${count})`}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="gap-0 overflow-y-auto p-6">
                    <SheetTitle className="sr-only">Filter</SheetTitle>
                    <SheetDescription className="sr-only">Fahrzeugbestand filtern</SheetDescription>
                    <VehicleFilters filters={filters} onChange={update} className="flex-1 pb-6" />
                    <div className="sticky bottom-0 -mx-6 -mb-6 shrink-0 border-t border-line bg-paper p-4">
                      <SheetClose asChild>
                        <Button variant="brand" size="lg" className="w-full">
                          {results.length} {results.length === 1 ? "Fahrzeug" : "Fahrzeuge"} anzeigen
                        </Button>
                      </SheetClose>
                    </div>
                  </SheetContent>
                </Sheet>

                <label className="sr-only" id="sort-label">Sortierung</label>
                <Select value={sort} onValueChange={(v) => update(filters, v as SortKey)}>
                  <SelectTrigger aria-labelledby="sort-label" className="h-10 w-[15rem] max-w-[60vw]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {sortOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {results.length > 0 ? (
              <>
                <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {shown.map((v, i) => (
                    <li key={v.id}>
                      <Reveal delay={(i % 3) * 80} className="h-full">
                        <VehicleCard vehicle={v} onInquire={setInquiry} priority={i < 3} />
                      </Reveal>
                    </li>
                  ))}
                </ul>
                {shown.length < results.length && (
                  <div className="mt-12 flex flex-col items-center gap-3">
                    <p className="text-sm text-grey">
                      {shown.length} von {results.length} Fahrzeugen
                    </p>
                    <Button variant="outline" size="lg" onClick={() => setLimit((l) => l + PAGE_SIZE)}>
                      Weitere Fahrzeuge anzeigen
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <NoMatches onReset={() => update({ ...filters, ...resetKeepingPreset(preset) })} onInquire={setInquiry} />
            )}
          </section>
        </div>
      </div>

      <InquiryDialog vehicle={inquiry} onClose={() => setInquiry(null)} />
    </>
  );
}

const resetKeepingPreset = (preset?: Partial<Filters>) => ({ ...defaultFilters(), ...preset });

/** Filters too narrow: say so kindly, offer a reset and the weekly highlights — never a dead end. */
function NoMatches({ onReset, onInquire }: { onReset: () => void; onInquire: (v: Vehicle) => void }) {
  return (
    <div>
      <div className="rounded-lg border border-line bg-white p-8 text-center md:p-12">
        <h3 className="font-display text-2xl font-bold">Dafür haben wir gerade kein passendes Fahrzeug.</h3>
        <p className="mx-auto mt-3 max-w-md text-grey">Lockern Sie einzelne Filter – oder sagen Sie uns, was Sie suchen. Wir halten für Sie Ausschau.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={onReset}>Filter zurücksetzen</Button>
          <Button asChild variant="outline">
            <Link to="/kontakt?betreff=Suchanfrage">Wunschfahrzeug anfragen</Link>
          </Button>
        </div>
      </div>
      <h3 className="mb-6 mt-12 font-display text-xl font-bold">Das könnte Ihnen gefallen</h3>
      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {pickFeatured(3).map((v) => (
          <li key={v.id}>
            <VehicleCard vehicle={v} onInquire={onInquire} />
          </li>
        ))}
      </ul>
    </div>
  );
}
