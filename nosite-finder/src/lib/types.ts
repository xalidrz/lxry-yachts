export const LEAD_STATUSES = ["New", "Contacted", "Replied", "Won", "Not interested"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** A business from OpenStreetMap that has no website tag. */
export interface Business {
  /** OSM element, e.g. "node/123" — stable across searches. */
  id: string;
  name: string;
  category: string;
  address?: string;
  phone?: string;
  lat: number;
  lon: number;
  /** The city text the user searched, used for the Verify search and the CSV. */
  city: string;
  /** ISO 3166-1 alpha-2, lowercase. Needed to turn local phone numbers into WhatsApp links. */
  countryCode?: string;
  /** Distance from the search centre, km. */
  distanceKm?: number;
}

export interface Lead extends Business {
  status: LeadStatus;
  savedAt: number;
  updatedAt: number;
}

export interface GeocodeResult {
  lat: number;
  lon: number;
  displayName: string;
  countryCode?: string;
  /** Nominatim `type` / `addresstype` and bounding-box size, used to refuse countries and states. */
  placeType?: string;
  addressType?: string;
  bboxKm?: number;
}
