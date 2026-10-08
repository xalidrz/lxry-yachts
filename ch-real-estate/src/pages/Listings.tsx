import { Link, useSearchParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Gold } from "@/components/SectionHeading";
import { PageHeader } from "@/components/PageHeader";
import { PropertyCard } from "@/components/PropertyCard";
import { FilterBar } from "@/components/FilterBar";
import { CtaBand } from "@/components/CtaBand";
import { properties } from "@/data/properties";
import { criteriaToParams, matches, paramsToCriteria, paramsToSort, sortProperties, type Sort } from "@/lib/filters";
import { contactLink } from "@/lib/site";
import { usePageMeta } from "@/lib/seo";

/** /buy and /rent. Filters + sort live in the query string, so a filtered view can be shared or bookmarked. */
export default function Listings({ mode }: { mode: "buy" | "rent" }) {
  const isBuy = mode === "buy";
  usePageMeta(`/${mode}`);
  const [params, setParams] = useSearchParams();
  const criteria = paramsToCriteria(mode, params);
  const sort = paramsToSort(params);

  const inventory = properties.filter((p) => p.listing === (isBuy ? "sale" : "rent"));
  const list = sortProperties(inventory.filter((p) => matches(p, criteria)), sort);

  const update = (patch: Partial<typeof criteria>, nextSort: Sort = sort) =>
    setParams(criteriaToParams({ ...criteria, ...patch }, nextSort), { replace: true });

  return (
    <>
      <PageHeader
        eyebrow={isBuy ? "Properties for Sale" : "Properties for Rent"}
        title={
          isBuy ? (
            <>
              Find a home or plot <Gold>worth buying</Gold>
            </>
          ) : (
            <>
              Quality rentals, <Gold>clearly priced</Gold>
            </>
          )
        }
        description={
          isBuy
            ? "Verified houses, plots, apartments and commercial property across Wah Cantt. Every listing is physically checked before it is shown."
            : "Houses, apartments and commercial spaces available to rent now, with monthly rents shown up front in PKR."
        }
        crumbs={[{ label: isBuy ? "Buy" : "Rent" }]}
        image={isBuy ? "/images/prop-villa.svg" : "/images/prop-apartment.svg"}
      />

      <section className="bg-ink py-16 sm:py-20" aria-label="Listings">
        <div className="container">
          <FilterBar
            criteria={criteria}
            sort={sort}
            total={inventory.length}
            shown={list.length}
            onChange={(patch) => update(patch)}
            onSort={(s) => update({}, s)}
            onClear={() => setParams({}, { replace: true })}
          />

          <div className="mt-12 min-h-[24rem]">
            {list.length > 0 ? (
              <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {list.map((p, i) => (
                  <PropertyCard key={p.id} p={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-lg border border-gold/20 bg-surface px-8 py-14 text-center">
                <SearchX className="mx-auto mb-5 size-9 text-gold" />
                <h2 className="text-2xl">No exact match yet</h2>
                <p className="mt-3 text-muted-foreground">
                  We also hold off-market listings that are not shown here. Tell us what you are looking for and we will find it.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button asChild>
                    <Link to={contactLink({ interest: isBuy ? "Buy" : "Rent", message: "I'm looking for a property and could not find it online." })}>
                      Tell us your requirement
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={() => setParams({}, { replace: true })}>
                    Clear filters
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p className="mt-12 text-center text-muted-foreground">
            Comparing plot sizes?{" "}
            <Link to="/marla-converter" className="text-gold-light underline-offset-4 hover:underline">
              Use the Marla ↔ sq ft converter
            </Link>
            {" · "}
            <Link to={isBuy ? "/rent" : "/buy"} className="text-gold-light underline-offset-4 hover:underline">
              Browse properties {isBuy ? "for rent" : "for sale"}
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Can't see what you need? <Gold>We'll find it.</Gold>
          </>
        }
        text="Share your budget, area and size and we will search our off-market listings and network for you."
        interest={isBuy ? "Buy" : "Rent"}
        message="I'm looking for a property. Please contact me with options."
      />
    </>
  );
}
