import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/i18n";
import { ALL, allFuels, allMakes, modelsFor } from "@/lib/inventory";

const ANY = "alle";
const PRICES = [5000, 10000, 15000, 20000, 30000, 50000];

function Labeled({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.14em] text-grey">
        {label}
      </Label>
      {children}
    </div>
  );
}

/** Hero search: Marke, Modell, Preis, Kraftstoff → /fahrzeuge with the matching query. */
export function QuickSearch() {
  const { t, fmt } = useI18n();
  const navigate = useNavigate();
  const [make, setMake] = useState(ANY);
  const [model, setModel] = useState(ANY);
  const [price, setPrice] = useState(ANY);
  const [fuel, setFuel] = useState(ANY);

  const models = useMemo(() => modelsFor(make === ANY ? [] : [make]), [make]);
  const hits = useMemo(
    () =>
      ALL.filter(
        (v) =>
          (make === ANY || v.make === make) && (model === ANY || v.model === model) && (price === ANY || v.price <= Number(price)) && (fuel === ANY || v.fuel === fuel),
      ).length,
    [make, model, price, fuel],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (make !== ANY) p.set("marke", make);
    if (model !== ANY) p.set("modell", model);
    if (price !== ANY) p.set("preisBis", price);
    if (fuel !== ANY) p.set("kraftstoff", fuel);
    navigate({ pathname: "/fahrzeuge", search: p.toString() });
  };

  return (
    <form onSubmit={submit} aria-label={t.search.aria} className="rounded-lg bg-white p-5 text-ink shadow-lift md:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto] lg:items-end">
        <Labeled label={t.search.make} id="qs-make">
          <Select value={make} onValueChange={(v) => { setMake(v); setModel(ANY); }}>
            <SelectTrigger id="qs-make"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ANY}>{t.search.allMakes}</SelectItem>
              {allMakes().map((m) => <SelectItem key={m} value={m} translate="no">{m}</SelectItem>)}
            </SelectContent>
          </Select>
        </Labeled>
        <Labeled label={t.search.model} id="qs-model">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger id="qs-model"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ANY}>{t.search.allModels}</SelectItem>
              {models.map((m) => <SelectItem key={m} value={m} translate="no">{m}</SelectItem>)}
            </SelectContent>
          </Select>
        </Labeled>
        <Labeled label={t.search.price} id="qs-price">
          <Select value={price} onValueChange={setPrice}>
            <SelectTrigger id="qs-price"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ANY}>{t.search.anyPrice}</SelectItem>
              {PRICES.map((p) => <SelectItem key={p} value={String(p)}>{t.search.upTo(fmt.price(p))}</SelectItem>)}
            </SelectContent>
          </Select>
        </Labeled>
        <Labeled label={t.search.fuel} id="qs-fuel">
          <Select value={fuel} onValueChange={setFuel}>
            <SelectTrigger id="qs-fuel"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ANY}>{t.search.allFuels}</SelectItem>
              {allFuels().map((f) => <SelectItem key={f} value={f}>{t.vehicle.fuels[f] ?? f}</SelectItem>)}
            </SelectContent>
          </Select>
        </Labeled>
        <Button type="submit" variant="brand" size="lg" className="sm:col-span-2 lg:col-span-1">
          <Search aria-hidden />
          {t.search.show(hits)}
        </Button>
      </div>
    </form>
  );
}
