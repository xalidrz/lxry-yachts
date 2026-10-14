import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/data/site";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";

export default function KarrierePage() {
  const { t } = useI18n();
  const p = t.pages.karriere;
  usePageMeta(t.meta.karriere.title, t.meta.karriere.desc);
  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="display-2">{p.h2}</h2>
          <p className="mt-5 text-lg leading-relaxed text-grey">{p.text}</p>
          <Button asChild variant="brand" size="lg" className="mt-8">
            <a href={`mailto:${site.email}?subject=${encodeURIComponent(p.subject)}`}><Mail aria-hidden /> {p.cta}</a>
          </Button>
        </div>
      </section>
    </>
  );
}
