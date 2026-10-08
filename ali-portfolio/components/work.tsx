import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrowserFrame } from "@/components/browser-frame";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/site";

type Project = (typeof projects)[number];

function ProjectCard({ p, featured = false }: { p: Project; featured?: boolean }) {
  return (
    <article
      className={cn(
        "group h-full rounded-3xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(24,24,27,0.25)] sm:p-6",
        featured ? "grid items-center gap-8 lg:grid-cols-12 lg:gap-12 lg:p-8" : "flex flex-col gap-6",
      )}
    >
      <div className={cn(featured && "lg:col-span-7")}>
        <BrowserFrame
          src={p.image}
          alt={`${p.name} website screenshot`}
          url={p.href.replace("https://", "")}
          sizes={featured ? "(min-width: 1024px) 640px, 92vw" : "(min-width: 1024px) 520px, (min-width: 768px) 45vw, 92vw"}
          imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className={cn("flex flex-1 flex-col px-1 pb-2 sm:px-2 lg:pb-0", featured && "lg:col-span-5")}>
        <div>
          <Badge variant={p.badge === "Preview" ? "default" : "outline"}>{p.badge}</Badge>
        </div>
        <h3 className={cn("mt-4 font-bold", featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl")}>{p.name}</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <li key={t}>
              <Badge variant="outline">{t}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-7">
          <Button asChild>
            <a href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${p.name} live (opens in a new tab)`}>
              View live
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading eyebrow="Work" title="Recent work" intro="Open any project and click around. Each one is built mobile-first." />

      <div className="mt-12 space-y-8 lg:space-y-10">
        <Reveal>
          <ProjectCard p={featured} featured />
        </Reveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {rest.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 90} className="h-full">
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
