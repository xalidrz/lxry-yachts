import Image from "next/image";

import type { Product } from "@/data/products";
import type { Locale } from "@/lib/i18n";
import { productLabel } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Props = {
  product: Pick<Product, "name" | "brand" | "image">;
  locale: Locale;
  /** Localised product name (defaults to the English name). */
  name?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function productAlt(name: string, brand: string, locale: Locale) {
  const label = productLabel(name, brand);
  return locale === "ar"
    ? `${label} من أورينت جروب جلف في الكويت`
    : `${label} supplied by Orient Group Gulf in Kuwait`;
}

/**
 * Product photo in a consistent 4:3 frame on light grey, scaled to fit
 * (object-fit: contain). Renders nothing when the product has no photo yet;
 * callers show a compact layout instead of an empty box.
 */
export function ProductImage({ product, locale, name, sizes, priority, className }: Props) {
  if (!product.image) return null;
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden bg-muted", className)}>
      <Image
        src={product.image}
        alt={productAlt(name ?? product.name, product.brand, locale)}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain p-4"
      />
    </div>
  );
}
