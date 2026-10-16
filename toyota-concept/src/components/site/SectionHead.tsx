import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHead({ eyebrow, title, lead, id, className, children }: { eyebrow: string; title: string; lead?: string; id: string; className?: string; children?: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <p className="t-eyebrow text-muted">{eyebrow}</p>
      <h2 id={id} className="headline t-h2">
        {title}
      </h2>
      {lead && <p className="t-lead text-muted">{lead}</p>}
      {children}
    </div>
  );
}
