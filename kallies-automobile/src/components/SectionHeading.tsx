import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, lead, align = "left", className, as: Tag = "h2" }: Props) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Tag className="display-2">{title}</Tag>
      {lead && <p className="mt-5 text-lg leading-relaxed text-grey [.on-dark_&]:text-white/75">{lead}</p>}
    </div>
  );
}
