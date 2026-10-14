import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { posts, type Post } from "@/data/content";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="lift group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card">
      <Link to="/magazin" className="flex h-full flex-col">
        <div className="aspect-[16/10] overflow-hidden bg-line">
          <img src={post.image} alt="" width={1000} height={400} loading="lazy" className="zoom size-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-grey">
            <span className="text-brand-ink">{post.category}</span> · {post.date}
          </p>
          <h3 className="mt-3 font-display text-xl font-bold leading-snug">{post.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-grey">{post.excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 group-hover:underline">
            Weiterlesen <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function MagazinTeaser() {
  return (
    <section className="section bg-white" aria-labelledby="magazin-title">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Kallies Magazin"
            title={<span id="magazin-title">Wissen rund ums Auto</span>}
            lead="Kaufberatung, Ankauf-Tipps und aktuelle Themen aus der Welt der Mobilität."
          />
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link to="/magazin">
              Zum Magazin <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 90} className="h-full">
                <PostCard post={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
