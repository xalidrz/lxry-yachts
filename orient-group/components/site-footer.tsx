import Link from "next/link";

import { ContactDetails } from "@/components/contact-details";
import { LanguageToggle } from "@/components/language-toggle";
import { SiteLogo } from "@/components/site-logo";
import { SocialLinks } from "@/components/social-links";
import { categories, localizeCategory } from "@/data/categories";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import type { Logo } from "@/lib/logo";

const linkClass =
  "inline-block py-1 text-on-dark-muted transition-colors duration-150 hover:text-white";
const headingClass =
  "font-display mb-3 text-sm font-bold tracking-[0.14em] text-on-dark-muted uppercase";

export function SiteFooter({ locale, logo }: { locale: Locale; logo: Logo | null }) {
  const t = getDictionary(locale);
  const quickLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.allProducts, href: "/products" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.brands, href: "/brands" },
    { label: t.nav.engraving, href: "/engraving" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="on-dark bg-charcoal text-on-dark">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 pt-14 pb-10 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
        <div>
          {/* Inverted (white) logo for the dark footer. */}
          <Link href={localePath(locale, "/")} className="inline-flex max-w-full">
            <SiteLogo
              logo={logo}
              alt={t.legalName}
              className="h-10 max-w-full"
              textClassName="text-xl text-on-dark"
            />
          </Link>
          <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-on-dark-muted">
            {t.footer.blurb}
          </p>
          <div className="mt-6 space-y-6">
            <SocialLinks locale={locale} />
            <div>
              <p className="font-display mb-1 text-sm font-bold tracking-[0.14em] text-on-dark-muted uppercase">
                {t.nav.language}
              </p>
              <LanguageToggle locale={locale} tone="dark" />
            </div>
          </div>
        </div>

        <nav aria-label={t.footer.quickLinksAria}>
          <h2 className={headingClass}>{t.footer.quickLinks}</h2>
          <ul>
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={localePath(locale, l.href)} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.categoriesAria}>
          <h2 className={headingClass}>{t.footer.products}</h2>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={localePath(locale, `/products/${c.slug}`)} className={linkClass}>
                  {localizeCategory(c, locale).name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={`${headingClass} mb-4`}>{t.footer.contact}</h2>
          <ContactDetails locale={locale} tone="dark" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-6 pe-20 text-sm text-on-dark-muted sm:px-6 sm:pe-20">
          © 2026 {t.legalName}
        </div>
      </div>
    </footer>
  );
}
