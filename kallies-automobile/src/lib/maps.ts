/**
 * Destination for every directions link.
 * Coordinates are approximate (Am Herrmannschacht 1, 06712 Zeitz) and MUST be verified in Google Maps by the
 * dealer: right-click the entrance → copy the lat/lng shown, then update LAT and LNG below.
 */
export const LAT = 51.0548;
export const LNG = 12.1063;

export const ADDRESS_TEXT = "Kallies Automobile e.K., Am Herrmannschacht 1, 06712 Zeitz";

/** Google Maps: opens the app on phones when installed, otherwise the browser; start = visitor's location. */
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;
export const APPLE_MAPS_URL = `https://maps.apple.com/?daddr=${LAT},${LNG}&dirflg=d`;
export const OSM_URL = `https://www.openstreetmap.org/directions?to=${LAT},${LNG}`;
