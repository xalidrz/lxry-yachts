"use client";

import { useMemo, useState } from "react";
import { Search, SearchX, X } from "lucide-react";

import { ProductCard, type ProductCardData } from "@/components/product-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Input } from "@/components/ui/input";
import type { CategorySlug } from "@/data/categories";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type BrowserProduct = ProductCardData & { searchText: string };

type Props = {
  locale: Locale;
  products: BrowserProduct[];
  categories: { slug: CategorySlug; title: string }[];
};

/** Lowercase and drop everything except letters and digits (any script). */
const compact = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

/** Every word typed must appear in the name, brand, description or specs (ignoring spaces and dashes). */
function matches(searchText: string, squashed: string, query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  return words.every((w) => searchText.includes(w) || squashed.includes(compact(w)));
}

const pillBase =
  "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-5 text-[0.9375rem] font-semibold transition-colors duration-150";

export function ProductBrowser({ locale, products, categories }: Props) {
  const t = getDictionary(locale);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategorySlug | "all">("all");

  const indexed = useMemo(
    () => products.map((p) => ({ ...p, squashed: compact(p.searchText) })),
    [products],
  );

  const term = query.trim();
  const results = useMemo(
    () =>
      indexed.filter(
        (p) =>
          (category === "all" || p.category === category) &&
          matches(p.searchText, p.squashed, term),
      ),
    [indexed, category, term],
  );

  const pills = [{ slug: "all" as const, title: t.products.all }, ...categories];

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="relative max-w-xl">
          <label htmlFor="product-search" className="sr-only">
            {t.products.searchLabel}
          </label>
          <Search
            className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="product-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value.slice(0, 100))}
            placeholder={t.products.searchPlaceholder}
            autoComplete="off"
            maxLength={100}
            spellCheck={false}
            className="ps-12 pe-12 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t.products.clearSearch}
              className="absolute end-1.5 top-1/2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          )}
        </div>

        <div role="group" aria-label={t.products.filterAria} className="flex flex-wrap gap-2">
          {pills.map((pill) => {
            const active = category === pill.slug;
            return (
              <button
                key={pill.slug}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(pill.slug)}
                className={cn(
                  pillBase,
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-border bg-white text-foreground hover:border-brand-grey",
                )}
              >
                {pill.title}
              </button>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-sm text-muted-foreground">
        {results.length === 0 ? t.products.noneFound : t.products.showing(results.length, products.length)}
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((p, i) => (
            <li key={p.slug}>
              <ProductCard product={p} locale={locale} priority={i < 4} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 flex flex-col items-start gap-5 rounded-2xl border bg-card p-6 sm:p-8">
          <SearchX className="size-9 text-brand-grey" aria-hidden="true" />
          <p className="max-w-xl text-lg">
            {t.common.stockMore}
            {term && (
              <>
                {" "}
                <span className="text-muted-foreground">{t.products.nothingMatched(term)}</span>
              </>
            )}
          </p>
          <WhatsAppButton message={term ? t.wa.search(term) : t.wa.general}>
            {t.common.askUsOnWhatsApp}
          </WhatsAppButton>
        </div>
      )}
    </div>
  );
}
