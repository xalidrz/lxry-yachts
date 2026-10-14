import { useState, type MouseEvent } from "react";
import { Check, ChevronDown, Copy, Map as MapIcon, MapPin, Navigation, Compass } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/toast";
import { useI18n } from "@/i18n";
import { ADDRESS_TEXT, APPLE_MAPS_URL, DIRECTIONS_URL, OSM_URL } from "@/lib/maps";
import { cn } from "@/lib/utils";

interface Props {
  /** Visible text of the main link; defaults to "Route planen". */
  label?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  /** Hide the "Weitere Optionen" text on tight layouts (the popover button stays labelled for screen readers). */
  compact?: boolean;
}

/**
 * Main directions link + "Weitere Optionen" popover.
 * The link is a plain <a href target="_blank"> and works without JavaScript. With JavaScript, a click that
 * does not open a tab (popup blocker) opens the popover instead, so the visitor always has a way to continue.
 */
export function DirectionsActions({ label, variant = "default", size = "default", className, compact }: Props) {
  const { t } = useI18n();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const text = label ?? t.directions.plan;

  const onMainClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // let the browser handle modified clicks
    e.preventDefault();
    const w = window.open(DIRECTIONS_URL, "_blank");
    if (w) {
      w.opener = null;
      return;
    }
    setBlocked(true);
    setOpen(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS_TEXT);
    } catch {
      try {
        const ta = Object.assign(document.createElement("textarea"), { value: ADDRESS_TEXT });
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        ta.remove();
        if (!ok) throw new Error("copy failed");
      } catch {
        toast(t.directions.copyFailed);
        return;
      }
    }
    setCopied(true);
    toast(t.directions.copied);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const options = [
    { name: t.directions.google, href: DIRECTIONS_URL, icon: Navigation },
    { name: t.directions.apple, href: APPLE_MAPS_URL, icon: MapIcon },
    { name: t.directions.osm, href: OSM_URL, icon: Compass },
  ];

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setBlocked(false);
      }}
    >
      <PopoverAnchor asChild>
        <div className={cn("flex flex-wrap items-stretch gap-2", className)}>
          <Button asChild variant={variant} size={size} className="group">
            <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" aria-label={t.directions.aria(text)} onClick={onMainClick}>
              <Navigation className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              {text}
            </a>
          </Button>
          <PopoverTrigger asChild>
            <Button variant={variant} size={size} className={compact ? "px-3" : undefined}>
              <span className={compact ? "sr-only" : undefined}>{t.directions.more}</span>
              <ChevronDown aria-hidden />
            </Button>
          </PopoverTrigger>
        </div>
      </PopoverAnchor>
      <PopoverContent>
        {blocked && <p className="px-3 pb-2 pt-1 text-sm text-grey">{t.directions.blocked}</p>}
        <ul>
          {options.map((o) => (
            <li key={o.name}>
              <a
                href={o.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.directions.optionAria(o.name)}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-line/60"
              >
                <o.icon className="size-4 text-brand-ink" aria-hidden />
                {o.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-1 border-t border-line pt-1">
          <button type="button" onClick={copy} className="flex min-h-11 w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-line/60">
            {copied ? <Check className="size-4 text-brand-ink" aria-hidden /> : <Copy className="size-4 text-brand-ink" aria-hidden />}
            {t.directions.copy}
          </button>
          <p className="flex gap-3 px-3 pb-2 pt-1 text-xs text-grey">
            <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            <span translate="no">{ADDRESS_TEXT}</span>
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
