import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";

/** Title band at the top of inner pages. Holds the page's single h1. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="bg-carbon border-b border-white/10 pb-12 pt-36 sm:pb-16 sm:pt-44">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} intro={intro} />
        </Reveal>
      </div>
    </header>
  );
}
