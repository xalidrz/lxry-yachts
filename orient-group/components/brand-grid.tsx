"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type BrandEntry = {
  name: string;
  logo?: string;
  /** Logo has its own coloured background: shown centred at about 80% of the tile. */
  ownBackground?: boolean;
  /** Product lines we list for this brand, already in the page language. */
  lines: { slug: string; name: string }[];
};

/**
 * Logo grid, 2 columns on phones and 4 on desktop. Every logo is shown in full
 * colour on a white tile (1px border, 12px corners, 16px padding). Hover lifts
 * the tile slightly with a soft shadow. Clicking a logo opens a dialog with the
 * brand's product lines and a WhatsApp button.
 */
export function BrandGrid({ brands, locale }: { brands: BrandEntry[]; locale: Locale }) {
  const t = getDictionary(locale);
  const [open, setOpen] = useState<BrandEntry | null>(null);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {brands.map((brand) => (
          <li key={brand.name}>
            <button
              type="button"
              onClick={() => setOpen(brand)}
              aria-haspopup="dialog"
              aria-label={t.brandsPage.openBrand(brand.name)}
              className="relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-[12px] border border-border bg-white p-4 transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] focus-visible:-translate-y-0.5 focus-visible:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            >
              {brand.logo ? (
                // Logos with their own coloured background sit centred at ~80% of the tile.
                <span
                  className={cn(
                    brand.ownBackground ? "absolute inset-[10%]" : "relative block h-full w-full",
                  )}
                >
                  <Image
                    src={brand.logo}
                    alt={t.brandsPage.logoAlt(brand.name)}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-contain"
                  />
                </span>
              ) : (
                <span dir="ltr" className="font-display text-lg leading-tight font-bold text-foreground">
                  {brand.name}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent closeLabel={t.brandsPage.close}>
          {open && (
            <>
              <div className="flex items-center gap-4 pe-10">
                <span
                  className={cn(
                    "relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white p-1.5",
                  )}
                >
                  {open.logo ? (
                    <Image
                      src={open.logo}
                      alt={t.brandsPage.logoAlt(open.name)}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  ) : (
                    <span dir="ltr" className="text-center text-xs leading-tight font-bold">
                      {open.name}
                    </span>
                  )}
                </span>
                <DialogTitle dir="ltr" className="font-display text-2xl font-extrabold text-start">
                  {open.name}
                </DialogTitle>
              </div>
              <DialogDescription className="mt-5 text-sm font-semibold tracking-wide text-muted-foreground">
                {open.lines.length > 0 ? t.brandsPage.linesTitle : t.brandsPage.noLines(open.name)}
              </DialogDescription>
              {open.lines.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {open.lines.map((line) => (
                    <li key={line.slug}>
                      <Link
                        href={localePath(locale, `/products/${line.slug}`)}
                        className="inline-flex min-h-11 items-center underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-brand hover:decoration-brand"
                      >
                        {line.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <WhatsAppButton message={t.wa.brand(open.name)} className="mt-6 w-full">
                {t.brandsPage.askBrand}
              </WhatsAppButton>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
