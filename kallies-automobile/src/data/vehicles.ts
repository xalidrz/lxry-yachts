import raw from "./vehicles.json";

export type Fuel = "Benzin" | "Diesel" | "Hybrid";
export type Gearbox = "Automatik" | "Schaltgetriebe";

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  variant: string;
  /** null = Neufahrzeug ohne Erstzulassung */
  ez: { month: number; year: number } | null;
  km: number;
  ps: number;
  fuel: Fuel;
  gearbox: Gearbox;
  doors: string;
  price: number;
  consumption: number | null;
  co2: number | null;
  co2Class: string | null;
  color: string | null;
  features: string[];
  image: string;
  source: string;
}

/** Real stock exported from the current kallies-automobile.de inventory (67 vehicles). */
export const vehicles = raw as Vehicle[];

/** Ids shown first in "Angebote der Woche". Anything missing is back-filled automatically (see lib/inventory.ts). */
export const FEATURED_IDS: string[] = [
  "mercedes-benz-sl-43-amg-9203",
  "porsche-911-urmodell-top-zust-bose-tvkd-neu-9040",
  "nissan-micra-1-hand-alufelgen-klima-sitzhzg-9211",
  "kia-xceed-spirit-9224",
];
