import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { WerkstattGrid } from "@/components/sections/WerkstattGrid";
import { Standort } from "@/components/sections/Standort";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";

export default function WerkstattPage() {
  const { t } = useI18n();
  const p = t.werkstatt.page;
  usePageMeta(t.meta.werkstatt.title, t.meta.werkstatt.desc);
  return (
    <>
      <PageHeader image="/images/werkstatt-photo.webp" light eyebrow={p.eyebrow} title={p.title} lead={p.lead}>
        <Button asChild variant="brand" size="lg">
          <Link to="/kontakt?betreff=Werkstatttermin">{p.cta}</Link>
        </Button>
      </PageHeader>
      <h2 className="sr-only">{p.srHeading}</h2>
      <WerkstattGrid withHeading={false} />
      <Standort />
    </>
  );
}
