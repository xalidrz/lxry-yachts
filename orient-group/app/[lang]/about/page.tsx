import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MessageCircle, Truck } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { brands } from "@/data/brands";
import { labelledProjects } from "@/data/projects";
import { getDictionary } from "@/lib/dictionaries";
import { localePath } from "@/lib/i18n";
import { getLocale, type LangParams } from "@/lib/page-params";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const valueIcons = [MessageCircle, BadgeCheck, Truck];

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/about",
    title: t.seo.aboutTitle,
    description: t.seo.aboutDescription,
  });
}

export default async function AboutPage({ params }: LangParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: t.nav.home, path: "/" },
          { name: t.nav.about, path: "/about" },
        ])}
      />
      <PageHero
        locale={locale}
        title={t.about.title}
        crumbs={[{ label: t.nav.home, href: localePath(locale, "/") }, { label: t.nav.about }]}
      >
        {t.about.intro}
      </PageHero>

      <Section>
        <div className="max-w-3xl">
          <SectionHeading title={t.about.storyTitle} />
          <div className="space-y-5 text-lg leading-relaxed">
            {t.about.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading title={t.about.valuesTitle} />
        <ul className="grid gap-5 md:grid-cols-3">
          {t.about.values.map((value, i) => {
            const Icon = valueIcons[i];
            return (
              <li key={value.title} className="rounded-2xl border bg-background p-6 sm:p-8">
                <span className="flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="font-display mt-5 text-xl font-bold">{value.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{value.text}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section>
        <SectionHeading title={t.about.brandsTitle} />
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
          {brands.map((brand) => (
            <li key={brand.name}>
              <Link
                href={localePath(locale, "/brands")}
                aria-label={brand.name}
                className="block rounded-xl transition-shadow duration-150 hover:shadow-[0_6px_20px_rgba(0,0,0,0.10)]"
              >
                <BrandLogo
                  brand={brand}
                  locale={locale}
                  sizes="(min-width: 1024px) 140px, (min-width: 640px) 25vw, 33vw"
                />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={localePath(locale, "/brands")}
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-brand hover:decoration-brand"
        >
          {t.about.brandsLink}
          <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
        </Link>
      </Section>

      {/* Hidden until names are added to data/projects.ts. */}
      {labelledProjects.length > 0 && (
        <Section tone="white">
          <SectionHeading title={t.about.projectsTitle} />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {labelledProjects.map((name) => (
              <li key={name} className="rounded-xl border bg-background px-5 py-4 font-semibold">
                {name}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section className="pt-0">
        <WhatsAppCta locale={locale} className="lg:flex-row lg:items-center" />
      </Section>
    </>
  );
}
