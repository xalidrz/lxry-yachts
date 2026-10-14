import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";

export default function NotFound() {
  const { t } = useI18n();
  const p = t.pages.notFound;
  usePageMeta(t.meta.notFound.title);
  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
      <section className="section">
        <div className="container flex flex-wrap gap-3">
          <Button asChild variant="brand" size="lg"><Link to="/fahrzeuge">{p.cars}</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/">{p.home}</Link></Button>
        </div>
      </section>
    </>
  );
}
