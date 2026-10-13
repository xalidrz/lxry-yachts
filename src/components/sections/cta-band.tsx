import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { links, site } from "@/config/site";

/** Closing call to action on the home page. No hours here: they live in the hero, Location and footer. */
export function CtaBand() {
  return (
    <section className="grid-lines bg-graphite py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-col gap-8 border border-line bg-surface p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl">
              Bring the car in.
            </h2>
            <p className="mt-4 flex items-start gap-2 text-muted">
              <MapPin className="mt-0.5 size-4 shrink-0 text-signal-bright" aria-hidden />
              {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={links.tel} label={`Call ${site.phone.display}`} icon={<Phone aria-hidden />} />
            <Button href="/location" variant="outline" label="Find us" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
