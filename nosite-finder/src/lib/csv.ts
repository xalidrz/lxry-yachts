import type { Lead } from "./types";

/** Quote a cell, and defuse spreadsheet formulas (=, @, and +/- that are not phone numbers). */
function cell(value: string | number | undefined): string {
  let s = value === undefined ? "" : String(value);
  if (/^[=@\t\r]/.test(s) || (/^[+-]/.test(s) && !/^[+-]?[\d\s().-]+$/.test(s))) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export function leadsToCsv(leads: Lead[]): string {
  const header = ["Name", "Status", "Category", "Phone", "Other phones", "Address", "City searched", "Country", "Latitude", "Longitude", "OpenStreetMap link", "Saved"];
  const rows = leads.map((l) => [
    l.name,
    l.status,
    l.category,
    l.phone,
    l.phones?.slice(1).join("; "),
    l.address,
    l.city,
    l.country,
    l.lat,
    l.lon,
    `https://www.openstreetmap.org/${l.id}`,
    new Date(l.savedAt).toISOString().slice(0, 10),
  ]);
  return [header, ...rows].map((r) => r.map(cell).join(",")).join("\r\n");
}

export function downloadCsv(filename: string, csv: string): void {
  // BOM so Excel reads UTF-8 names correctly
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
