import Image from "next/image";

import type { Product } from "@/data/products";
import { productLabel } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Props = {
  product: Pick<Product, "name" | "brand" | "image">;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function productAlt(product: Pick<Product, "name" | "brand">) {
  return `${productLabel(product.name, product.brand)} supplied by Orient Group Gulf in Kuwait`;
}

/**
 * Product photo in a consistent 4:3 frame on light grey, scaled to fit
 * (object-fit: contain). Renders nothing when the product has no photo yet;
 * callers show a compact layout instead of an empty box.
 */
export function ProductImage({ product, sizes, priority, className }: Props) {
  if (!product.image) return null;
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden bg-muted", className)}>
      <Image
        src={product.image}
        alt={productAlt(product)}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain p-4"
      />
    </div>
  );
}
