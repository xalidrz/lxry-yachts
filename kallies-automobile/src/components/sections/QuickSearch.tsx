import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ALL, allFuels, allMakes, modelsFor } from "@/lib/inventory";
import { formatNumber } from "@/lib/format";

const ANY = "alle";
const PRICES = [5000, 10000, 15000, 20000, 30000, 50000];

function Labeled({ label, children }: { label: string; children: (id: string) => React.ReactNode }) {
  const id = `qs-${label.toLowerCase()}`;
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.14em] text-grey">
        {label}
      </Label>
      {children(id)}
    </div>
  );
}

/** Hero search: Marke, Modell, Preis, Kraftstoff → /fahrzeuge with the matching query. */
export function QuickSearch() {
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
    <form onSubmit={submit} aria-label="Fahrzeugsuche" className="rounded-lg bg-white p-5 text-ink shadow-lift md:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto] lg:items-end">
        <Labeled label="Marke">
          {(id) => (
            <Select value={make} onValueChange={(v) => { setMake(v); setModel(ANY); }}>
              <SelectTrigger id={id}><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>Alle Marken</SelectItem>
                {allMakes().map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        </Labeled>
        <Labeled label="Modell">
          {(id) => (
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger id={id}><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>Alle Modelle</SelectItem>
                {models.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        </Labeled>
        <Labeled label="Preis">
          {(id) => (
            <Select value={price} onValueChange={setPrice}>
              <SelectTrigger id={id}><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>Beliebig</SelectItem>
                {PRICES.map((p) => <SelectItem key={p} value={String(p)}>bis {formatNumber(p)} €</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        </Labeled>
        <Labeled label="Kraftstoff">
          {(id) => (
            <Select value={fuel} onValueChange={setFuel}>
              <SelectTrigger id={id}><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>Alle Kraftstoffe</SelectItem>
                {allFuels().map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        </Labeled>
        <Button type="submit" variant="brand" size="lg" className="sm:col-span-2 lg:col-span-1">
          <Search aria-hidden />
          {hits} {hits === 1 ? "Fahrzeug" : "Fahrzeuge"} anzeigen
        </Button>
      </div>
    </form>
  );
}
