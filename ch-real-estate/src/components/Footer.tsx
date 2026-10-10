import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

const quick = [
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Construction", href: "/construction" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Marla Converter", href: "/marla-converter" },
];
const services = [
  { label: "Grey Structure", href: "/construction#grey-structure" },
  { label: "Turnkey Construction", href: "/construction#turnkey" },
  { label: "Renovation & Remodeling", href: "/construction#renovation" },
  { label: "Design & Map Approval", href: "/construction#design" },
  { label: "Property Sales & Rentals", href: "/buy" },
];
const socials = [
  { icon: Facebook, label: "Facebook", href: site.social.facebook },
  { icon: Instagram, label: "Instagram", href: site.social.instagram },
  { icon: Youtube, label: "YouTube", href: site.social.youtube },
];

const heading = "label mb-6 text-[0.95rem] text-gold";
const link = "text-[1rem] text-muted-foreground transition-colors hover:text-gold-light";

export function Footer() {
  return (
    <footer className="border-t border-gold/25 bg-surface">
      <div className="container grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.3fr]">
        <div>
          <Link to="/" aria-label="CH Real Estate & Builder's — home">
            <Logo size={120} />
          </Link>
          <p className="mt-5 max-w-xs text-[0.98rem] text-muted-foreground">
            Verified properties and quality construction in {site.city}. One trusted name for buying, selling and
            building.
          </p>
          <div className="mt-7 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex size-11 items-center justify-center border border-gold/30 text-gold transition-all hover:border-gold hover:bg-gold hover:text-ink"
              >
                <s.icon className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Quick links">
          <h2 className={heading}>Quick Links</h2>
          <ul className="space-y-3">
            {quick.map((l) => (
              <li key={l.label}>
                <Link to={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>Services</h2>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s.label}>
                <Link to={s.href} className={link}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>Contact</h2>
          <ul className="space-y-4 text-[1rem] text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-gold" />
              <address className="not-italic">{site.addressLines.join(", ")}</address>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 size-4 shrink-0 text-gold" />
              <a href={`tel:${site.phoneTel}`} className="hover:text-gold-light">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-1 size-4 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-gold-light">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/15">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 pb-24 text-center text-sm text-muted-foreground sm:flex-row sm:pb-6 sm:pr-24 sm:text-left">
          <p>© 2026 {site.name}</p>
          <p className="label text-[0.8rem]">Buy · Sell · Build</p>
        </div>
      </div>
    </footer>
  );
}
