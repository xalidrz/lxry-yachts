"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Navigation, Plus, LocateFixed } from "lucide-react";
import type { Map as MapLibreMap, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Button } from "@/components/ui/button";
import { links, site } from "@/config/site";

const { lat, lng } = site.geo;
const ZOOM = 16;
const START_ZOOM = 13;
const PLUS = site.address.plusCode.split(" ")[0];

/** CARTO dark-matter raster tiles: free, no API key. Attribution is shown on the map. */
const style: StyleSpecification = {
  version: 8,
  sources: {
    carto: {
      type: "raster",
      tiles: ["a", "b", "c", "d"].map((s) => `https://${s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png`),
      tileSize: 256,
      maxzoom: 20,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>',
    },
  },
  layers: [
    { id: "bg", type: "background", paint: { "background-color": "#0e0f11" } },
    { id: "carto", type: "raster", source: "carto" },
  ],
};

const pill =
  "grid size-10 place-items-center rounded-full border border-line bg-graphite text-ink hover:border-signal focus-visible:border-signal";

/** Dark map centred on the shop with a target-reticle marker, crosshair lines and corner chips. */
export function LocationMap() {
  const box = useRef<HTMLDivElement>(null);
  const hLine = useRef<HTMLDivElement>(null);
  const vLine = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [failed, setFailed] = useState(false);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let cancelled = false;
    let map: MapLibreMap | null = null;
    let inView = false;
    let zoomed = false;
    let tilesOk = false;
    let errors = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const fail = () => !cancelled && !tilesOk && setFailed(true);

    const placeLines = () => {
      if (!map) return;
      const p = map.project([lng, lat]);
      if (hLine.current) hLine.current.style.top = `${Math.round(p.y)}px`;
      if (vLine.current) vLine.current.style.left = `${Math.round(p.x)}px`;
    };
    const intro = () => {
      if (!map || !inView || zoomed) return;
      zoomed = true;
      setDrawn(true);
      if (!reduce) map.easeTo({ zoom: ZOOM, duration: 1800, easing: (t) => 1 - Math.pow(1 - t, 3) });
    };

    const create = async () => {
      try {
        const maplibregl = await import("maplibre-gl");
        if (cancelled) return;
        // The worker is served from /public (see scripts/copy-maplibre-worker.mjs) because bundling breaks its URL.
        maplibregl.setWorkerUrl(`${window.location.origin}/maplibre-gl-worker.mjs`);
        const m = new maplibregl.Map({
          container: el,
          style,
          center: [lng, lat],
          zoom: reduce ? ZOOM : START_ZOOM,
          minZoom: 11,
          maxZoom: 19,
          attributionControl: false,
          dragRotate: false,
          pitchWithRotate: false,
          touchPitch: false,
          scrollZoom: false,
          // On phones one finger scrolls the page and two move the map, so the page never gets stuck.
          cooperativeGestures: coarse,
        });
        map = m;
        mapRef.current = m;
        m.touchZoomRotate.disableRotation();
        m.addControl(new maplibregl.AttributionControl({ compact: false }), "bottom-left");

        const marker = document.createElement("div");
        marker.className = "reticle";
        marker.setAttribute("aria-hidden", "true");
        marker.innerHTML = '<span class="reticle-pulse"></span><span class="reticle-ring"></span><span class="reticle-dot"></span>';
        new maplibregl.Marker({ element: marker, anchor: "center" }).setLngLat([lng, lat]).addTo(m);

        m.on("move", placeLines);
        m.on("resize", placeLines);
        m.on("load", placeLines);
        m.on("sourcedata", (e) => {
          if (e.sourceId === "carto" && "tile" in e && e.tile) tilesOk = true;
        });
        m.on("error", (e) => {
          if ((e as { sourceId?: string }).sourceId === "carto" && !tilesOk && ++errors >= 4) fail();
        });
        // Scroll-zoom is off until the map is clicked, and off again when the pointer leaves.
        m.on("click", () => m.scrollZoom.enable());
        el.addEventListener("mouseleave", () => m.scrollZoom.disable());
        timers.push(setTimeout(fail, 9000));
        placeLines();
        intro();
      } catch {
        fail();
        if (!cancelled) setFailed(true);
      }
    };

    // Build the map shortly before it scrolls into view; zoom in and draw the crosshair once it is mostly visible.
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          near.disconnect();
          void create();
        }
      },
      { rootMargin: "300px" },
    );
    const view = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          inView = true;
          view.disconnect();
          intro();
        }
      },
      { threshold: 0.45 },
    );
    near.observe(el);
    view.observe(el);

    return () => {
      cancelled = true;
      near.disconnect();
      view.disconnect();
      timers.forEach(clearTimeout);
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  const zoomBy = (d: number) => mapRef.current?.zoomTo(mapRef.current.getZoom() + d, { duration: 300 });
  const recenter = () => mapRef.current?.easeTo({ center: [lng, lat], zoom: ZOOM, duration: 700 });

  return (
    <div className="relative h-[26rem] overflow-hidden rounded-2xl border border-line bg-graphite sm:h-[32rem] lg:h-full lg:min-h-[38rem]">
      {/* MapLibre's stylesheet sets position: relative on its container, so the sizing lives on this wrapper. */}
      <div className="absolute inset-0">
        <div
          ref={box}
          className="h-full w-full"
          role="region"
          aria-label={`Map centred on ${site.address.street}, ${site.address.city}. Click the map to enable scroll zoom.`}
        />
      </div>

      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${drawn ? "drawn" : ""}`} aria-hidden>
        <div ref={hLine} className="absolute inset-x-0 top-1/2">
          <div className="xhair xhair-x h-px w-full bg-signal/80" />
        </div>
        <div ref={vLine} className="absolute inset-y-0 left-1/2">
          <div className="xhair h-full w-px bg-signal/80" style={{ transformOrigin: "center" }} />
        </div>
      </div>

      <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2 font-mono text-xs text-ink">
        <span className="border border-line bg-graphite px-2.5 py-1.5">{PLUS}</span>
        <span className="border border-line bg-graphite px-2.5 py-1.5 tabular-nums">
          {lat.toFixed(4)}, {lng.toFixed(4)}
        </span>
      </div>

      {failed ? null : (
        <div className="absolute bottom-3 right-3 flex flex-col gap-2">
          <button type="button" onClick={() => zoomBy(1)} aria-label="Zoom in" className={pill}>
            <Plus className="size-4" aria-hidden />
          </button>
          <button type="button" onClick={() => zoomBy(-1)} aria-label="Zoom out" className={pill}>
            <Minus className="size-4" aria-hidden />
          </button>
          <button type="button" onClick={recenter} aria-label="Recenter on the shop" className={pill}>
            <LocateFixed className="size-4" aria-hidden />
          </button>
        </div>
      )}

      {failed ? (
        <div className="grid-lines absolute inset-0 grid place-items-center bg-graphite p-6 text-center">
          <div>
            <Navigation className="mx-auto size-6 text-signal-bright" aria-hidden />
            <p className="mt-4 font-display text-3xl font-extrabold uppercase leading-none tracking-tight text-ink">{site.shortName}</p>
            <p className="mt-3 text-muted">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </p>
            <p className="mt-2 font-mono text-xs text-muted">The map could not load.</p>
            <div className="mt-6">
              <Button href={links.place} target="_blank" rel="noopener noreferrer" label="Open in Google Maps" className="rounded-full" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
