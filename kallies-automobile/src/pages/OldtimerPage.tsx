import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";

export default function OldtimerPage() {
  const { t } = useI18n();
  const p = t.pages.oldtimer;
  usePageMeta(t.meta.oldtimer.title, t.meta.oldtimer.desc);
  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
      <section className="section">
        <div className="container grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold">{p.searchTitle}</h2>
            <p className="mt-3 text-grey">{p.searchText}</p>
            <Button asChild className="mt-6" size="lg"><Link to="/kontakt?betreff=Suchanfrage">{p.searchCta}</Link></Button>
          </div>
          <div className="rounded-lg border border-line bg-white p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold">{p.sellTitle}</h2>
            <p className="mt-3 text-grey">{p.sellText}</p>
            <Button asChild variant="brand" className="mt-6" size="lg"><Link to="/ankauf">{p.sellCta}</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
