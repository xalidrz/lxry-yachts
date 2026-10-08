import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  areas,
  budgetBuild,
  budgetBuy,
  budgetRent,
  buildTypes,
  propertyTypes,
  sizeRanges,
  type Criteria,
  type Mode,
} from "@/lib/filters";
import type { Category } from "@/data/properties";

export interface BuildQuery {
  area?: string;
  service?: string;
  size?: string;
  budget?: string;
}

const ANY = "any";

function Field({
  label,
  value,
  onChange,
  placeholder,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  children: React.ReactNode;
}) {
  const id = `sb-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="min-w-0 space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} aria-label={label}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ANY}>{placeholder}</SelectItem>
          {children}
        </SelectContent>
      </Select>
    </div>
  );
}

export function SearchBar({ onSearch, onBuild }: { onSearch: (c: Criteria) => void; onBuild: (q: BuildQuery) => void }) {
  const [mode, setMode] = useState<Mode>("buy");
  const [area, setArea] = useState(ANY);
  const [type, setType] = useState(ANY);
  const [size, setSize] = useState(ANY);
  const [budget, setBudget] = useState(ANY);

  const changeMode = (m: string) => {
    setMode(m as Mode);
    setType(ANY);
    setBudget(ANY);
  };

  const budgets = mode === "buy" ? budgetBuy : mode === "rent" ? budgetRent : budgetBuild;
  const pick = (v: string) => (v === ANY ? undefined : v);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "build") {
      onBuild({
        area: pick(area),
        service: pick(type),
        size: sizeRanges.find((s) => s.value === size)?.label,
        budget: budgetBuild.find((b) => b.value === budget)?.label,
      });
    } else {
      onSearch({ mode, area: pick(area), type: pick(type) as Category | undefined, size: pick(size), budget: pick(budget) });
    }
  };

  return (
    <form
      onSubmit={submit}
      aria-label="Search properties"
      className="border border-gold/25 bg-surface/90 p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-7"
    >
      <Tabs value={mode} onValueChange={changeMode} className="mb-6 border-b border-gold/20">
        <TabsList aria-label="I want to">
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="rent">Rent</TabsTrigger>
          <TabsTrigger value="build">Build</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
        <Field label="Area" value={area} onChange={setArea} placeholder="Any area">
          {areas.map((a) => (
            <SelectItem key={a} value={a}>
              {a}
            </SelectItem>
          ))}
        </Field>

        <Field
          label={mode === "build" ? "Service" : "Property Type"}
          value={type}
          onChange={setType}
          placeholder={mode === "build" ? "Any service" : "Any type"}
        >
          {mode === "build"
            ? buildTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))
            : propertyTypes.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
        </Field>

        <Field label="Size (Marla / Kanal)" value={size} onChange={setSize} placeholder="Any size">
          {sizeRanges.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </Field>

        <Field label="Budget (PKR)" value={budget} onChange={setBudget} placeholder="Any budget">
          {budgets.map((b) => (
            <SelectItem key={b.value} value={b.value}>
              {b.label}
            </SelectItem>
          ))}
        </Field>

        <Button type="submit" size="lg" className="w-full sm:col-span-2 lg:col-span-1 lg:w-auto">
          <Search /> {mode === "build" ? "Get a Quote" : "Search"}
        </Button>
      </div>
    </form>
  );
}
