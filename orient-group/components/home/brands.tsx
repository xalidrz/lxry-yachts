import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/section";
import { brands } from "@/data/brands";

export function Brands() {
  return (
    <Section id="brands">
      <SectionHeading eyebrow="Brands" title="Brands we supply">
        Trusted names in HVAC, fixing systems, electrical and bearings, all
        available from one supplier in Shuwaikh.
      </SectionHeading>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {brands.map((brand) => (
          <li
            key={brand.name}
            className="flex min-h-20 items-center justify-center rounded-xl border bg-card px-4 py-4 text-center"
          >
            {brand.logo ? (
              <span className="relative block h-10 w-32">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </span>
            ) : (
              <span className="font-display text-base font-bold text-foreground sm:text-lg">
                {brand.name}
              </span>
            )}
          </li>
        ))}
      </ul>
      <Link
        href="/brands"
        className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-brand hover:decoration-brand"
      >
        See each brand and its products
        <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
      </Link>
    </Section>
  );
}
