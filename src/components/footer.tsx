import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { StatusBadge } from "@/components/status-badge";
import { nav } from "@/config/nav";
import { hoursSummary } from "@/lib/hours";
import { links, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-carbon pb-28 pt-14 md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-block">
            <Wordmark className="h-8" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Owner-run auto repair in Hayward, California. Wheelchair accessible.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.24em] text-signal">Pages</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-ink/90 hover:text-signal">
                Home
              </Link>
            </li>
            {[...nav, { label: "Book", href: "/book" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-ink/90 hover:text-signal">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.24em] text-signal">Address</h2>
          <address className="mt-3 text-sm not-italic leading-relaxed text-ink/90">
            <a
              href={links.place}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-signal decoration-1 underline-offset-4 hover:text-signal"
            >
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
              <span className="sr-only"> (opens in Google Maps)</span>
            </a>
          </address>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.24em] text-signal">Phone</h2>
          <p className="mt-3 text-sm">
            <a href={links.tel} className="text-ink/90 underline decoration-signal decoration-1 underline-offset-4 hover:text-signal">
              {site.phone.display}
            </a>
          </p>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.24em] text-signal">Hours</h2>
          <p className="mt-3 text-sm text-ink/90">{hoursSummary()}</p>
          <StatusBadge variant="inline" className="mt-2" />
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl px-5 lg:px-8">
        <p className="border-t border-white/10 pt-6 text-sm text-muted">© 2026 {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
