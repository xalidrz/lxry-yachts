import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoursTable } from "@/components/hours-table";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { photoByFile } from "@/data/photos";
import { links, site } from "@/config/site";

const strip = ["s-class-at-shop-front", "4runner-by-shop-sign", "cybertruck-outside-shop"].map(photoByFile);

export function Location() {
  return (
    <section id="location" className="grid-lines border-b border-line bg-graphite py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead n="07" title="Location" />

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="overflow-hidden border border-line bg-surface">
            <iframe
              title="Map of Elite Motorsports, 70 W Jackson St, Hayward"
              src={links.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[22rem] w-full border-0 sm:h-[28rem] lg:h-full lg:min-h-[32rem]"
              allowFullScreen
            />
          </Reveal>

          <Reveal index={1} className="flex flex-col border border-line bg-surface p-6 sm:p-8">
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-signal-bright" aria-hidden />
                <div>
                  <span className="sr-only">Address: </span>
                  <a
                    href={links.place}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block leading-relaxed text-ink underline decoration-signal decoration-2 underline-offset-4 hover:text-signal-bright"
                  >
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.region} {site.address.postalCode}
                    <span className="sr-only"> (opens in Google Maps)</span>
                  </a>
                  <span className="mt-1 block font-mono text-xs text-muted">Plus code {site.address.plusCode}</span>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-signal-bright" aria-hidden />
                <div>
                  <span className="sr-only">Phone: </span>
                  <a href={links.tel} className="font-mono text-ink underline decoration-signal decoration-2 underline-offset-4 hover:text-signal-bright">
                    {site.phone.display}
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-8 border-t border-line pt-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">Hours</p>
              <HoursTable />
            </div>

            <ul className="mt-8 space-y-1.5 border-t border-line pt-6 text-sm text-ink/90">
              {site.profile.accessibility.map((a) => (
                <li key={a}>{a}</li>
              ))}
              <li>{site.profile.parking}</li>
              <li>Payments: {site.profile.payments.join(", ")}</li>
            </ul>

            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <Button href={links.place} target="_blank" rel="noopener noreferrer" label="Open in Google Maps" />
              <Button href={links.tel} variant="outline" label="Call" icon={<Phone aria-hidden />} />
            </div>
          </Reveal>
        </div>

        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {strip.map((p, i) => (
            <Reveal key={p.file} as="li" index={i} className="relative aspect-[4/3] overflow-hidden border border-line">
              <Image src={p.file} alt={p.alt} fill sizes="(min-width: 1280px) 400px, (min-width: 640px) 33vw, 100vw" quality={75} className="object-cover" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
