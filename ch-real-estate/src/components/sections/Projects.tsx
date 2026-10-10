import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { Gold, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";

export function Projects() {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 440), behavior: "smooth" });
  };

  // Mouse drag-to-scroll (touch & trackpads already scroll natively)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { down: true, x: e.clientX, left: track.current.scrollLeft, moved: false };
    track.current.style.scrollSnapType = "none";
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down || !track.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    track.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
    if (track.current) track.current.style.scrollSnapType = "";
  };

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20 border-y border-gold/15 bg-surface py-28">
      <div className="container">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="projects-title"
            align="left"
            className="mb-0 md:mb-0"
            eyebrow="Ongoing & Completed Projects"
            title={
              <>
                Our work, <Gold>standing tall</Gold>
              </>
            }
            description="A look at what we are building and what we have already handed over."
          />
          <Reveal className="hidden gap-3 md:flex" delay={0.15}>
            <Button variant="outline" size="icon" aria-label="Previous projects" onClick={() => scrollBy(-1)}>
              <ArrowLeft />
            </Button>
            <Button variant="outline" size="icon" aria-label="Next projects" onClick={() => scrollBy(1)}>
              <ArrowRight />
            </Button>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <div
          ref={track}
          tabIndex={0}
          role="region"
          aria-label="Projects gallery — scroll horizontally"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={(e) => drag.current.moved && (e.preventDefault(), (drag.current.moved = false))}
          className="scrollbar-gold flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-8 active:cursor-grabbing gutter-x"
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} className="w-[78vw] max-w-[400px] shrink-0 snap-start sm:w-[360px] lg:w-[390px]" />
          ))}
        </div>
      </Reveal>

      <div className="container mt-6 text-center">
        <Button asChild size="lg" variant="outline">
          <Link to="/projects">
            View all projects <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
