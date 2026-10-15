import { useEffect, useState } from "react";
import { LoaderCircle, MapPin, Pencil, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CATEGORIES, CUSTOM_CATEGORY_ID, resolveCategory } from "@/lib/categories";
import { isCached, msUntilNextSearch, type SearchParams } from "@/lib/search";

export interface SearchForm {
  city: string;
  categoryId: string;
  customText: string;
  radiusKm: number;
}

const FORM_KEY = "nosite-finder:form:v1";
export const DEFAULT_FORM: SearchForm = { city: "", categoryId: "restaurant", customText: "", radiusKm: 5 };

export function loadForm(): SearchForm {
  try {
    const f = { ...DEFAULT_FORM, ...JSON.parse(localStorage.getItem(FORM_KEY) ?? "{}") } as SearchForm;
    f.radiusKm = Math.min(90, Math.max(1, Number(f.radiusKm) || 5));
    return f;
  } catch {
    return DEFAULT_FORM;
  }
}

export function toParams(f: SearchForm): SearchParams | null {
  const cat = resolveCategory(f.categoryId, f.customText);
  if (f.city.trim().length < 2 || !cat) return null;
  return { city: f.city.trim(), radiusKm: f.radiusKm, categoryLabel: cat.label, filters: cat.filters };
}

/** Seconds left on the polite-use cooldown; re-renders while it counts down. */
function useCooldown(active: boolean): number {
  const [ms, setMs] = useState(() => msUntilNextSearch());
  useEffect(() => {
    setMs(msUntilNextSearch());
    if (!active) return;
    const t = setInterval(() => setMs(msUntilNextSearch()), 250);
    return () => clearInterval(t);
  }, [active]);
  return Math.ceil(ms / 1000);
}

interface Props {
  form: SearchForm;
  onFormChange: (f: SearchForm) => void;
  onSearch: (p: SearchParams) => void;
  loading: boolean;
  /** Start collapsed (after a search has been made). */
  hasSearched: boolean;
}

export function SearchBar({ form, onFormChange, onSearch, loading, hasSearched }: Props) {
  const [expanded, setExpanded] = useState(!hasSearched);
  const params = toParams(form);
  const cooldown = useCooldown(true);
  const waiting = cooldown > 0 && !(params && isCached(params));
  const set = (patch: Partial<SearchForm>) => {
    const next = { ...form, ...patch };
    onFormChange(next);
    try {
      localStorage.setItem(FORM_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  // Searches triggered elsewhere (e.g. "Try 25 km instead") keep the bar collapsed.
  useEffect(() => {
    if (loading) setExpanded(false);
  }, [loading]);

  const catLabel = form.categoryId === CUSTOM_CATEGORY_ID ? form.customText.trim() || "Custom" : (CATEGORIES.find((c) => c.id === form.categoryId)?.label ?? "");

  const disabled = !params || loading || waiting;
  const buttonLabel = loading ? "Searching..." : waiting ? `Wait ${cooldown}s` : "Search";

  return (
    <div className="sticky top-0 z-30 border-b border-border bg-background shadow-card">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6">
        {/* Compact summary (phones, after a search) */}
        {!expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex min-h-12 w-full items-center gap-3 rounded-md border border-input bg-card px-3 text-left md:hidden"
            aria-label="Edit search"
          >
            <Search className="size-[18px] shrink-0 text-primary" />
            <span className="min-w-0 flex-1 truncate text-base">
              <span className="font-semibold">{catLabel}</span>
              <span className="text-muted-foreground">
                {" "}
                · {form.city.trim()} · {form.radiusKm} km
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
              <Pencil className="size-4" /> Edit
            </span>
          </button>
        )}

        <form
          className={(expanded ? "grid" : "hidden md:grid") + " gap-3 md:grid-cols-[1.2fr_1fr_1fr_auto] md:items-start"}
          onSubmit={(e) => {
            e.preventDefault();
            if (params && !disabled) {
              onSearch(params);
              setExpanded(false);
            }
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="city">City / Area</Label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
              <Input
                id="city"
                value={form.city}
                onChange={(e) => set({ city: e.target.value })}
                placeholder="e.g. Lahore, Pakistan"
                autoComplete="off"
                enterKeyHint="search"
                aria-describedby="city-hint"
                className="pl-10"
              />
            </div>
            <p id="city-hint" className="text-sm text-muted-foreground">
              Use a city or town name.
            </p>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Select value={form.categoryId} onValueChange={(v) => set({ categoryId: v })}>
              <SelectTrigger id="category">
                <span className="flex min-w-0 items-center gap-2">
                  <Tag className="size-[18px] shrink-0 text-muted-foreground" />
                  <SelectValue />
                </span>
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.label}
                  </SelectItem>
                ))}
                <SelectItem value={CUSTOM_CATEGORY_ID}>Custom text...</SelectItem>
              </SelectContent>
            </Select>
            {form.categoryId === CUSTOM_CATEGORY_ID && (
              <Input
                aria-label="Custom category"
                value={form.customText}
                onChange={(e) => set({ customText: e.target.value })}
                placeholder="e.g. tailor, tuition, photographer"
                autoComplete="off"
                autoFocus
              />
            )}
          </div>

          <div className="grid gap-1.5">
            <div className="flex items-baseline justify-between">
              <Label htmlFor="radius">Radius</Label>
              <output htmlFor="radius" className="text-base font-semibold tabular-nums">
                {form.radiusKm} km
              </output>
            </div>
            <Slider id="radius" aria-label="Search radius in kilometres" min={1} max={90} step={1} value={[form.radiusKm]} onValueChange={([v]) => set({ radiusKm: v })} />
          </div>

          <Button type="submit" size="lg" disabled={disabled} className="w-full md:mt-[1.625rem] md:w-auto md:min-w-32">
            {loading ? <LoaderCircle className="animate-spin" /> : <Search />}
            {buttonLabel}
          </Button>
        </form>
      </div>
    </div>
  );
}
