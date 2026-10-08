import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  id?: string;
  className?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={cn("mb-14 max-w-3xl md:mb-16", center && "mx-auto text-center", className)}>
      <p className={cn("label mb-5 flex items-center gap-4 text-sm text-gold", center && "justify-center")}>
        <span className="h-px w-10 bg-gold/60" aria-hidden />
        {eyebrow}
        {center && <span className="h-px w-10 bg-gold/60" aria-hidden />}
      </p>
      <h2 id={id} className="text-[clamp(2rem,4.6vw,3.4rem)] text-cream">
        {title}
      </h2>
      {description && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{description}</p>}
    </Reveal>
  );
}

/** Key headline words get the gold gradient — use sparingly. */
export const Gold = ({ children }: { children: ReactNode }) => <span className="text-gold-gradient">{children}</span>;
