import Image from "next/image";
import { BadgeCheck, MessageCircle, Truck, Warehouse } from "lucide-react";

import { Section, SectionHeading } from "@/components/section";
import { aboutImages } from "@/data/about-images";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

const icons = [BadgeCheck, MessageCircle, Warehouse, Truck];

export function WhyUs({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const photo = aboutImages.team;

  return (
    <Section id="why-us">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Image
          src={photo.src}
          alt={photo.alt[locale]}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="aspect-[4/3] w-full rounded-2xl border object-cover"
        />
        <div>
          <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} className="mb-8" />
          <ul className="space-y-6">
            {t.why.items.map((item, i) => {
              const Icon = icons[i];
              return (
                <li key={item.title} className="flex gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{item.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
