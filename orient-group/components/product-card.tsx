"use client";

import Link from "next/link";
import { useState } from "react";

import { ProductImage } from "@/components/product-image";
import { AddToQuote } from "@/components/quote/add-to-quote";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { getCategory, localizeCategory, type CategorySlug } from "@/data/categories";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, productPath, type Locale } from "@/lib/i18n";
import { ANY_BRAND, productLabel } from "@/lib/whatsapp";

/** Product data already in the page language (see localizeProduct). */
export type ProductCardData = {
  slug: string;
  name: string;
  /** Name in each language, for the quote list. */
  names: { en: string; ar: string };
  brand: string;
  category: CategorySlug;
  shortDescription: string;
  image: string;
};

type Props = {
  product: ProductCardData;
  locale: Locale;
  /** Heading level used for the product name, so the page outline stays correct. */
  headingLevel?: "h2" | "h3";
  priority?: boolean;
};

/**
 * Card with the photo (or a grey icon box) on top. Clicking it opens a dialog
 * with a large photo and the WhatsApp button. The name is still a real link to
 * the product page, so search engines, middle-click and "open in new tab" work.
 */
export function ProductCard({ product, locale, headingLevel = "h2", priority }: Props) {
  const Heading = headingLevel;
  const t = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const category = getCategory(product.category);
  const label = productLabel(product.name, product.brand);
  const href = localePath(locale, productPath(product.slug));
  const categoryTitle = category ? localizeCategory(category, locale).title : "";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)]">
      <ProductImage
        product={product}
        locale={locale}
        name={product.name}
        sizes="(min-width: 1280px) 280px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        priority={priority}
      />
      <div className="flex flex-1 flex-col gap-3 border-t p-5">
        <div className="flex flex-wrap gap-2">
          {categoryTitle && <Badge variant="muted">{categoryTitle}</Badge>}
          {product.brand !== ANY_BRAND && <Badge>{product.brand}</Badge>}
        </div>
        <Heading className="font-display text-lg leading-snug font-bold text-foreground">
          {/* Stretched link: the whole card is clickable. */}
          <Link
            href={href}
            onClick={(e) => {
              // Plain left click opens the dialog; modified clicks follow the link.
              if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              setOpen(true);
            }}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:after:rounded-2xl"
          >
            {product.name}
          </Link>
        </Heading>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
      </div>
      <div className="relative z-10 space-y-2 p-5 pt-0">
        <AddToQuote
          slug={product.slug}
          name={product.names}
          brand={product.brand}
          locale={locale}
        />
        <WhatsAppButton
          message={t.wa.price(label)}
          size="sm"
          variant="outline"
          className="w-full"
          ariaLabel={t.common.askForPriceAria(label)}
        >
          {t.common.askForPrice}
        </WhatsAppButton>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent closeLabel={t.productDialog.close} className="max-w-lg overflow-hidden p-0">
          <ProductImage
            product={product}
            locale={locale}
            name={product.name}
            sizes="(min-width: 640px) 512px, 100vw"
            eager
            className="rounded-t-2xl border-b"
          />
          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              {categoryTitle && <Badge variant="muted">{categoryTitle}</Badge>}
              {product.brand !== ANY_BRAND && <Badge>{product.brand}</Badge>}
            </div>
            <DialogTitle className="font-display mt-3 text-2xl leading-snug font-extrabold">
              {product.name}
            </DialogTitle>
            <DialogDescription className="mt-2 leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </DialogDescription>
            <AddToQuote
              slug={product.slug}
              name={product.names}
              brand={product.brand}
              locale={locale}
              size="lg"
              className="mt-6"
            />
            <WhatsAppButton message={t.wa.price(label)} size="lg" className="mt-3 w-full">
              {t.productDialog.askWhatsApp}
            </WhatsAppButton>
            <Link
              href={href}
              className="mt-3 flex min-h-11 items-center justify-center text-sm font-semibold underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-brand hover:decoration-brand"
            >
              {t.productDialog.viewDetails}
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
