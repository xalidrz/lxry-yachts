/** Local, license-safe stand-ins used whenever a listing photo cannot be loaded. */
const FALLBACKS = ["/images/car-night.webp", "/images/car-hatch.webp", "/images/car-suv.webp", "/images/magazin-tesla.webp", "/images/magazin-gelaende.webp"];

export const fallbackImage = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return FALLBACKS[h % FALLBACKS.length];
};
