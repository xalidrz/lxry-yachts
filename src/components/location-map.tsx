"use client";

import { useEffect, useRef, useState } from "react";
import { LocateFixed, Maximize2, Minus, Navigation, Plus, X } from "lucide-react";
import type { Map as MapLibreMap, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { links, site } from "@/config/site";

const { lat, lng } = site.geo;
/** MapLibre zoom 15 shows Esri's most detailed tile level (16) at 1:1, so streets stay crisp. */
const ZOOM = 15;
const START_ZOOM = 12;
const PLUS = site.address.plusCode.split(" ")[0];
const ADDRESS = `${site.address.street}, ${site.address.city}`;

const bg = { id: "bg", type: "background", paint: { "background-color": "#0e0f11" } } as const;
const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas";
const ESRI_ATTRIBUTION = "Esri, HERE, Garmin, &copy; OpenStreetMap contributors";

/** Esri "World Dark Gray" base and street-name reference tiles: free, no API key. */
const esriStyle: StyleSpecification = {
  version: 8,
  sources: {
    esri: {
      type: "raster",
      tiles: [`${ESRI}/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}`],
      tileSize: 256,
      maxzoom: 16,
      attribution: ESRI_ATTRIBUTION,
    },
    "esri-labels": {
      type: "raster",
      tiles: [`${ESRI}/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}`],
      tileSize: 256,
      maxzoom: 16,
    },
  },
  layers: [bg, { id: "esri", type: "raster", source: "esri" }, { id: "esri-labels", type: "raster", source: "esri-labels" }],
};

/** Backup if Esri tiles cannot be loaded: standard OpenStreetMap tiles, darkened with plain colour operations on the canvas (see .osm-dark in globals.css). */
const osmStyle: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      maxzoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
    },
  },
  layers: [bg, { id: "osm", type: "raster", source: "osm" }],
};

const pill =
  "grid size-10 place-items-center rounded-full border border-line bg-graphite text-ink hover:border-signal focus-visible:border-signal";
const chip = "border border-line bg-graphite px-2.5 py-1.5";

/**
 * Dark map centred on the shop: target reticle, crosshair lines, corner chips, zoom controls.
 * `full` is the expanded version (drag and scroll-zoom on, address chip); the inline one opens it on click.
 */
function MapView({ full = false, onExpand }: { full?: boolean; onExpand?: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const hLine = useRef<HTMLDivElement>(null);
  const vLine = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [failed, setFailed] = useState(false);
  const [drawn, setDrawn] = useState(full);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let cancelled = false;
    let map: MapLibreMap | null = null;
    let inView = full;
    let zoomed = full;
    let tilesOk = false;
    let errors = 0;
    let provider: "esri" | "osm" = "esri";
    const timers: ReturnType<typeof setTimeout>[] = [];

    const giveUp = () => !cancelled && !tilesOk && setFailed(true);
    const tilesFailed = () => {
      if (cancelled || tilesOk) return;
      if (provider === "esri" && map) {
        provider = "osm";
        tilesOk = false;
        errors = 0;
        el.classList.add("osm-dark");
        map.setStyle(osmStyle);
        timers.push(setTimeout(() => !tilesOk && giveUp(), 9000));
      } else giveUp();
    };

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
          style: esriStyle,
          center: [lng, lat],
          zoom: full || reduce ? ZOOM : START_ZOOM,
          minZoom: 10,
          maxZoom: full ? 18 : 17,
          attributionControl: false,
          dragRotate: false,
          pitchWithRotate: false,
          touchPitch: false,
          scrollZoom: full,
          // Inline on phones: one finger scrolls the page, two move the map.
          cooperativeGestures: !full && coarse,
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
          if ("tile" in e && e.tile) tilesOk = true;
        });
        m.on("error", () => {
          if (!tilesOk && ++errors >= 4) tilesFailed();
        });
        if (!full && onExpand) {
          m.getCanvas().style.cursor = "pointer";
          m.on("click", onExpand);
        }
        timers.push(setTimeout(() => !tilesOk && tilesFailed(), 9000));
        requestAnimationFrame(() => m.resize());
        placeLines();
        intro();
      } catch {
        setFailed(true);
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
    if (!full) view.observe(el);

    return () => {
      cancelled = true;
      near.disconnect();
      view.disconnect();
      timers.forEach(clearTimeout);
      map?.remove();
      mapRef.current = null;
    };
    // onExpand is a stable setter wrapper from the parent; the map is created once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full]);

  const zoomBy = (d: number) => mapRef.current?.zoomTo(mapRef.current.getZoom() + d, { duration: 300 });
  const recenter = () => mapRef.current?.easeTo({ center: [lng, lat], zoom: ZOOM, duration: 700 });

  return (
    <div className={full ? "absolute inset-0 bg-graphite" : "relative h-[26rem] overflow-hidden rounded-2xl border border-line bg-graphite sm:h-[32rem] lg:h-full lg:min-h-[38rem]"}>
      {/* MapLibre's stylesheet sets position: relative on its container, so the sizing lives on this wrapper. */}
      <div className="absolute inset-0">
        <div
          ref={box}
          className="h-full w-full"
          role="region"
          aria-label={`Map centred on ${site.address.street}, ${site.address.city}.${full ? "" : " Click to expand."}`}
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

      <div className={`pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2 font-mono text-xs text-ink ${full ? "right-16" : ""}`}>
        {full ? <span className={chip}>{ADDRESS}</span> : null}
        <span className={chip}>{PLUS}</span>
        <span className={`${chip} tabular-nums`}>
          {lat.toFixed(4)}, {lng.toFixed(4)}
        </span>
      </div>

      {!full && !failed ? (
        <button type="button" onClick={onExpand} aria-label="Expand map" className={`${pill} absolute right-3 top-3`}>
          <Maximize2 className="size-4" aria-hidden />
        </button>
      ) : null}

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

/** Inline map. Click it (or the expand button) to open a full-screen version with drag and scroll zoom. */
export function LocationMap() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MapView onExpand={() => setOpen(true)} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className="sr-only">Map of {site.shortName}</DialogTitle>
          <DialogDescription className="sr-only">Drag to move the map and scroll to zoom. Press Escape to close.</DialogDescription>
          {open ? <MapView full /> : null}
          <DialogClose asChild>
            <button type="button" aria-label="Close map" className="absolute right-3 top-3 z-10 grid size-11 place-items-center border border-line bg-graphite text-ink hover:border-signal">
              <X className="size-5" aria-hidden />
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
