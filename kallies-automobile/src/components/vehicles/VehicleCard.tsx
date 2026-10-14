import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Vehicle } from "@/data/vehicles";
import { useI18n } from "@/i18n";
import { fallbackImage } from "@/lib/images";
import { cn } from "@/lib/utils";

interface Props {
  vehicle: Vehicle;
  onInquire: (v: Vehicle) => void;
  /** Eager-load above-the-fold cards */
  priority?: boolean;
}

/** Card-shaped placeholder with a slow shimmer sweep; shown while routes and photos load. */
export function VehicleCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card" aria-hidden>
      <div className="shimmer aspect-[4/3]" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="shimmer h-6 w-2/3 rounded-sm" />
        <div className="shimmer h-4 w-1/2 rounded-sm" />
        <div className="shimmer mt-3 h-4 w-3/4 rounded-sm" />
        <div className="shimmer h-4 w-1/2 rounded-sm" />
        <div className="shimmer mt-6 h-9 w-1/2 rounded-sm" />
        <div className="shimmer mt-4 h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function VehicleCard({ vehicle: v, onInquire, priority }: Props) {
  const { t, fmt } = useI18n();
  const [src, setSrc] = useState(v.image);
  const [loaded, setLoaded] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const title = fmt.title(v);

  // A cached image can finish loading before React attaches onLoad.
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <article className="lift group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card">
      <div className={cn("relative aspect-[4/3] overflow-hidden bg-line", !loaded && "shimmer")}>
        <img
          ref={img}
          src={src}
          alt={`${title} ${v.variant}`.trim()}
          width={640}
          height={480}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => {
            const fb = fallbackImage(v.id);
            if (src !== fb) setSrc(fb);
          }}
          className={cn("zoom size-full object-cover transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
        />
        {(!v.ez || v.fuel === "Hybrid") && (
          <div className="absolute left-3 top-3 flex gap-1">
            {!v.ez && <Badge>{t.vehicle.new}</Badge>}
            {v.fuel === "Hybrid" && <Badge variant="outline">{t.vehicle.hybrid}</Badge>}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold leading-tight" translate="no">{title}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-grey" translate="no" lang="de">{v.variant}</p>

        <ul className="mt-4 space-y-1 text-sm">
          <li className="font-medium">{fmt.spec(v)}</li>
          <li className="text-grey">{fmt.drive(v)}</li>
        </ul>

        <div className="mt-auto pt-6">
          <p className="font-display text-3xl font-bold tracking-tight text-brand-ink" translate="no">{fmt.price(v.price)}</p>
          <span className="price-bar" aria-hidden />
          <p className="mt-2 text-[11px] leading-snug text-grey">{fmt.emission(v)}</p>
          <Button className="mt-4 w-full" onClick={() => onInquire(v)} aria-label={t.vehicle.inquireAria(title)}>
            {t.vehicle.inquire}
          </Button>
        </div>
      </div>
    </article>
  );
}
