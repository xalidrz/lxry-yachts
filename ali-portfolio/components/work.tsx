import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrowserFrame } from "@/components/browser-frame";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/site";

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading eyebrow="Work" title="Recent work" intro="Open any project and click around. Each one is built mobile-first." />

      <div className="mt-12 space-y-8 lg:space-y-10">
        {projects.map((p, i) => (
          <Reveal key={p.name}>
            <article className="group grid items-center gap-8 rounded-3xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(24,24,27,0.25)] sm:p-6 lg:grid-cols-12 lg:gap-12 lg:p-8">
              <div className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-2")}>
                <BrowserFrame
                  src={p.image}
                  alt={`${p.name} website screenshot`}
                  url={p.href.replace("https://", "")}
                  sizes="(min-width: 1024px) 640px, 92vw"
                  imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="px-1 pb-2 sm:px-2 lg:col-span-5 lg:pb-0">
                <Badge variant={p.badge === "Concept" ? "outline" : "default"}>{p.badge}</Badge>
                <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{p.name}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t}>
                      <Badge variant="outline">{t}</Badge>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-7">
                  <a href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${p.name} live (opens in a new tab)`}>
                    View live
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
