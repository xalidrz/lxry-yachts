import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { postMeta } from "@/data/content";
import { useI18n } from "@/i18n";

export function PostCard({ index }: { index: number }) {
  const { t, fmt } = useI18n();
  const meta = postMeta[index];
  const post = t.magazin.posts[index];
  return (
    <article className="lift group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card">
      <Link to="/magazin" className="flex h-full flex-col">
        <div className="aspect-[16/10] overflow-hidden bg-line">
          <img src={meta.image} alt="" width={1000} height={400} loading="lazy" className="zoom size-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-grey">
            <span className="text-brand-ink">{post.category}</span> · <time dateTime={meta.date}>{fmt.date(meta.date)}</time>
          </p>
          <h3 className="mt-3 font-display text-xl font-bold leading-snug">{post.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-grey">{post.excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 group-hover:underline">
            {t.magazin.readMore} <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function MagazinTeaser() {
  const { t } = useI18n();
  return (
    <section className="section bg-white" aria-labelledby="magazin-title">
      <div className="container">
        <img src="/images/magazin-bg.webp" alt="" width={1376} height={768} loading="lazy" className="mb-12 h-48 w-full rounded-lg object-cover object-[50%_55%] sm:h-64 lg:h-80" />
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={t.magazin.eyebrow} title={<span id="magazin-title">{t.magazin.title}</span>} lead={t.magazin.lead} />
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link to="/magazin">
              {t.magazin.all} <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {postMeta.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 0.08} className="h-full">
                <PostCard index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
