import { Mail, MapPin, Phone, Smartphone } from "lucide-react";

import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import {
  ADDRESS_LINES,
  ADDRESS_LINES_AR,
  EMAILS,
  FAX,
  GOOGLE_MAPS_URL,
  MOBILES,
  OFFICE_PHONE,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

const linkClass = {
  light:
    "text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-brand hover:decoration-brand",
  dark: "text-on-dark underline decoration-white/30 underline-offset-4 transition-colors duration-150 hover:decoration-white",
} as const;

function Row({
  icon,
  label,
  tone,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  tone: Tone;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span
        className={cn(
          "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full",
          tone === "dark" ? "bg-white/10 text-on-dark" : "bg-muted text-brand-grey",
        )}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p
          className={cn(
            "text-xs font-semibold tracking-[0.12em] uppercase",
            tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground",
          )}
        >
          {label}
        </p>
        <div className="space-y-0.5 leading-snug">{children}</div>
      </div>
    </li>
  );
}

/** Address, phones, fax and emails. Every phone number and email is tappable. */
export function ContactDetails({
  tone = "light",
  locale = "en",
}: {
  tone?: Tone;
  locale?: Locale;
}) {
  const t = getDictionary(locale).contact;
  const addressLines = locale === "ar" ? ADDRESS_LINES_AR : ADDRESS_LINES;
  const emailLabels: Record<string, string> = { Sales: t.sales, Import: t.import, General: t.general };
  const link = linkClass[tone];
  const icon = "size-[18px]";

  return (
    <ul className="space-y-5">
      <Row tone={tone} label={t.address} icon={<MapPin className={icon} aria-hidden="true" />}>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(link, "inline-block")}
        >
          {addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="sr-only">{t.opensMaps}</span>
        </a>
      </Row>

      <Row tone={tone} label={t.office} icon={<Phone className={icon} aria-hidden="true" />}>
        <a href={`tel:${OFFICE_PHONE.tel}`} dir="ltr" className={cn(link, "inline-block")}>
          {OFFICE_PHONE.display}
        </a>
        <p className={tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground"}>
          {t.fax}: <span dir="ltr">{FAX.display}</span>
        </p>
      </Row>

      <Row tone={tone} label={t.mobile} icon={<Smartphone className={icon} aria-hidden="true" />}>
        {MOBILES.map((m) => (
          <p key={m.tel}>
            <a href={`tel:${m.tel}`} dir="ltr" className={cn(link, "inline-block")}>
              {m.display}
            </a>
          </p>
        ))}
      </Row>

      <Row tone={tone} label={t.email} icon={<Mail className={icon} aria-hidden="true" />}>
        {EMAILS.map((e) => (
          <p key={e.address} className="break-words">
            <span className={tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground"}>
              {emailLabels[e.label] ?? e.label}:{" "}
            </span>
            <a href={`mailto:${e.address}`} dir="ltr" className={cn(link, "inline-block")}>
              {e.address}
            </a>
          </p>
        ))}
      </Row>
    </ul>
  );
}
