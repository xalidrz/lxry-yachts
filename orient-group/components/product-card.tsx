import Link from "next/link";

import { CategoryBadgeIcon } from "@/components/category-badge-icon";
import { ProductImage } from "@/components/product-image";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { getCategory, type CategorySlug } from "@/data/categories";
import { ANY_BRAND, priceMessage, productLabel } from "@/lib/whatsapp";

export type ProductCardData = {
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  shortDescription: string;
  image: string;
};

type Props = {
  product: ProductCardData;
  /** Heading level used for the product name, so the page outline stays correct. */
  headingLevel?: "h2" | "h3";
  priority?: boolean;
};

/**
 * With a photo: photo on top, then details. Without one: a compact card with
 * the category icon in a red-tinted circle (no empty image box).
 */
export function ProductCard({ product, headingLevel = "h2", priority }: Props) {
  const Heading = headingLevel;
  const category = getCategory(product.category);
  const hasPhoto = Boolean(product.image);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-shadow duration-150 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
      {hasPhoto && (
        <ProductImage
          product={product}
          sizes="(min-width: 1280px) 280px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
        />
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {!hasPhoto && <CategoryBadgeIcon category={product.category} />}
        <div className="flex flex-wrap gap-2">
          {category && <Badge variant="muted">{category.title}</Badge>}
          {product.brand !== ANY_BRAND && <Badge>{product.brand}</Badge>}
        </div>
        <Heading className="font-display text-lg leading-snug font-bold text-foreground">
          {/* Stretched link: the whole card opens the product page. */}
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:after:rounded-2xl"
          >
            {product.name}
          </Link>
        </Heading>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
      </div>
      <div className="relative z-10 p-5 pt-0">
        <WhatsAppButton
          message={priceMessage(product.name, product.brand)}
          size="sm"
          variant="outline"
          className="w-full"
          ariaLabel={`Ask for price: ${productLabel(product.name, product.brand)} on WhatsApp`}
        >
          Ask for price
        </WhatsAppButton>
      </div>
    </article>
  );
}
