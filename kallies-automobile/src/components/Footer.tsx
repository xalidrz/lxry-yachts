import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { footerLinks, nav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-white">
      <div className="container grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">
            Inhabergeführtes Autohaus in Zeitz – für Neu- und Gebrauchtwagen, Oldtimer, Ankauf und Werkstattservice. Seit {site.since}.
          </p>
        </div>

        <nav aria-label="Fahrzeuge und Service" className="md:col-span-2">
          <h2 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Entdecken</h2>
          <ul className="space-y-3 text-sm">
            {nav.slice(0, 6).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-white/85 hover:text-brand">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Unternehmen" className="md:col-span-2">
          <h2 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Unternehmen</h2>
          <ul className="space-y-3 text-sm">
            {footerLinks.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-white/85 hover:text-brand">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Kontakt</h2>
          <address className="space-y-3 text-sm not-italic text-white/85">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <span>
                {site.legalName}
                <br />
                {site.address.street}, {site.address.zip} {site.address.city}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <a href={site.phoneHref} className="hover:text-brand">{site.phone}</a>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <span>Mo–Fr 8:30–18:00 · Sa 9:00–12:00</span>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-6 text-xs text-white/70 sm:flex-row sm:justify-between">
          <p>© {site.since}–2026 {site.legalName} Alle Rechte vorbehalten.</p>
          <p>Preise inkl. MwSt. Irrtümer und Zwischenverkauf vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
