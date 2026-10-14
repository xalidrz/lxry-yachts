import { Award, Gauge, Wrench, CarFront, ShieldCheck, Handshake, Search, type LucideIcon } from "lucide-react";

export interface Review {
  name: string;
  place: string;
  text: string;
  stars: 4 | 5;
}

/**
 * PLACEHOLDER REVIEWS — written for the design. Replace with the real Google / Trustindex
 * reviews before launch. While true, the carousel shows a small note so nothing is passed off as real.
 */
export const REVIEWS_ARE_PLACEHOLDER = true;
export const reviews: Review[] = [
  { name: "Marcel K.", place: "Zeitz", stars: 5, text: "Freundliche Beratung, ehrliche Aussagen zum Fahrzeug und ein fairer Preis. Die Übergabe lief völlig unkompliziert." },
  { name: "Sabine W.", place: "Gera", stars: 5, text: "Mein alter Wagen wurde schnell und transparent bewertet. Abmeldung und Papiere hat das Team komplett übernommen." },
  { name: "Torsten R.", place: "Weißenfels", stars: 5, text: "Große Auswahl, kein Verkaufsdruck. Man merkt, dass hier ein Familienbetrieb mit langer Erfahrung arbeitet." },
  { name: "Anja L.", place: "Leipzig", stars: 4, text: "Die Anreise hat sich gelohnt. Gute Beratung zur Finanzierung und ein Auto, das genau zu meinem Budget passte." },
  { name: "Michael B.", place: "Altenburg", stars: 5, text: "Werkstatttermin kurzfristig bekommen, Reparatur wie besprochen erledigt. Genau so stelle ich mir Service vor." },
  { name: "Claudia H.", place: "Zeitz", stars: 5, text: "Wir kaufen nun schon das zweite Auto hier. Persönlich, verlässlich und immer ein offenes Ohr." },
];

export interface Service {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const services: Service[] = [
  { icon: ShieldCheck, title: "HU / AU", text: "Haupt- und Abgasuntersuchung – schnell erledigt, damit Sie sicher und legal unterwegs sind." },
  { icon: CarFront, title: "Reifenwechsel", text: "Sommer- und Winterreifen fachgerecht montiert, ausgewuchtet und auf Wunsch eingelagert." },
  { icon: Wrench, title: "Reparatur", text: "Von der Inspektion bis zur Instandsetzung: transparente Diagnose, faire Preise, saubere Arbeit." },
  { icon: Gauge, title: "Nissan-Vertragswerkstatt", text: "Fachkundiger Service rund um Ihren Nissan – abgestimmt auf die Anforderungen der Marke." },
];

export const reasons = [
  { icon: Search, title: "Das richtige Auto finden", text: "Egal, ob Neuwagen, Gebrauchtwagen, EU-Fahrzeug oder Oldtimer – bei uns finden Sie das richtige Auto." },
  { icon: Award, title: "Kompetenz seit 1995", text: "Unser Autohandel besteht seit mehr als 29 Jahren. Wir haben seitdem über 10.000 Kunden erfolgreich beraten." },
  { icon: Handshake, title: "Wie eine Familie", text: "Wir sind ein inhabergeführter Familienbetrieb in Mitteldeutschland und pflegen einen familiären Umgang mit Mitarbeitern und Kunden." },
];

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

/** Real post titles/dates from kallies-automobile.de/magazin */
export const posts: Post[] = [
  {
    slug: "suv-verkaufen",
    title: "SUV verkaufen – Wir kaufen Ihren SUV an",
    excerpt: "Der SUV-Markt hat in den letzten Jahren einen bemerkenswerten Aufschwung erlebt. So gehen Sie den Verkauf richtig an.",
    date: "2. Juli 2026",
    category: "Ankauf",
    image: "/images/magazin-suv.webp",
  },
  {
    slug: "tesla-inzahlungnahme",
    title: "Tesla Inzahlungnahme",
    excerpt: "Fahrzeugdaten online eingeben und eine transparente Preiseinschätzung erhalten – kostenfrei und unkompliziert.",
    date: "2. Juli 2026",
    category: "Fahrzeuge",
    image: "/images/magazin-tesla.webp",
  },
  {
    slug: "gelaendewagen-guenstig",
    title: "Die besten Geländewagen für wenig Geld – 7 günstige Modelle",
    excerpt: "Höhere Sitzposition, Allradantrieb, viel Platz: Diese Geländewagen und SUVs bieten viel Auto fürs Geld.",
    date: "7. November 2024",
    category: "Ratgeber",
    image: "/images/magazin-gelaende.webp",
  },
];

export const faqs = [
  {
    q: "Wie läuft der Ankauf meines Autos ab?",
    a: "Sie geben einige Angaben zu Ihrem Fahrzeug in unser Formular ein. Ein Experte bewertet es und meldet sich zeitnah mit einer Preisschätzung. Bei einem Termin in unserer Werkstatt begutachten wir das Auto und unterbreiten Ihnen ein verbindliches Angebot.",
  },
  {
    q: "Wie schnell erhalte ich das Geld beim Verkauf?",
    a: "Sobald der Vertrag in unserem Autohaus unterschrieben ist, wird das Geld sofort überwiesen oder Ihnen bar ausgezahlt. Die Abmeldung und alle Formalitäten übernehmen wir.",
  },
  {
    q: "Welche Fahrzeuge kaufen Sie an?",
    a: "Wir sind an fast jedem Gebrauchtwagen interessiert – für nahezu alle Marken und Modelle, unabhängig vom Zustand. Auch Elektroautos und SUVs gehören dazu.",
  },
  {
    q: "Kann ich mein Auto über Santander finanzieren?",
    a: "Ja. Gemeinsam mit unserem Finanzierungspartner Santander finden wir eine Finanzierung, die zu Ihrem Budget passt. Sprechen Sie uns auf Laufzeit und Anzahlung an – wir beraten Sie persönlich.",
  },
  {
    q: "Kann ich mein altes Auto in Zahlung geben?",
    a: "Ja, die Inzahlungnahme Ihres bisherigen Fahrzeugs ist möglich. Nutzen Sie die Online-Bewertung oder kommen Sie direkt bei uns in Zeitz vorbei.",
  },
  {
    q: "Wann haben Sie geöffnet und wie erreiche ich Sie?",
    a: "Montag bis Freitag von 8:30 bis 18:00 Uhr und samstags von 9:00 bis 12:00 Uhr. Telefonisch erreichen Sie uns unter +49 3441 86030, per E-Mail unter info@automobile-kallies.de.",
  },
];
