import { Accessibility, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { SectionLink } from "@/components/section-link";
import { hoursSummary } from "@/lib/hours";
import { links, site } from "@/config/site";

/** preview = home-page version: address card only (no map), with a link to /location. */
export function Location({ preview = false }: { preview?: boolean }) {
  const Heading = preview ? "h3" : "h2";
  return (
    <section id="location" className={preview ? "bg-carbon py-20 sm:py-28" : "bg-carbon py-16 sm:py-24"}>
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {preview ? (
          <Reveal>
            <SectionHeading eyebrow="Location" title="Find the shop" />
          </Reveal>
        ) : null}

        <div className={preview ? "mt-12 grid gap-6" : "grid gap-6 lg:grid-cols-[1.35fr_1fr]"}>
          {preview ? null : (
          <Reveal className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
            <iframe
              title="Map of Elite Motorsports, 70 W Jackson St, Hayward"
              src={links.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[22rem] w-full border-0 sm:h-[28rem] lg:h-full lg:min-h-[30rem]"
              allowFullScreen
            />
          </Reveal>
          )}

          <Reveal index={1} className="flex flex-col rounded-2xl border border-white/10 bg-surface p-7 sm:p-9">
            <Heading className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink">{site.shortName}</Heading>
            <ul className={preview ? "mt-6 grid gap-6 sm:grid-cols-2" : "mt-6 space-y-6"}>
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-signal" aria-hidden />
                <div>
                  <span className="sr-only">Address: </span>
                  <a
                    href={links.place}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block leading-relaxed text-ink underline decoration-signal decoration-2 underline-offset-4 hover:text-signal"
                  >
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.region} {site.address.postalCode}
                    <span className="sr-only"> (opens in Google Maps)</span>
                  </a>
                  <span className="mt-1 block text-sm text-muted">Plus code: {site.address.plusCode}</span>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 size-5 shrink-0 text-signal" aria-hidden />
                <div>
                  <span className="sr-only">Hours: </span>
                  <div className="text-ink">
                    {hoursSummary()}
                    {site.hours.confirmed ? null : (
                      <span className="mt-1 block text-sm text-muted">Call to confirm today&rsquo;s opening time.</span>
                    )}
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <Accessibility className="mt-1 size-5 shrink-0 text-signal" aria-hidden />
                <div>
                  <span className="sr-only">Accessibility: </span>
                  <div className="text-ink">Wheelchair accessible</div>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-signal" aria-hidden />
                <div>
                  <span className="sr-only">Phone: </span>
                  <div>
                    <a href={links.tel} className="text-ink underline decoration-signal decoration-2 underline-offset-4 hover:text-signal">
                      {site.phone.display}
                    </a>
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-auto flex flex-wrap gap-3 pt-9">
              <Button asChild className="h-12 flex-1 sm:flex-none">
                <a href={links.directions} target="_blank" rel="noopener noreferrer">
                  <Navigation className="size-4" aria-hidden />
                  Directions
                </a>
              </Button>
              <Button asChild variant="ghost" className="h-12 flex-1 sm:flex-none">
                <a href={links.tel}>
                  <Phone className="phone-icon size-4" aria-hidden />
                  Call
                </a>
              </Button>
            </div>
            {preview ? (
              <div className="mt-4">
                <SectionLink href="/location">Map and directions</SectionLink>
              </div>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
