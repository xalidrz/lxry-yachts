import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Seite nicht gefunden | Kallies Automobile");
  return (
    <>
      <PageHeader eyebrow="Fehler 404" title="Diese Seite gibt es nicht." lead="Vielleicht finden Sie Ihr Wunschauto in unserem Fahrzeugbestand." />
      <section className="section">
        <div className="container flex flex-wrap gap-3">
          <Button asChild variant="brand" size="lg"><Link to="/fahrzeuge">Fahrzeuge ansehen</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/">Zur Startseite</Link></Button>
        </div>
      </section>
    </>
  );
}
