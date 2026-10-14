import type { Vehicle } from "@/data/vehicles";

const nf = new Intl.NumberFormat("de-DE");
export const formatNumber = (n: number) => nf.format(n);
/** Non-breaking spaces keep "2.390 €" and "114.355 km" from wrapping apart. */
export const formatPrice = (n: number) => `${nf.format(n)}\u00A0€`;
export const formatKm = (n: number) => `${nf.format(n)}\u00A0km`;

export const formatEz = (v: Vehicle) => (v.ez ? `${String(v.ez.month).padStart(2, "0")}/${v.ez.year}` : "Neu");
export const vehicleTitle = (v: Vehicle) => `${v.make} ${v.model}`.trim();

/** "09/2008 · 114.355 km · 69 PS" */
export const specLine = (v: Vehicle) => `${formatEz(v)} · ${formatKm(v.km)} · ${v.ps}\u00A0PS`;
/** "Benzin · Schaltgetriebe" */
export const driveLine = (v: Vehicle) => `${v.fuel} · ${v.gearbox}`;

/** Small-print CO₂ line, only with the values we actually have (PKW-EnVKV). */
export const emissionLine = (v: Vehicle) => {
  const parts: string[] = [];
  if (v.consumption != null) parts.push(`Kraftstoffverbrauch (komb.): ${String(v.consumption).replace(".", ",")} l/100 km`);
  if (v.co2 != null) parts.push(`CO₂-Emissionen (komb.): ${v.co2} g/km`);
  if (v.co2Class) parts.push(`CO₂-Klasse: ${v.co2Class}`);
  return parts.length ? parts.join("; ") : "Verbrauchs- und CO₂-Werte auf Anfrage.";
};
