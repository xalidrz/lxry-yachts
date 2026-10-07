import { Briefcase, Camera, Music2, Play, Users, type LucideIcon } from "lucide-react";

import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { SOCIAL_LINKS } from "@/lib/site";

/**
 * Lucide has no brand logos, so each network gets a neutral Lucide symbol with
 * the network name as its accessible label.
 */
const icons: Record<(typeof SOCIAL_LINKS)[number]["platform"], LucideIcon> = {
  facebook: Users,
  instagram: Camera,
  linkedin: Briefcase,
  youtube: Play,
  tiktok: Music2,
};

/** Social icons for the footer. Only accounts with a url in lib/site.ts are shown. */
export function SocialLinks({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const active = SOCIAL_LINKS.filter((s) => s.url.trim() !== "");
  if (active.length === 0) return null;

  return (
    <div>
      <p className="font-display mb-3 text-sm font-bold tracking-[0.14em] text-on-dark-muted uppercase">
        {t.footer.followUs}
      </p>
      <ul className="flex flex-wrap gap-2">
        {active.map(({ platform, url }) => {
          const Icon = icons[platform];
          const name = t.footer.social[platform];
          return (
            <li key={platform}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                title={name}
                className="flex size-11 items-center justify-center rounded-full bg-white/10 text-on-dark transition-colors duration-150 hover:bg-brand"
              >
                <Icon className="size-5" aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
