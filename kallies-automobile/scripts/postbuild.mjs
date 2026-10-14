// Turns the SPA build into a real multipage site: one index.html per route with its own <title>/description,
// so every URL is a standalone page that works on a hard load, in search results and without a rewrite.
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const dist = new URL("../dist/", import.meta.url);
const base = readFileSync(new URL("index.html", dist), "utf8");
const D = "Kallies Automobile Zeitz";

const pages = {
  fahrzeuge: ["Fahrzeugbestand", "Alle Fahrzeuge aus unserem Autohaus in Zeitz – filtern nach Marke, Preis, Kraftstoff und mehr."],
  oldtimer: ["Oldtimer & Classics", "Oldtimer und Classics bei Kallies Automobile in Zeitz – ansehen, anfragen, verkaufen."],
  "harley-davidson": ["Harley-Davidson", "Harley-Davidson im Bestand bei Kallies Automobile in Zeitz."],
  marken: ["Marken im Bestand", "Nissan, Renault, Dacia, Mercedes-Benz, Volkswagen, Kia, Ford, Opel und mehr."],
  ankauf: ["Auto verkaufen – Gebrauchtwagen-Ankauf", "Verkaufen Sie Ihr Auto sicher, einfach und schnell: kostenlose Online-Bewertung, faire Preise, Abmeldung inklusive."],
  werkstattservice: ["Werkstattservice", "HU/AU, Reifenwechsel, Reparatur und Nissan-Vertragswerkstatt in Zeitz."],
  karriere: ["Karriere", "Wir wachsen: Direkt bewerben bei Kallies Automobile in Zeitz."],
  magazin: ["Kallies Magazin", "Kaufberatung, Ankauf-Tipps und aktuelle Themen rund um Mobilität."],
  kontakt: ["Kontakt", "Telefon +49 3441 86030, E-Mail, Öffnungszeiten und Anfahrt."],
  "ueber-uns": ["Über uns", "Inhabergeführtes Familienunternehmen seit 1995."],
  impressum: ["Impressum", "Angaben gemäß § 5 DDG."],
  datenschutz: ["Datenschutz", "Informationen zur Verarbeitung Ihrer Daten."],
  agb: ["AGB", "Allgemeine Geschäftsbedingungen."],
};

const render = (title, desc, extra = "") =>
  base
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/s, `$1${desc}$2`)
    .replace("</head>", `${extra}</head>`);

for (const [route, [title, desc]] of Object.entries(pages)) {
  mkdirSync(new URL(`${route}/`, dist), { recursive: true });
  writeFileSync(new URL(`${route}/index.html`, dist), render(`${title} | ${D}`, desc));
}
writeFileSync(new URL("404.html", dist), render(`Seite nicht gefunden | ${D}`, "Diese Seite gibt es nicht.", '<meta name="robots" content="noindex" />'));
console.log(`postbuild: ${Object.keys(pages).length} pages + 404`);
