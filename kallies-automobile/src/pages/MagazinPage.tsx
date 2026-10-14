import { PageHeader } from "@/components/PageHeader";
import { PostCard } from "@/components/sections/MagazinTeaser";
import { Reveal } from "@/lib/motion";
import { postMeta } from "@/data/content";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";

export default function MagazinPage() {
  const { t } = useI18n();
  usePageMeta(t.meta.magazin.title, t.meta.magazin.desc);
  return (
    <>
      <PageHeader eyebrow={t.magazin.eyebrow} title={t.magazin.page.title} lead={t.magazin.page.lead} />
      <section className="section">
        <h2 className="sr-only">{t.magazin.recent}</h2>
        <ul className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {postMeta.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <PostCard index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
