// MapLibre's web worker cannot be resolved once the app is bundled, so serve it as a static file
// and point MapLibre at it with setWorkerUrl(). Runs after `npm install` (and so on Vercel).
import { copyFileSync, mkdirSync } from "node:fs";

try {
  mkdirSync("public", { recursive: true });
  copyFileSync("node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs", "public/maplibre-gl-worker.mjs");
} catch (e) {
  console.warn("Could not copy the MapLibre worker:", e.message);
}
