import { useMemo, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useI18n } from "@/i18n";
import { activeCount, bounds, defaultFilters, facet, featureCounts, modelsFor, allMakes, allFuels, type Filters } from "@/lib/inventory";
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
const COLLAPSED = 6;

/** Long lists show the first few entries (plus anything selected) and expand in place — no nested scrollbars. */
function CheckList({ options, selected, onToggle, name, label }: { options: [string, number][]; selected: string[]; onToggle: (v: string) => void; name: string; label?: (v: string) => string }) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const visible = expanded || options.length <= COLLAPSED + 1 ? options : options.filter(([v], i) => i < COLLAPSED || selected.includes(v));
  const hidden = options.length - visible.length;

  return (
    <div>
      <ul className="space-y-1" aria-label={name}>
        {visible.map(([value, count]) => {
          const id = `${name}-${value}`.replace(/\W+/g, "-");
          const disabled = count === 0 && !selected.includes(value);
          return (
            <li key={value} className={cn("flex items-center gap-3 py-1.5", disabled && "opacity-60")}>
              <Checkbox id={id} checked={selected.includes(value)} onCheckedChange={() => onToggle(value)} disabled={disabled} />
              <label htmlFor={id} className="flex flex-1 cursor-pointer items-center justify-between gap-2 text-sm">
                <span translate={label ? undefined : "no"}>{label ? label(value) : value}</span>
                <span className="text-xs tabular-nums text-grey">{count}</span>
              </label>
            </li>
          );
        })}
      </ul>
      {(hidden > 0 || (expanded && options.length > COLLAPSED + 1)) && (
        <Button variant="link" size="sm" className="mt-2 text-sm" onClick={() => setExpanded((e) => !e)} aria-expanded={expanded}>
          {expanded ? t.inventory.fewerItems : `${t.inventory.moreItems} (${hidden || options.length - COLLAPSED})`}
        </Button>
      )}
    </div>
  );
}

function RangeValue({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-sm font-medium">{children}</p>;
}

export function VehicleFilters({ filters: f, onChange, className }: Props) {
  const { t, fmt } = useI18n();
  const g = t.inventory.groups;
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

  const trigger = "py-4 text-base";
  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between pr-12 lg:pr-0">
        <h2 className="font-display text-xl font-bold">{t.inventory.filter}</h2>
        <Button variant="link" size="sm" onClick={() => onChange(defaultFilters())} disabled={count === 0} className="gap-1.5 text-sm disabled:opacity-60">
          <RotateCcw aria-hidden /> {t.inventory.reset}
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["preis", "hersteller", "kraftstoff"]} className="border-t border-line">
        <AccordionItem value="preis">
          <AccordionTrigger className={trigger}>{g.price}</AccordionTrigger>
          <AccordionContent>
            <RangeValue>{fmt.price(f.price[0])} – {fmt.price(f.price[1])}</RangeValue>
            <Slider min={bounds.price[0]} max={bounds.price[1]} step={500} minStepsBetweenThumbs={1} value={f.price} onValueChange={(v) => set("price", [v[0], v[1]])} aria-label={t.inventory.sr.price} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hersteller">
          <AccordionTrigger className={trigger}>{g.make}</AccordionTrigger>
          <AccordionContent>
            <CheckList name={g.make} options={makeFacet} selected={f.makes} onToggle={(v) => onChange({ ...f, makes: toggle(f.makes, v), models: [] })} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="modell">
          <AccordionTrigger className={trigger}>{g.model}</AccordionTrigger>
          <AccordionContent>
            <CheckList name={g.model} options={modelFacet} selected={f.models} onToggle={(v) => set("models", toggle(f.models, v))} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="kraftstoff">
          <AccordionTrigger className={trigger}>{g.fuel}</AccordionTrigger>
          <AccordionContent>
            <CheckList name={g.fuel} options={fuelFacet} selected={f.fuels} label={(v) => t.vehicle.fuels[v] ?? v} onToggle={(v) => set("fuels", toggle(f.fuels, v))} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="getriebe">
          <AccordionTrigger className={trigger}>{g.gearbox}</AccordionTrigger>
          <AccordionContent>
            <CheckList name={g.gearbox} options={gearFacet} selected={f.gearboxes} label={(v) => t.vehicle.gearboxes[v] ?? v} onToggle={(v) => set("gearboxes", toggle(f.gearboxes, v))} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="erstzulassung">
          <AccordionTrigger className={trigger}>{g.year}</AccordionTrigger>
          <AccordionContent>
            <RangeValue>{f.year[0]} – {f.year[1] === bounds.year[1] ? t.inventory.newest : f.year[1]}</RangeValue>
            <Slider min={bounds.year[0]} max={bounds.year[1]} step={1} value={f.year} onValueChange={(v) => set("year", [v[0], v[1]])} aria-label={t.inventory.sr.year} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="kilometer">
          <AccordionTrigger className={trigger}>{g.km}</AccordionTrigger>
          <AccordionContent>
            <RangeValue>{t.inventory.upTo(fmt.km(f.kmMax))}</RangeValue>
            <Slider min={bounds.km[0]} max={bounds.km[1]} step={5000} value={[f.kmMax]} onValueChange={(v) => set("kmMax", v[0])} aria-label={t.inventory.sr.km} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="leistung">
          <AccordionTrigger className={trigger}>{g.power}</AccordionTrigger>
          <AccordionContent>
            <RangeValue>{t.inventory.from(fmt.power(f.psMin))}</RangeValue>
            <Slider min={bounds.ps[0]} max={bounds.ps[1]} step={10} value={[f.psMin]} onValueChange={(v) => set("psMin", v[0])} aria-label={t.inventory.sr.power} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ausstattung">
          <AccordionTrigger className={trigger}>{g.features}</AccordionTrigger>
          <AccordionContent>
            <CheckList name={g.features} options={featureFacet} selected={f.features} label={(v) => t.vehicle.features[v] ?? v} onToggle={(v) => set("features", toggle(f.features, v))} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="farbe">
          <AccordionTrigger className={trigger}>{g.color}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2" role="group" aria-label={g.color}>
              {colorFacet.map(([color, n]) => {
                const on = f.colors.includes(color);
                return (
                  <button
                    key={color}
                    type="button"
                    aria-pressed={on}
                    onClick={() => set("colors", toggle(f.colors, color))}
                    disabled={n === 0 && !on}
                    className={cn("inline-flex h-10 items-center gap-2 rounded-lg border bg-white px-3 text-sm transition-colors disabled:opacity-60", on ? "border-ink bg-ink text-paper" : "border-line hover:border-ink")}
                  >
                    <span className="size-4 rounded-full border border-grey/40" style={{ background: SWATCH[color] ?? "#c3c6ca" }} aria-hidden />
                    {t.vehicle.colors[color] ?? color}
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
