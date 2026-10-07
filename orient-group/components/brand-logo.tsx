import Image from "next/image";

import type { Brand } from "@/data/brands";
import { cn } from "@/lib/utils";

/** Square brand tile: the logo image, or the brand name when there is no logo. */
export function BrandLogo({
  brand,
  sizes,
  className,
}: {
  brand: Brand;
  sizes: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border bg-white p-2 text-center",
        className,
      )}
    >
      {brand.logo ? (
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          fill
          sizes={sizes}
          className="object-contain"
        />
      ) : (
        <span className="font-display text-sm leading-tight font-bold text-foreground sm:text-base">
          {brand.name}
        </span>
      )}
    </span>
  );
}
