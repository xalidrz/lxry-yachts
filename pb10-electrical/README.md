# PB10 Electrical + Wedding Lighting Decor — website

Single-page site for an Edmonton electrician that also does wedding and event lighting decor. React 18, Vite,
Tailwind CSS, shadcn/ui (Radix) components, Framer Motion and Lucide icons (the only icon set). Dark theme only,
in the logo's near-black + lightning-orange + deep-red palette. Fonts (Alfa Slab One, Barlow Condensed, Inter) are
self-hosted through `@fontsource`, so there are no Google Fonts requests.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then outputs ./dist (deploy this folder)
npm run preview    # serve the production build locally
```

Deploy as its own project (e.g. on Vercel with **Root Directory = `pb10-electrical`**, framework Vite, build `npm run build`,
output `dist`). The repo root hosts a different, static site.

## Things to set before launch

| What | Where |
| --- | --- |
| Phone, address, rating, social links, Google reviews link | `src/lib/site.ts` (everything reads from here) |
| **Quote form delivery** | env vars `VITE_FORM_ENDPOINT` and/or `VITE_CONTACT_EMAIL` (see below) |
| Site URL for SEO / social previews | `VITE_SITE_URL` (copy `.env.example` → `.env`) |
| "Read all reviews on Google" link | `googleReviewsUrl` in `src/lib/site.ts` — currently a Google Maps search; swap in the direct review link |
| Facebook / Instagram | `site.social` in `src/lib/site.ts` — currently the platforms' home pages |

### Contact form
There is no backend, so the form needs somewhere to send submissions:

1. **`VITE_FORM_ENDPOINT`** — create a free form on Formspree / Web3Forms / Getform and paste its URL. The form POSTs JSON
   (`name, phone, email, service, eventDate, message`) and shows a success message.
2. **`VITE_CONTACT_EMAIL`** — fallback when no endpoint is set: opens the visitor's email app with the request filled in.
3. With neither set, submitting shows "Online requests aren't switched on yet — please call +1 780-802-0014".

### Photos
All photography lives in `/public/photos` and is listed in `src/data/gallery.ts` (gallery grid + lightbox),
`src/data/services.ts` (wedding card headers) and the hero (`src/components/sections/Hero.tsx`).

To add or replace photos, drop the originals in a folder, add them to the `files`/`frames` maps in
`scripts/process-photos.mjs`, then run:

```bash
npm run photos -- /path/to/originals [/path/to/video-frames]
```

This writes web-sized WebP files (`<name>.webp` for the hero/lightbox, `<name>-sm.webp` for the grid), and prints each
file's dimensions to copy into `gallery.ts`.

Current photos: six wedding/house-lighting photos supplied by the business, and five electrical stills cut from a
walkthrough video of a finished home (feature-wall lighting, chandelier, stair step lights, vanity lights). The electrical
side would benefit from more photos of everyday jobs (panels, EV chargers, pot lights, basements).

### Logo and brand assets
`npm run brand` rebuilds `public/logo.png` (full logo, dark backdrop keyed out), `public/logo-wordmark.png` (lettering
only, used in the navbar), the favicon / touch icon and the social-share card from `scripts/logo-source.png`.

## What's where

- `src/components/sections/` — Hero, Electrical, Wedding, Gallery (+ lightbox), HowItWorks, Reviews, WhyChoose, Contact
- `src/components/BoltIntro.tsx` — the lightning strike on page load; the Hero "switches on" when it lands
- `src/components/FairyLights.tsx` — twinkling particles (wedding section only)
- `src/components/ui/` — shadcn-style Button, Input/Textarea, Label, Select, Dialog, Sheet

## Motion and accessibility
- Animation uses `LazyMotion` (small bundle). With `prefers-reduced-motion` the bolt intro is skipped, the hero starts
  lit, the fairy lights are a still frame and scroll reveals don't move.
- Hero halves expand on hover/focus (mouse) or tap (touch); the lightbox supports arrow keys, swipe and Esc.
- The Google Map loads lazily as an iframe.
