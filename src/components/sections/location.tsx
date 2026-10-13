import Image from "next/image";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoursTable } from "@/components/hours-table";
import { LocationMap } from "@/components/location-map";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { exteriorStripFiles, photoByFile } from "@/data/photos";
import { links, site } from "@/config/site";

const stack = exteriorStripFiles.map(photoByFile);

export function Location({ h1 = false }: { h1?: boolean }) {
  return (
    <section id="location" className="grid-lines border-b border-line bg-graphite py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead n="07" title="Location" as={h1 ? "h1" : "h2"} />

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <LocationMap />
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal index={1} className="flex flex-col rounded-2xl border border-line bg-surface p-6 sm:p-8">
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

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={links.place}
                  target="_blank"
                  rel="noopener noreferrer"
                  label="Open in Google Maps"
                  icon={<ArrowUpRight aria-hidden />}
                  className="rounded-full"
                />
                <Button href={links.tel} variant="outline" label="Call" icon={<Phone aria-hidden />} className="rounded-full" />
              </div>
            </Reveal>

            <Reveal index={2}>
              <div className="photo-stack" tabIndex={0} role="group" aria-label="Photos of the shop exterior">
                {stack.map((p, i) => (
                  <figure key={p.file} className={`p p${i + 1}`}>
                    <Image src={p.file} alt={p.alt} fill sizes="(min-width: 1024px) 260px, 60vw" quality={75} className="object-cover" />
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
