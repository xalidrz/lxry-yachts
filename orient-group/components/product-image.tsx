import Image from "next/image";

import { CategoryIcon } from "@/components/category-icon";
import { getCategory, type CategorySlug } from "@/data/categories";
import type { Product } from "@/data/products";
import type { Locale } from "@/lib/i18n";
import { ANY_BRAND, productLabel } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Props = {
  product: Pick<Product, "name" | "brand" | "image"> & { category: CategorySlug };
  locale: Locale;
  /** Localised product name (defaults to the English name). */
  name?: string;
  /** Show this photo instead of the product's main one (gallery thumbnails). */
  src?: string;
  sizes: string;
  priority?: boolean;
  /** Load immediately instead of lazily (images inside dialogs). */
  eager?: boolean;
  className?: string;
};

export function productAlt(name: string, brand: string, locale: Locale) {
  const label = productLabel(name, brand);
  return locale === "ar"
    ? `${label} من أورينت جروب جلف في الكويت`
    : `${label} supplied by Orient Group Gulf in Kuwait`;
}

/**
 * Product photo in a white 4:3 box, scaled to fit (object-fit: contain) with
 * 16px padding, lazy-loaded. Products without a photo get a light grey 4:3 box
 * with the category icon in red and, when known, the brand name.
 */
export function ProductImage({
  product,
  locale,
  name,
  src,
  sizes,
  priority,
  eager,
  className,
}: Props) {
  const photo = src ?? product.image;

  if (photo) {
    return (
      <div className={cn("relative aspect-[4/3] overflow-hidden bg-white", className)}>
        <Image
          src={photo}
          alt={productAlt(name ?? product.name, product.brand, locale)}
          fill
          sizes={sizes}
          priority={priority}
          loading={eager ? "eager" : undefined}
          className="object-contain p-4"
        />
      </div>
    );
  }

  const category = getCategory(product.category);
  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] flex-col items-center justify-center gap-2 overflow-hidden bg-muted text-center",
        className,
      )}
    >
      {category && (
        <CategoryIcon icon={category.icon} className="size-14 text-brand" strokeWidth={1.5} />
      )}
      {product.brand !== ANY_BRAND && (
        <span dir="ltr" className="text-xs font-semibold tracking-wide text-muted-foreground">
          {product.brand}
        </span>
      )}
    </div>
  );
}
