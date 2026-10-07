import Image from "next/image";

import { CategoryIcon } from "@/components/category-icon";
import { getCategory, type CategorySlug } from "@/data/categories";
import type { Product } from "@/data/products";
import { productLabel } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Props = {
  product: Pick<Product, "name" | "brand" | "image"> & {
    category: CategorySlug;
  };
  sizes: string;
  priority?: boolean;
  className?: string;
  large?: boolean;
};

export function productAlt(product: Pick<Product, "name" | "brand">) {
  return `${productLabel(product.name, product.brand)} supplied by Orient Group Gulf in Kuwait`;
}

/**
 * Shows the real photo when `image` is set in data/products.ts, otherwise a
 * neutral branded placeholder (no stock photos).
 */
export function ProductImage({
  product,
  sizes,
  priority,
  className,
  large,
}: Props) {
  if (product.image) {
    return (
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden bg-white",
          className,
        )}
      >
        <Image
          src={product.image}
          alt={productAlt(product)}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain p-3"
        />
      </div>
    );
  }

  const category = getCategory(product.category);

  return (
    <div
      role="img"
      aria-label={`Photo placeholder for ${productAlt(product)}`}
      className={cn(
        "relative flex aspect-[4/3] flex-col items-center justify-center gap-3 overflow-hidden bg-charcoal text-center text-on-dark",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(145deg, #2A2B2D 0%, #36373A 100%)",
        backgroundSize: "28px 28px, 28px 28px, 100% 100%",
      }}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06]",
          large ? "size-24" : "size-14",
        )}
      >
        {category && (
          <CategoryIcon
            icon={category.icon}
            className={cn("text-white/80", large ? "size-11" : "size-7")}
            strokeWidth={1.5}
          />
        )}
      </span>
      <span className="space-y-0.5">
        <span
          className={cn(
            "font-display block font-extrabold uppercase tracking-[0.18em] text-white/90",
            large ? "text-sm" : "text-[0.6875rem]",
          )}
        >
          Orient Group Gulf
        </span>
        <span
          className={cn(
            "block text-on-dark-muted",
            large ? "text-sm" : "text-xs",
          )}
        >
          Product photo coming soon
        </span>
      </span>
    </div>
  );
}
