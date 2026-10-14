import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/data/site";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function KarrierePage() {
  usePageMeta("Karriere | Kallies Automobile Zeitz", "Wir wachsen: Direkt bewerben bei Kallies Automobile in Zeitz.");
  return (
    <>
      <PageHeader eyebrow="Karriere" title="Wir wachsen. Wachsen Sie mit." lead="Als inhabergeführter Familienbetrieb pflegen wir einen familiären Umgang miteinander. Bewerben Sie sich direkt bei uns." />
      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="display-2">Ihr Weg ins Team</h2>
          <p className="mt-5 text-lg leading-relaxed text-grey">
            Ob Verkauf, Werkstatt oder Verwaltung: Schicken Sie uns Ihre Bewerbung per E-Mail. Aktuelle Stellen und Ansprechpartner besprechen wir gern persönlich.
          </p>
          <Button asChild variant="brand" size="lg" className="mt-8">
            <a href={`mailto:${site.email}?subject=Bewerbung`}><Mail aria-hidden /> Direkt bewerben</a>
          </Button>
        </div>
      </section>
    </>
  );
}
