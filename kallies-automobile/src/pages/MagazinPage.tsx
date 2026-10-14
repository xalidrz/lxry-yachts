import { PageHeader } from "@/components/PageHeader";
import { PostCard } from "@/components/sections/MagazinTeaser";
import { Reveal } from "@/components/Reveal";
import { posts } from "@/data/content";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function MagazinPage() {
  usePageMeta("Kallies Magazin | Kallies Automobile Zeitz", "Kaufberatung, Ankauf-Tipps und aktuelle Themen rund um Mobilität.");
  return (
    <>
      <PageHeader eyebrow="Kallies Magazin" title="Wissen rund ums Auto." lead="Welches Zubehör ist das richtige? Was ist im Straßenverkehr zu beachten? Kaufberatung und aktuelle Themen – mit Fokus auf geländegängige Fahrzeuge." />
      <section className="section">
        <h2 className="sr-only">Aktuelle Beiträge</h2>
        <ul className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <PostCard post={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
