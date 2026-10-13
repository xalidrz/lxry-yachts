import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

/** "01 — " numbered label plus the section's h2. */
export function SectionHead({
  n,
  title,
  intro,
  className,
  as: Tag = "h2",
}: {
  n: string;
  title: string;
  intro?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal eager={Tag === "h1"} className={cn("max-w-3xl", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal-bright">{n} —</p>
      <Tag className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-ink sm:text-6xl lg:text-7xl">
        {title}
      </Tag>
      {intro ? <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{intro}</p> : null}
    </Reveal>
  );
}
