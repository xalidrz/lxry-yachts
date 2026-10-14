import { PageHeader } from "@/components/PageHeader";
import { site } from "@/data/site";
import { usePageMeta } from "@/hooks/usePageMeta";

const pages = {
  "ueber-uns": {
    title: "Über uns",
    lead: "Inhabergeführt, familiär, seit 1995.",
    body: [
      "Die Firma Kallies Automobile e.K. ist ein inhabergeführtes Familienunternehmen mit geballter Erfahrung in den Bereichen Automobilhandel, Gebrauchtwagen-Ankauf und Werkstattservice.",
      "Seit dem Jahr 1995 sind wir das freie Autohaus für den Verkauf von Neu-, Gebrauchtwagen und Nutzfahrzeugen mit Fokus auf die Marken Nissan, Renault und Dacia. Mit unserem Ehrgeiz wecken wir jeden Tag die Begeisterung am Thema Mobilität.",
      "Unsere Kunden stehen bei uns im Mittelpunkt. Wir möchten, dass jeder unserer Kunden unser Autohaus glücklich verlässt.",
    ],
  },
  impressum: {
    title: "Impressum",
    lead: "Angaben gemäß § 5 DDG.",
    body: [
      `${site.legalName}, ${site.address.street}, ${site.address.zip} ${site.address.city}`,
      `Telefon: ${site.phone} · E-Mail: ${site.email}`,
      "Weitere Pflichtangaben (Inhaber, Umsatzsteuer-ID, Handelsregister, Aufsichtsbehörde) bitte aus dem bestehenden Impressum übernehmen und hier ergänzen.",
    ],
  },
  datenschutz: {
    title: "Datenschutz",
    lead: "Informationen zur Verarbeitung Ihrer Daten.",
    body: [
      "Platzhalter: Die rechtsverbindliche Datenschutzerklärung des Betreibers ist hier einzufügen.",
      "Hinweis zur Technik dieser Seite: Schriften werden lokal ausgeliefert (keine Verbindung zu Google Fonts). Die Karte wird erst nach Ihrem Klick von Google Maps geladen. Formulare öffnen Ihr E-Mail-Programm oder werden – sofern konfiguriert – an den eingerichteten Formular-Dienst übertragen.",
    ],
  },
  agb: {
    title: "AGB",
    lead: "Allgemeine Geschäftsbedingungen.",
    body: ["Platzhalter: Die geltenden Allgemeinen Geschäftsbedingungen des Betreibers sind hier einzufügen."],
  },
} as const;

export type LegalSlug = keyof typeof pages;

export default function LegalPage({ slug }: { slug: LegalSlug }) {
  const p = pages[slug];
  usePageMeta(`${p.title} | Kallies Automobile Zeitz`, p.lead);
  return (
    <>
      <PageHeader title={p.title} lead={p.lead} />
      <section className="section">
        <div className="container max-w-3xl space-y-5 text-lg leading-relaxed text-grey">
          {p.body.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </section>
    </>
  );
}
