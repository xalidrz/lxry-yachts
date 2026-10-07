import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { brands } from "@/data/brands";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";

/**
 * Auto-scrolling strip of brand logos in full colour. Pauses on hover or
 * keyboard focus, and stands still (scrollable) for visitors who prefer
 * reduced motion. The second copy is hidden from assistive technology.
 */
export function BrandMarquee({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const logos = brands.filter((b) => b.logo);

  const row = (hidden: boolean) =>
    logos.map((brand) => (
      <li
        key={`${hidden ? "b" : "a"}-${brand.name}`}
        className="relative size-24 shrink-0 overflow-hidden rounded-xl border bg-white p-3"
      >
        <Image
          src={brand.logo!}
          alt={hidden ? "" : t.brandsPage.logoAlt(brand.name)}
          fill
          sizes="96px"
          // Eager: the logos sit off-screen to the side, where lazy loading would never fetch them.
          loading="eager"
          className="object-contain p-3"
        />
      </li>
    ));

  return (
    <section aria-label={t.home.brandsTitle} className="border-y bg-background py-8">
      <div className="mx-auto mb-5 flex max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <p className="text-sm font-bold tracking-[0.16em] text-brand uppercase">{t.home.brandsTitle}</p>
        <Link
          href={localePath(locale, "/brands")}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-brand hover:decoration-brand"
        >
          {t.home.brandsLink}
          <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
        </Link>
      </div>
      <div className="marquee overflow-hidden motion-reduce:overflow-x-auto">
        <div className="marquee-track flex w-max">
          <ul className="flex shrink-0 gap-4 pe-4 ps-4">{row(false)}</ul>
          <ul className="flex shrink-0 gap-4 pe-4" aria-hidden="true">
            {row(true)}
          </ul>
        </div>
      </div>
    </section>
  );
}
