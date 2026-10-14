import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function OldtimerPage() {
  usePageMeta("Oldtimer & Classics | Kallies Automobile Zeitz", "Oldtimer und Classics bei Kallies Automobile in Zeitz – ansehen, anfragen, verkaufen.");
  return (
    <>
      <PageHeader eyebrow="Oldtimer & Classics" title="Automobile mit Geschichte." lead="Oldtimer gehören seit Jahren zu unserem Angebot. Aktuelle Zugänge zeigen wir Ihnen gern persönlich – sprechen Sie uns an." />
      <section className="section">
        <div className="container grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold">Oldtimer suchen?</h2>
            <p className="mt-3 text-grey">Nennen Sie uns Marke, Baujahr und Budget. Wir halten für Sie Ausschau und melden uns, sobald ein passendes Fahrzeug bei uns eintrifft.</p>
            <Button asChild className="mt-6" size="lg"><Link to="/kontakt?betreff=Suchanfrage">Wunschfahrzeug anfragen</Link></Button>
          </div>
          <div className="rounded-lg border border-line bg-white p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold">Oldtimer verkaufen?</h2>
            <p className="mt-3 text-grey">Wir bewerten Ihr Fahrzeug kostenlos und unverbindlich – auch Liebhaberstücke und Fahrzeuge mit Restaurierungsbedarf.</p>
            <Button asChild variant="brand" className="mt-6" size="lg"><Link to="/ankauf">Jetzt bewerten lassen</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
