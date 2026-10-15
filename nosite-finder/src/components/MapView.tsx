import { useEffect, useRef } from "react";
import L from "leaflet";
import { telHref, whatsappHref } from "@/lib/phone";
import { buildPitch } from "@/lib/pitch";
import { verifyHref } from "@/components/LeadCard";
import type { Business } from "@/lib/types";

interface Props {
  businesses: Business[];
  center: { lat: number; lon: number };
  radiusKm: number;
  savedIds: Set<string>;
}

function link(label: string, href: string, external = true): HTMLAnchorElement {
  const a = document.createElement("a");
  a.textContent = label;
  a.href = href;
  if (external) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }
  a.style.cssText =
    "display:inline-flex;align-items:center;min-height:40px;padding:0 12px;border-radius:8px;border:1px solid hsl(240 4% 22%);color:#fff;text-decoration:none;font-weight:500;font-size:15px;background:hsl(240 6% 12%)";
  return a;
}

function popupFor(b: Business): HTMLElement {
  const root = document.createElement("div");
  root.style.minWidth = "200px";
  const name = document.createElement("div");
  name.textContent = b.name;
  name.style.cssText = "font-weight:700;font-size:17px;line-height:1.25;margin-bottom:2px";
  const meta = document.createElement("div");
  meta.textContent = b.category;
  meta.style.cssText = "color:hsl(160 84% 55%);font-size:14px;margin-bottom:6px";
  root.append(name, meta);
  if (b.address) {
    const addr = document.createElement("div");
    addr.textContent = b.address;
    addr.style.cssText = "color:hsl(240 5% 68%);font-size:14px;margin-bottom:8px";
    root.append(addr);
  }
  const row = document.createElement("div");
  row.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;margin-top:6px";
  if (b.phone) {
    const call = link(`Call ${b.phone}`, telHref(b.phone), false);
    call.style.background = "hsl(160 84% 39%)";
    call.style.color = "hsl(240 10% 3.5%)";
    call.style.borderColor = "hsl(160 84% 39%)";
    row.append(call);
    const wa = whatsappHref(b.phone, b.countryCode, buildPitch(b.name));
    if (wa) row.append(link("WhatsApp", wa));
  }
  row.append(link("Verify", verifyHref(b)));
  root.append(row);
  return root;
}

export function MapView({ businesses, center, radiusKm, savedIds }: Props) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!elRef.current) return;
    const map = L.map(elRef.current, { zoomControl: true, preferCanvas: true }).setView([center.lat, center.lon], 12);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();

    const area = L.circle([center.lat, center.lon], {
      radius: radiusKm * 1000,
      color: "#10b981",
      weight: 1,
      opacity: 0.7,
      fillColor: "#10b981",
      fillOpacity: 0.04,
      interactive: false,
    }).addTo(layer);
    L.marker([center.lat, center.lon], {
      icon: L.divIcon({ className: "", html: '<div class="nsf-centre"></div>', iconSize: [14, 14], iconAnchor: [7, 7] }),
      interactive: false,
      keyboard: false,
    }).addTo(layer);

    for (const b of businesses) {
      L.marker([b.lat, b.lon], {
        title: b.name,
        icon: L.divIcon({
          className: "",
          html: `<div class="nsf-marker${savedIds.has(b.id) ? " is-lead" : ""}"></div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 26],
          popupAnchor: [0, -26],
        }),
      })
        .bindPopup(() => popupFor(b), { maxWidth: 280, autoPanPaddingTopLeft: [16, 16], autoPanPaddingBottomRight: [16, 90] })
        .addTo(layer);
    }

    if (businesses.length) {
      map.fitBounds(L.latLngBounds(businesses.map((b) => [b.lat, b.lon] as [number, number])).pad(0.15), { maxZoom: 16 });
    } else {
      map.fitBounds(area.getBounds());
    }
  }, [businesses, center, radiusKm, savedIds]);

  return (
    <div className="overflow-hidden rounded-lg border border-border shadow-card">
      <div ref={elRef} className="h-[62dvh] min-h-[380px] w-full" role="application" aria-label="Map of businesses without a website" />
    </div>
  );
}
