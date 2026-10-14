import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { WerkstattGrid } from "@/components/sections/WerkstattGrid";
import { Standort } from "@/components/sections/Standort";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function WerkstattPage() {
  usePageMeta("Werkstattservice | Kallies Automobile Zeitz", "HU/AU, Reifenwechsel, Reparatur und Nissan-Vertragswerkstatt in Zeitz.");
  return (
    <>
      <PageHeader eyebrow="Werkstattservice" title="Ihr Auto in guten Händen." lead="HU/AU, Reifenwechsel, Reparatur und Service für Nissan – bei uns in Zeitz.">
        <Button asChild variant="brand" size="lg">
          <Link to="/kontakt?betreff=Werkstatttermin">Termin anfragen</Link>
        </Button>
      </PageHeader>
      <h2 className="sr-only">Unsere Leistungen</h2>
      <WerkstattGrid withHeading={false} />
      <Standort />
    </>
  );
}
