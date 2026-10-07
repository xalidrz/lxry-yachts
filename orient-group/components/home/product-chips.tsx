import Link from "next/link";

import { getGroupItems, shopGroups } from "@/data/shop-groups";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, productPath, type Locale } from "@/lib/i18n";

/**
 * Endless strip of product-name chips under the hero. Each chip links to its
 * product page. Pauses on hover or focus; static and scrollable when the
 * visitor prefers reduced motion. The second copy is hidden from assistive tech.
 */
export function ProductChips({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  // A handful of products from every range (keeps the strip light; the full list is on /products).
  const chips = shopGroups.flatMap((group) =>
    group.match ? getGroupItems(group, locale).slice(0, 5) : [],
  );

  const row = (hidden: boolean) =>
    chips.map((chip) => (
      <li key={`${hidden ? "b" : "a"}-${chip.slug}`} className="shrink-0">
        <Link
          href={localePath(locale, productPath(chip.slug))}
          tabIndex={hidden ? -1 : undefined}
          className="inline-flex min-h-10 items-center rounded-full border bg-white px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-150 hover:border-brand hover:text-brand"
        >
          {chip.label}
        </Link>
      </li>
    ));

  return (
    <section aria-label={t.chips.aria} className="bg-background py-5">
      <div className="marquee overflow-hidden motion-reduce:overflow-x-auto">
        <div className="marquee-track flex w-max" style={{ animationDuration: "90s" }}>
          <ul className="flex shrink-0 gap-3 ps-3 pe-3">{row(false)}</ul>
          <ul className="flex shrink-0 gap-3 pe-3" aria-hidden="true">
            {row(true)}
          </ul>
        </div>
      </div>
    </section>
  );
}
