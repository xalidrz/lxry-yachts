import { CircleCheck, Hammer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

export function ProjectCard({ p, className }: { p: Project; className?: string }) {
  return (
    <article
      className={cn(
        "group relative aspect-[4/5] overflow-hidden border border-gold/20 bg-ink transition-all duration-500 hover:border-gold/80 hover:shadow-gold-glow",
        className,
      )}
    >
      <img
        src={p.image}
        alt={`${p.name} — ${p.detail}`}
        width={640}
        height={800}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="size-full select-none object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <Badge variant={p.status === "Completed" ? "solid" : "outline"} className="absolute left-5 top-5">
        {p.status === "Completed" ? <CircleCheck className="size-3.5" /> : <Hammer className="size-3.5" />}
        {p.status}
      </Badge>
      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="label mb-2 text-[0.8rem] text-gold-light">{p.detail}</p>
        <h3 className="text-[1.7rem] text-cream">{p.name}</h3>
        <p className="mt-1.5 text-[0.95rem] text-muted-foreground">{p.location}</p>
      </div>
    </article>
  );
}
