import { Mail, MapPin, Phone, Smartphone } from "lucide-react";

import {
  ADDRESS_LINES,
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
export function ContactDetails({ tone = "light" }: { tone?: Tone }) {
  const link = linkClass[tone];
  const icon = "size-[18px]";

  return (
    <ul className="space-y-5">
      <Row tone={tone} label="Address" icon={<MapPin className={icon} aria-hidden="true" />}>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(link, "inline-block")}
        >
          {ADDRESS_LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="sr-only">(opens Google Maps in a new tab)</span>
        </a>
      </Row>

      <Row tone={tone} label="Office" icon={<Phone className={icon} aria-hidden="true" />}>
        <a href={`tel:${OFFICE_PHONE.tel}`} className={link}>
          {OFFICE_PHONE.display}
        </a>
        <p className={tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground"}>
          {FAX.label}: {FAX.display}
        </p>
      </Row>

      <Row tone={tone} label="Mobile" icon={<Smartphone className={icon} aria-hidden="true" />}>
        {MOBILES.map((m) => (
          <p key={m.tel}>
            <a href={`tel:${m.tel}`} className={link}>
              {m.display}
            </a>
          </p>
        ))}
      </Row>

      <Row tone={tone} label="Email" icon={<Mail className={icon} aria-hidden="true" />}>
        {EMAILS.map((e) => (
          <p key={e.address} className="break-words">
            <span className={tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground"}>
              {e.label}:{" "}
            </span>
            <a href={`mailto:${e.address}`} className={link}>
              {e.address}
            </a>
          </p>
        ))}
      </Row>
    </ul>
  );
}
