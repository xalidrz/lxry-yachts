"use client";

import { useState } from "react";

import { ProductImage } from "@/components/product-image";
import type { CategorySlug } from "@/data/categories";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  product: { name: string; brand: string; image: string; category: CategorySlug };
  /** Localised name for alt text. */
  name: string;
  /** Main photo first, then any extra photos. Empty when the product has no photo. */
  photos: string[];
  locale: Locale;
};

/** Large product photo with thumbnails when there is more than one photo. */
export function ProductGallery({ product, name, photos, locale }: Props) {
  const t = getDictionary(locale);
  const [index, setIndex] = useState(0);
  const current = photos[index];

  return (
    <div>
      <ProductImage
        product={product}
        locale={locale}
        name={name}
        src={current}
        sizes="(min-width: 1024px) 560px, 100vw"
        priority
        className="rounded-2xl border"
      />
      {photos.length > 1 && (
        <ul className="mt-3 flex flex-wrap gap-3">
          {photos.map((photo, i) => (
            <li key={photo}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t.product.photoOf(i + 1, photos.length)}
                aria-pressed={i === index}
                className={cn(
                  "relative block size-20 cursor-pointer overflow-hidden rounded-xl border bg-white transition-colors duration-150",
                  i === index ? "border-brand ring-1 ring-brand" : "hover:border-brand-grey",
                )}
              >
                <Image src={photo} alt="" fill sizes="80px" className="object-contain p-1.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
