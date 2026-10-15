import { Ban, Circle, Reply, Send, Trophy, type LucideIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Status looks: only the emerald accent and neutrals, told apart by icon and intensity. */
export const STATUS_STYLE: Record<LeadStatus, { icon: LucideIcon; text: string; chip: string }> = {
  New: { icon: Circle, text: "text-muted-foreground", chip: "border-border text-muted-foreground" },
  Contacted: { icon: Send, text: "text-emerald-300", chip: "border-emerald-500/40 text-emerald-300" },
  Replied: { icon: Reply, text: "text-emerald-200", chip: "border-emerald-400/60 bg-emerald-500/15 text-emerald-200" },
  Won: { icon: Trophy, text: "text-primary-foreground", chip: "border-primary bg-primary text-primary-foreground" },
  "Not interested": { icon: Ban, text: "text-muted-foreground", chip: "border-border text-muted-foreground line-through decoration-muted-foreground/60" },
};

export function StatusSelect({ value, onChange, saved, className }: { value: LeadStatus; onChange: (s: LeadStatus) => void; saved: boolean; className?: string }) {
  const Icon = STATUS_STYLE[value].icon;
  return (
    <Select value={value} onValueChange={(v) => onChange(v as LeadStatus)}>
      <SelectTrigger aria-label="Lead status" className={cn(saved ? "border-primary/40" : "", className)}>
        <span className="flex min-w-0 items-center gap-2">
          <Icon className={cn("size-4 shrink-0", STATUS_STYLE[value].text === "text-primary-foreground" ? "text-primary" : STATUS_STYLE[value].text)} />
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent>
        {LEAD_STATUSES.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
