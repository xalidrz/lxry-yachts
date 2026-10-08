import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { electrical, wedding } from "@/data/services";
import { mapLink, navLinks, site, telHref } from "@/lib/site";

const h = "label text-[0.9rem] text-white";

export function Footer() {
  return (
    <footer className="relative border-t border-brandred/70 bg-ink pb-24 pt-16 md:pb-10">
      <div className="container">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_1.2fr_1.3fr]">
          <div>
            <Logo className="h-24 w-auto" />
            <p className="mt-5 max-w-xs text-[0.95rem] text-muted-foreground">Electrical installation and wedding &amp; event lighting decor, serving Edmonton and the surrounding area.</p>
            <ul className="mt-6 space-y-3.5 text-[0.95rem] text-muted-foreground">
              <li className="flex gap-3">
                <Phone className="mt-1 size-4 shrink-0 text-volt-light" />
                <a href={telHref} className="transition-colors hover:text-volt-light">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-volt-light" />
                <a href={mapLink} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-volt-light">
                  {site.addressLines.join(", ")}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[
                { href: site.social.facebook, label: "PB10 Electrical on Facebook", icon: Facebook },
                { href: site.social.instagram, label: "PB10 Electrical on Instagram", icon: Instagram },
              ].map(({ href, label, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-all hover:border-volt hover:text-volt-light hover:shadow-[0_0_22px_rgba(247,147,30,0.5)]">
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className={h}>Quick links</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem] text-muted-foreground">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-volt-light">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {[
            { title: "Electrical", href: "#electrical", list: electrical },
            { title: "Wedding & event lighting", href: "#wedding", list: wedding },
          ].map(({ title, href, list }) => (
            <div key={title}>
              <h2 className={h}>{title}</h2>
              <ul className="mt-5 space-y-3 text-[0.95rem] text-muted-foreground">
                {list.map((s) => (
                  <li key={s.title}>
                    <a href={href} className="transition-colors hover:text-volt-light">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 PB10 Electrical</p>
          <p>Electrician &amp; wedding lighting · Edmonton, Alberta</p>
        </div>
      </div>
    </footer>
  );
}
