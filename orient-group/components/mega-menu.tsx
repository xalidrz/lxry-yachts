import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GroupIcon } from "@/components/group-icon";
import { getGroupItems, shopGroups } from "@/data/shop-groups";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, productPath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Where a group's heading links to: its engraving page, or the product list filtered to the group. */
export function groupHref(locale: Locale, key: string, href?: string) {
  return href ? localePath(locale, href) : `${localePath(locale, "/products")}?group=${key}`;
}

/**
 * The panel under the "Products" nav item: every group in a grid, each with
 * its icon and sub-items. It is always in the HTML (hidden until opened), so the
 * links are visible to search engines. Hidden panels are not focusable.
 */
export function MegaMenuPanel({
  locale,
  open,
  onNavigate,
  id,
}: {
  locale: Locale;
  open: boolean;
  onNavigate: () => void;
  id: string;
}) {
  const t = getDictionary(locale);

  return (
    <div
      id={id}
      role="region"
      aria-label={t.shop.menuLabel}
      className={cn(
        "pointer-events-none invisible absolute inset-x-0 top-[calc(100%+12px)] z-10 before:absolute before:inset-x-0 before:-top-4 before:h-4 before:content-[''] translate-y-1 rounded-3xl border border-[#e7e5e4] bg-white p-6 opacity-0 shadow-[0_16px_40px_rgba(0,0,0,0.14)] transition-[opacity,transform,visibility] duration-150",
        open && "pointer-events-auto visible translate-y-0 opacity-100",
      )}
    >
      <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {shopGroups.map((group) => {
          const items = getGroupItems(group, locale);
          return (
            <li key={group.key}>
              <Link
                href={groupHref(locale, group.key, group.href)}
                onClick={onNavigate}
                className="group/title flex items-center gap-3 font-display text-base font-bold transition-colors duration-150 hover:text-brand"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <GroupIcon icon={group.icon} className="size-[18px]" strokeWidth={1.75} />
                </span>
                {t.shop.groups[group.key]}
              </Link>
              <ul className="mt-3 space-y-0.5 ps-12">
                {items.slice(0, 8).map((item) => (
                  <li key={item.slug || item.label}>
                    <Link
                      href={item.slug ? localePath(locale, productPath(item.slug)) : localePath(locale, "/engraving")}
                      onClick={onNavigate}
                      className="block py-1 text-[0.9375rem] text-muted-foreground transition-colors duration-150 hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex justify-end border-t pt-4">
        <Link
          href={localePath(locale, "/products")}
          onClick={onNavigate}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
        >
          {t.shop.viewAll}
          <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
