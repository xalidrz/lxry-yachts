import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { Section, SectionHeading } from "@/components/section";
import { brands } from "@/data/brands";

export function Brands() {
  return (
    <Section id="brands">
      <SectionHeading eyebrow="Brands" title="Brands we supply">
        Trusted names in HVAC, fixing systems, electrical and bearings, all
        available from one supplier in Shuwaikh.
      </SectionHeading>
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
        {brands.map((brand) => (
          <li key={brand.name}>
            <BrandLogo
              brand={brand}
              sizes="(min-width: 1024px) 140px, (min-width: 640px) 25vw, 33vw"
            />
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
