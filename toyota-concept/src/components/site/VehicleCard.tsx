import { ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { finder, vehicleImage, type Vehicle } from "@/data/content";
import { icons } from "./icons";
import { Img } from "./Img";

type Props = { vehicle: Vehicle; checked: boolean; disabled: boolean; onToggle: (id: string) => void };

export function VehicleCard({ vehicle: v, checked, disabled, onToggle }: Props) {
  const Icon = icons[v.badge.icon];
  const cbId = `cmp-${v.id}`;
  const hintId = `${cbId}-hint`;
  return (
    <article
      className="lift flex h-full flex-col overflow-hidden rounded-card border border-line bg-white text-ink hover:border-ink data-[checked=true]:border-ink"
      data-checked={checked}
    >
      <Img
        base={v.image}
        widths={vehicleImage.widths}
        width={vehicleImage.width}
        height={vehicleImage.height}
        alt={v.alt}
        sizes="(min-width: 1024px) 400px, (min-width: 768px) 45vw, 78vw"
      />
      <div className="flex flex-1 flex-col gap-1 p-3">
        <div>
          <h3 className="headline t-h3">{v.name}</h3>
          <p className="t-small text-muted">{v.type}</p>
        </div>
        <p className="font-medium">{v.price}</p>
        <div>
          <Badge>
            <Icon aria-hidden="true" />
            {v.badge.label}
          </Badge>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-2">
          <div className="flex items-center gap-1">
            <Checkbox id={cbId} checked={checked} disabled={disabled} onCheckedChange={() => onToggle(v.id)} aria-describedby={disabled ? hintId : undefined} />
            <Label htmlFor={cbId} className={disabled ? "text-muted" : "cursor-pointer"}>
              {finder.compareLabel}
              <span className="sr-only"> {v.name}</span>
            </Label>
            {disabled && (
              <span id={hintId} className="sr-only">
                {finder.compareLimit}
              </span>
            )}
          </div>
          <a href="#finder" className="inline-flex items-center gap-0.5 font-medium underline decoration-1 underline-offset-[6px] hover:decoration-2">
            {finder.build}
            <span className="sr-only"> {v.name}</span>
            <ArrowRight className="size-[16px]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
