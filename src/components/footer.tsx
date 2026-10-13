import { ArrowUp } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { Wordmark } from "@/components/wordmark";
import { nav } from "@/config/nav";
import { hoursSummary } from "@/lib/hours";
import { links, site } from "@/config/site";

const col = "font-mono text-xs uppercase tracking-[0.22em] text-signal-bright";

export function Footer() {
  return (
    <footer className="bg-graphite pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <a href="/#top" className="inline-block">
            <Wordmark className="h-8" />
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">Owner-run auto repair in Hayward, California.</p>
        </div>

        <nav aria-label="Footer">
          <h2 className={col}>Pages</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {[...nav, { label: "Request a time", href: "/book" }].map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-ink/90 hover:text-signal-bright">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={col}>Contact</h2>
          <p className="mt-3 text-sm">
            <a href={links.tel} className="font-mono text-ink/90 underline decoration-signal decoration-1 underline-offset-4 hover:text-signal-bright">
              {site.phone.display}
            </a>
          </p>
          <p className="mt-2 text-sm text-muted">{site.owner}, owner</p>
        </div>

        <div>
          <h2 className={col}>Visit</h2>
          <address className="mt-3 text-sm not-italic leading-relaxed text-ink/90">
            <a
              href={links.place}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-signal decoration-1 underline-offset-4 hover:text-signal-bright"
            >
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
              <span className="sr-only"> (opens in Google Maps)</span>
            </a>
          </address>
          <p className="mt-3 text-sm text-ink/90">{hoursSummary()}</p>
          <StatusBadge className="mt-2" />
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <div className="checker h-3 w-24 border border-line" aria-hidden />
        <a
          href="/#top"
          className="inline-flex h-11 items-center gap-2 border border-line px-4 font-mono text-xs uppercase tracking-[0.2em] text-ink hover:border-signal"
        >
          Back to top
          <ArrowUp className="size-4" aria-hidden />
        </a>
      </div>

      <p
        aria-hidden
        className="outline-word mt-8 select-none overflow-hidden whitespace-nowrap text-center font-display text-[13.2vw] font-extrabold uppercase leading-[0.85] tracking-tight"
      >
        {site.name}
      </p>
      <p className="border-t border-line px-5 py-5 text-center font-mono text-xs text-muted">© 2026 Elite Motorsports</p>
    </footer>
  );
}
