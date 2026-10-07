import Link from "next/link";

import { ContactDetails } from "@/components/contact-details";
import { SiteLogo } from "@/components/site-logo";
import { categories } from "@/data/categories";
import type { Logo } from "@/lib/logo";
import { LEGAL_NAME } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All products", href: "/products" },
  { label: "Brands", href: "/brands" },
  { label: "Engraving", href: "/engraving" },
  { label: "Contact", href: "/contact" },
];

const linkClass =
  "inline-block py-1 text-on-dark-muted transition-colors duration-150 hover:text-white";

export function SiteFooter({ logo }: { logo: Logo | null }) {
  return (
    <footer className="on-dark bg-charcoal text-on-dark">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 pt-14 pb-10 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
        <div>
          {/* Inverted (white) logo for the dark footer. */}
          <Link href="/" className="inline-flex max-w-full">
            <SiteLogo
              logo={logo}
              className="h-10 max-w-full"
              textClassName="text-xl text-on-dark"
            />
          </Link>
          <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-on-dark-muted">
            HVAC, electrical and fixing materials for MEP contractors, HVAC
            installers and maintenance companies in Kuwait. Supplying from
            Shuwaikh Industrial Area since 2010.
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <h2 className="font-display mb-3 text-sm font-bold tracking-[0.14em] text-on-dark-muted uppercase">
            Quick links
          </h2>
          <ul>
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer product categories">
          <h2 className="font-display mb-3 text-sm font-bold tracking-[0.14em] text-on-dark-muted uppercase">
            Products
          </h2>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className={linkClass}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display mb-4 text-sm font-bold tracking-[0.14em] text-on-dark-muted uppercase">
            Contact
          </h2>
          <ContactDetails tone="dark" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-6 pr-20 text-sm text-on-dark-muted sm:px-6">
          © 2026 {LEGAL_NAME}
        </div>
      </div>
    </footer>
  );
}
