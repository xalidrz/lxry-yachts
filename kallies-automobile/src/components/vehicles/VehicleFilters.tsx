import { useMemo } from "react";
import { Check, RotateCcw } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { activeCount, bounds, defaultFilters, facet, featureCounts, modelsFor, allMakes, allFuels, type Filters } from "@/lib/inventory";
import { formatKm, formatNumber, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Props {
  filters: Filters;
  onChange: (next: Filters) => void;
  className?: string;
}

const SWATCH: Record<string, string> = {
  Schwarz: "#14161a", Weiß: "#ffffff", Grau: "#8a8f96", Silber: "#c3c6ca", Blau: "#1f4b8f", Rot: "#b02020",
  Grün: "#3a6b4a", Braun: "#6b4a35", Beige: "#d8c9ad", Orange: "#e0701a",
};

const toggle = (list: string[], value: string) => (list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

function CheckList({ options, selected, onToggle, name }: { options: [string, number][]; selected: string[]; onToggle: (v: string) => void; name: string }) {
  return (
    <ul className="max-h-60 space-y-1 overflow-y-auto pr-1" aria-label={name}>
      {options.map(([value, count]) => {
        const id = `${name}-${value}`.replace(/\W+/g, "-");
        const disabled = count === 0 && !selected.includes(value);
        return (
          <li key={value} className={cn("flex items-center gap-3 py-1.5", disabled && "opacity-45")}>
            <Checkbox id={id} checked={selected.includes(value)} onCheckedChange={() => onToggle(value)} disabled={disabled} />
            <label htmlFor={id} className="flex flex-1 cursor-pointer items-center justify-between gap-2 text-sm">
              <span>{value}</span>
              <span className="text-xs tabular-nums text-grey">{count}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function RangeValue({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-sm font-medium tabular-nums">{children}</p>;
}

export function VehicleFilters({ filters: f, onChange, className }: Props) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => onChange({ ...f, [key]: value });
  const count = activeCount(f);

  const makeFacet = useMemo(() => {
    const counts = new Map(facet((v) => v.make, f, "makes"));
    return allMakes().map((m): [string, number] => [m, counts.get(m) ?? 0]);
  }, [f]);
  const modelFacet = useMemo(() => {
    const counts = new Map(facet((v) => v.model, f, "models"));
    return modelsFor(f.makes).map((m): [string, number] => [m, counts.get(m) ?? 0]);
  }, [f]);
  const fuelFacet = useMemo(() => {
    const counts = new Map(facet((v) => v.fuel, f, "fuels"));
    return allFuels().map((m): [string, number] => [m, counts.get(m) ?? 0]);
  }, [f]);
  const gearFacet = useMemo(() => {
    const counts = new Map(facet((v) => v.gearbox, f, "gearboxes"));
    return (["Automatik", "Schaltgetriebe"] as const).map((m): [string, number] => [m, counts.get(m) ?? 0]);
  }, [f]);
  const featureFacet = useMemo(() => featureCounts(f), [f]);
  const colorFacet = useMemo(() => facet((v) => v.color, f, "colors"), [f]);

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between pr-12 lg:pr-0">
        <h2 className="font-display text-xl font-bold">Filter</h2>
        <Button variant="link" size="sm" onClick={() => onChange(defaultFilters())} disabled={count === 0} className="gap-1.5 text-sm disabled:opacity-40">
          <RotateCcw aria-hidden /> Zurücksetzen
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["preis", "hersteller", "kraftstoff"]} className="border-t border-line">
        <AccordionItem value="preis">
          <AccordionTrigger className="py-4 text-base">Preis</AccordionTrigger>
          <AccordionContent>
            <RangeValue>
              {formatPrice(f.price[0])} – {formatPrice(f.price[1])}
            </RangeValue>
            <Slider
              min={bounds.price[0]} max={bounds.price[1]} step={500} minStepsBetweenThumbs={1}
              value={f.price} onValueChange={(v) => set("price", [v[0], v[1]])}
              aria-label="Preisspanne"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hersteller">
          <AccordionTrigger className="py-4 text-base">Hersteller</AccordionTrigger>
          <AccordionContent>
            <CheckList name="Hersteller" options={makeFacet} selected={f.makes} onToggle={(v) => onChange({ ...f, makes: toggle(f.makes, v), models: [] })} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="modell">
          <AccordionTrigger className="py-4 text-base">Modell</AccordionTrigger>
          <AccordionContent>
            <CheckList name="Modell" options={modelFacet} selected={f.models} onToggle={(v) => set("models", toggle(f.models, v))} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="kraftstoff">
          <AccordionTrigger className="py-4 text-base">Kraftstoff</AccordionTrigger>
          <AccordionContent>
            <CheckList name="Kraftstoff" options={fuelFacet} selected={f.fuels} onToggle={(v) => set("fuels", toggle(f.fuels, v))} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="getriebe">
          <AccordionTrigger className="py-4 text-base">Getriebe</AccordionTrigger>
          <AccordionContent>
            <CheckList name="Getriebe" options={gearFacet} selected={f.gearboxes} onToggle={(v) => set("gearboxes", toggle(f.gearboxes, v))} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="erstzulassung">
          <AccordionTrigger className="py-4 text-base">Erstzulassung</AccordionTrigger>
          <AccordionContent>
            <RangeValue>
              {f.year[0]} – {f.year[1] === bounds.year[1] ? "Neu" : f.year[1]}
            </RangeValue>
            <Slider min={bounds.year[0]} max={bounds.year[1]} step={1} value={f.year} onValueChange={(v) => set("year", [v[0], v[1]])} aria-label="Erstzulassung von bis" />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="kilometer">
          <AccordionTrigger className="py-4 text-base">Kilometer</AccordionTrigger>
          <AccordionContent>
            <RangeValue>bis {formatKm(f.kmMax)}</RangeValue>
            <Slider min={bounds.km[0]} max={bounds.km[1]} step={5000} value={[f.kmMax]} onValueChange={(v) => set("kmMax", v[0])} aria-label="Maximaler Kilometerstand" />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="leistung">
          <AccordionTrigger className="py-4 text-base">Leistung</AccordionTrigger>
          <AccordionContent>
            <RangeValue>ab {formatNumber(f.psMin)} PS</RangeValue>
            <Slider min={bounds.ps[0]} max={bounds.ps[1]} step={10} value={[f.psMin]} onValueChange={(v) => set("psMin", v[0])} aria-label="Mindestleistung in PS" />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ausstattung">
          <AccordionTrigger className="py-4 text-base">Ausstattung</AccordionTrigger>
          <AccordionContent>
            <CheckList name="Ausstattung" options={featureFacet} selected={f.features} onToggle={(v) => set("features", toggle(f.features, v))} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="farbe">
          <AccordionTrigger className="py-4 text-base">Farbe</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Farbe">
              {colorFacet.map(([color, n]) => {
                const on = f.colors.includes(color);
                return (
                  <button
                    key={color}
                    type="button"
                    aria-pressed={on}
                    onClick={() => set("colors", toggle(f.colors, color))}
                    disabled={n === 0 && !on}
                    className={cn(
                      "inline-flex h-10 items-center gap-2 rounded-lg border bg-white px-3 text-sm transition-colors disabled:opacity-45",
                      on ? "border-ink bg-ink text-paper" : "border-line hover:border-ink",
                    )}
                  >
                    <span className="size-4 rounded-full border border-grey/40" style={{ background: SWATCH[color] ?? "#c3c6ca" }} aria-hidden />
                    {color}
                    {on && <Check className="size-3.5" aria-hidden />}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
