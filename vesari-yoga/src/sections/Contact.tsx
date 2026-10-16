import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { contact, links, site } from "@/content";
import { LazyMap } from "@/components/LazyMap";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";

function InfoRow({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold-deep/50 text-gold-deep">
        <Icon aria-hidden="true" strokeWidth={1.25} className="size-6" />
      </span>
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold-deep">{label}</p>
        <div className="mt-1 text-lg leading-snug">{children}</div>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="bg-cream px-5 py-24 sm:px-8 md:py-36">
      <Reveal>
        <SectionHeading eyebrow={contact.eyebrow} title={contact.title} />
        <p className="mx-auto mt-6 max-w-xl text-center text-lg text-ink">{contact.intro}</p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-6xl gap-10 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-8">
          <InfoRow icon={MapPin} label="Adresse">
            <address className="not-italic">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}, {site.address.country}
            </address>
          </InfoRow>
          <InfoRow icon={Phone} label="Téléphone">
            <a href={links.tel} className="underline decoration-gold-deep underline-offset-4 hover:text-gold-deep">
              {site.phoneDisplay}
            </a>
          </InfoRow>
          <InfoRow icon={Clock} label="Horaires">
            {site.hours}
          </InfoRow>

          <div className="flex flex-col gap-4 pt-2">
            <Button asChild size="lg" variant="dark" className="h-auto min-h-14 w-full whitespace-normal px-6 py-3 sm:w-auto sm:px-9">
              <a href={links.tel}>
                <Phone aria-hidden="true" strokeWidth={1.5} />
                {contact.callLabel} {site.phoneDisplay}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline-dark" className="w-full sm:w-auto">
              <a href={links.directions} target="_blank" rel="noopener noreferrer">
                <Navigation aria-hidden="true" strokeWidth={1.5} />
                {contact.directionsLabel}
                <span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <LazyMap src={links.mapEmbed} title={contact.mapTitle} />
        </Reveal>
      </div>
    </section>
  );
}
