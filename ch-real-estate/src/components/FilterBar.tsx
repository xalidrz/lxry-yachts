import { X } from "lucide-react";
import { SelectItem } from "@/components/ui/select";
import { ANY, FilterField } from "@/components/FilterField";
import {
  areas,
  budgetBuy,
  budgetRent,
  propertyTypes,
  sizeRanges,
  sortOptions,
  type Criteria,
  type Sort,
} from "@/lib/filters";
import type { Category } from "@/data/properties";

type Patch = Partial<Omit<Criteria, "mode">>;

/** Filter row for the /buy and /rent pages. State lives in the URL (see Listings page). */
export function FilterBar({
  criteria,
  sort,
  total,
  shown,
  onChange,
  onSort,
  onClear,
}: {
  criteria: Criteria;
  sort: Sort;
  total: number;
  shown: number;
  onChange: (patch: Patch) => void;
  onSort: (s: Sort) => void;
  onClear: () => void;
}) {
  const budgets = criteria.mode === "buy" ? budgetBuy : budgetRent;
  const active = Boolean(criteria.area || criteria.type || criteria.size || criteria.budget);
  const val = (v?: string) => v ?? ANY;
  const pick = (v: string) => (v === ANY ? undefined : v);

  return (
    <div className="border border-gold/25 bg-surface p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <FilterField id="fb-area" label="Area" value={val(criteria.area)} onChange={(v) => onChange({ area: pick(v) })} placeholder="Any area">
          {areas.map((a) => (
            <SelectItem key={a} value={a}>
              {a}
            </SelectItem>
          ))}
        </FilterField>
        <FilterField id="fb-type" label="Property Type" value={val(criteria.type)} onChange={(v) => onChange({ type: pick(v) as Category | undefined })} placeholder="Any type">
          {propertyTypes.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </FilterField>
        <FilterField id="fb-size" label="Size (Marla / Kanal)" value={val(criteria.size)} onChange={(v) => onChange({ size: pick(v) })} placeholder="Any size">
          {sizeRanges.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </FilterField>
        <FilterField id="fb-budget" label="Budget (PKR)" value={val(criteria.budget)} onChange={(v) => onChange({ budget: pick(v) })} placeholder="Any budget">
          {budgets.map((b) => (
            <SelectItem key={b.value} value={b.value}>
              {b.label}
            </SelectItem>
          ))}
        </FilterField>
        <div className="min-w-0 space-y-2">
          <label htmlFor="fb-sort" className="label text-[0.8rem] text-muted-foreground">
            Sort by
          </label>
          <select
            id="fb-sort"
            value={sort}
            onChange={(e) => onSort(e.target.value as Sort)}
            className="h-12 w-full border border-input bg-surface px-4 text-[0.97rem] text-cream focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-surface-2">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gold/15 pt-5">
        <p className="label text-sm text-gold-light" aria-live="polite">
          {shown} of {total} {total === 1 ? "property" : "properties"}
        </p>
        {active && (
          <button type="button" onClick={onClear} className="label flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-cream">
            <X className="size-4" /> Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
