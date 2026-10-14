# Kallies Automobile — Redesign

Premium redesign of [kallies-automobile.de](https://kallies-automobile.de) (Autohaus Zeitz). Content in German, same business and pages.

**Stack:** React 18 · Vite · Tailwind CSS 3 · shadcn/ui (Radix) · Lucide icons (the only icon set) · React Router. Fonts (Schibsted Grotesk, Inter) are self-hosted via `@fontsource`, so no request goes to Google Fonts.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, outputs ./dist
npm run preview
```

Deploy with the Vercel project root set to `kallies-automobile/` (`vercel.json` adds the SPA rewrite and cache headers).

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#0B0D10` | header, footer, dark panels, body text |
| `paper` | `#F6F6F4` | page background |
| `brand` | `#F2790F` | CTAs, active states (fills, with `ink` text — 7:1) |
| `brand-ink` | `#B34700` | prices and accent text on light backgrounds (5:1 on `paper`) |
| `grey` | `#5A5F66` | secondary text (6:1 on `paper`) |
| `line` | `#DEDFDB` | 1px dividers, borders |

Tokens live in `src/index.css` (RGB channels) and `tailwind.config.ts`. No blur, `backdrop-filter` or glass anywhere; scrims are plain gradients. Axe-core (WCAG 2.1 AA + best practice) reports no violations on every page at 1440 px and 390 px.

Motion is limited to scroll-reveal (`components/Reveal.tsx`), card hover lift, and image zoom on hover; all of it is disabled under `prefers-reduced-motion`.

## Structure

```
src/
  components/ui/        shadcn primitives (button, input, select, checkbox, slider, accordion, sheet, carousel …)
  components/sections/  home sections: Hero, QuickSearch, FeaturedOffers, BrandStrip, AnkaufPanel, WerkstattGrid,
                        WhyKallies, Finanzierung, Reviews, Standort, MagazinTeaser, Faq
  components/vehicles/  VehicleCard, VehicleFilters, InquiryDialog
  components/forms/     Field, ConsentCheck, FormNotice
  data/                 site.ts (contact, nav), content.ts (reviews, services, posts, FAQ), vehicles.json (stock)
  lib/                  inventory.ts (filter/sort/URL state, featured picker), forms.ts, format.ts
  pages/                one file per route
```

Routes: `/`, `/fahrzeuge` (filters sync to the URL, e.g. `?marke=Nissan&modell=Qashqai&preisBis=30000&kraftstoff=Hybrid`), `/harley-davidson`, `/oldtimer`, `/marken`, `/ankauf`, `/werkstattservice`, `/karriere`, `/magazin`, `/kontakt`, `/ueber-uns`, `/impressum`, `/datenschutz`, `/agb`.

## Data

`src/data/vehicles.json` is a snapshot of the 67 vehicles on the live site (title, spec line, price, CO₂ values, listing photo URL; colour and equipment come from each detail page — about 24 listings publish no colour). Swap it for a feed or API later; `Vehicle` in `src/data/vehicles.ts` is the contract.

"Angebote der Woche" never renders an empty state: curated ids (`FEATURED_IDS`) are used first and back-filled from stock by best price per PS (`pickFeatured`). The inventory page has its own graceful no-results state with a reset and highlights.

## Before launch

- **Listing photos** are hot-linked from the dealer's image CDN (`img.classistatic.de`). If one fails to load, a local stand-in photo is shown. Host or proxy the images yourself for a production site.
- **Hero and magazine photos** are the dealer's own editorial images at 1000 px wide. Replace `public/images/hero.webp` with a 2400 px+ photo for a sharper full-bleed hero.
- **Reviews** in `src/data/content.ts` are placeholder text (flag `REVIEWS_ARE_PLACEHOLDER` shows a note). Replace with the real Google/Trustindex reviews (4,7/5, 623).
- **Forms** (inquiry, valuation, contact) have no backend. With `VITE_FORM_ENDPOINT` set they POST JSON there; without it they open a prefilled email to `info@automobile-kallies.de`, so nothing is ever reported as sent that was not.
- **Impressum, Datenschutz, AGB** are placeholders — paste the operator's legal texts.
- The map embed loads only after a click (DSGVO).
- Magazine cards link to `/magazin`; article pages are not part of this redesign.
