import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Vehicle } from "@/data/vehicles";
import { driveLine, emissionLine, formatPrice, specLine, vehicleTitle } from "@/lib/format";
import { fallbackImage } from "@/lib/images";

interface Props {
  vehicle: Vehicle;
  onInquire: (v: Vehicle) => void;
  /** Eager-load above-the-fold cards */
  priority?: boolean;
}

export function VehicleCard({ vehicle: v, onInquire, priority }: Props) {
  const [src, setSrc] = useState(v.image);
  const title = vehicleTitle(v);

  return (
    <article className="lift group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-line">
        <img
          src={src}
          alt={`${title} ${v.variant}`.trim()}
          width={640}
          height={480}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => src !== fallbackImage(v.id) && setSrc(fallbackImage(v.id))}
          className="zoom size-full object-cover"
        />
        {(!v.ez || v.fuel === "Hybrid") && (
          <div className="absolute left-3 top-3 flex gap-1">
            {!v.ez && <Badge>Neu</Badge>}
            {v.fuel === "Hybrid" && <Badge variant="outline">Hybrid</Badge>}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold leading-tight">{title}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-grey">{v.variant}</p>

        <ul className="mt-4 space-y-1 text-sm">
          <li className="font-medium tabular-nums">{specLine(v)}</li>
          <li className="text-grey">{driveLine(v)}</li>
        </ul>

        <div className="mt-auto pt-6">
          <p className="font-display text-3xl font-bold tracking-tight text-brand-ink">{formatPrice(v.price)}</p>
          <p className="mt-2 text-[11px] leading-snug text-grey">{emissionLine(v)}</p>
          <Button className="mt-4 w-full" onClick={() => onInquire(v)} aria-label={`${title} anfragen`}>
            Anfragen
          </Button>
        </div>
      </div>
    </article>
  );
}
