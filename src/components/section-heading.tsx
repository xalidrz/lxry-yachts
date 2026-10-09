import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="font-display text-sm font-bold uppercase tracking-[0.28em] text-signal">{eyebrow}</p>
      <Tag className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl lg:text-6xl">
        {title}
      </Tag>
      {intro ? <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p> : null}
    </div>
  );
}
