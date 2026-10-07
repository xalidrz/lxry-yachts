import { BadgeCheck, Building2, MessageCircle, Truck } from "lucide-react";

import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

const icons = [BadgeCheck, Building2, MessageCircle, Truck];

/** Four short reasons to trust us, in one row under the hero. */
export function TrustStrip({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section aria-label={t.trust.aria} className="border-y bg-white">
      <ul className="mx-auto grid max-w-[1200px] gap-x-6 gap-y-5 px-4 py-7 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {t.trust.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <li key={item.title} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span>
                <span className="font-display block leading-snug font-bold">{item.title}</span>
                <span className="block text-sm text-muted-foreground">{item.text}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
