import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gold } from "@/components/SectionHeading";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { projects } from "@/data/projects";
import { usePageMeta } from "@/lib/seo";

type Filter = "All" | "Ongoing" | "Completed";
const filters: Filter[] = ["All", "Ongoing", "Completed"];

export default function ProjectsPage() {
  usePageMeta("/projects");
  const [filter, setFilter] = useState<Filter>("All");
  const list = projects.filter((p) => filter === "All" || p.status === filter);
  const count = (f: Filter) => projects.filter((p) => f === "All" || p.status === f).length;

  return (
    <>
      <PageHeader
        eyebrow="Ongoing & Completed Projects"
        title={
          <>
            Our work, <Gold>standing tall</Gold>
          </>
        }
        description="A look at what we are building right now and what we have already handed over to happy owners."
        crumbs={[{ label: "Projects" }]}
        image="/images/proj-heights.svg"
      />

      <section className="bg-ink py-16 sm:py-20" aria-label="Projects">
        <div className="container">
          <div role="group" aria-label="Filter projects" className="mb-12 flex flex-wrap gap-3">
            {filters.map((f) => (
              <Button key={f} variant="chip" size="sm" data-active={filter === f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f} <span className="opacity-60">({count(f)})</span>
              </Button>
            ))}
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3" key={filter}>
            {list.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.1}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Your project could be <Gold>next.</Gold>
          </>
        }
        text="Tell us about your plot or property and we will arrange a free site visit."
        interest="Construction"
        message="I'd like to discuss a construction project."
      />
    </>
  );
}
