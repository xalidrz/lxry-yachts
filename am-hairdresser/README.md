# AM Hairdresser Salon — website

One-page, bilingual (English / Arabic, full RTL) site for AM Hairdresser Salon, a men's barber in Muharraq, Bahrain.
Next.js (App Router) · Tailwind CSS 3 · shadcn/ui-style components (Radix) · framer-motion · Lucide icons (the only icon set).
Fonts (Cormorant Garamond, Inter, Tajawal) are self-hosted through `next/font/local`; no third-party font requests.

```bash
npm install
npm run dev        # http://localhost:3000   (add ?lang=ar for Arabic)
npm run build && npm start
```

## Where to edit things

| What | File |
| --- | --- |
| Phone, WhatsApp, address, plus code, Facebook, map links, **opening / closing time** | `src/data/site.ts` |
| Service prices (`price: ""` shows `BHD —`) | `src/data/services.ts` |
| Gallery photos (`src: null` shows a "Replace with salon photo" tile) | `src/data/gallery.ts` (files in `public/gallery`) |
| Real Google reviews (3 empty slots; empty ones are hidden) | `src/data/reviews.ts` |
| **All text, English + Arabic** (incl. photo captions) | `src/data/translations.ts` |
| Colours / fonts / animations | `tailwind.config.ts`, `src/app/globals.css` |
| Logo | `public/logo.svg` (then `npm run assets` regenerates the PNG logo, favicon, Apple icon and OG image) |

### Things to set before launch
1. **Opening time** — `hours.opensAt` in `src/data/site.ts` is a placeholder (`09:00`). It is only used for the "Open now" badge and the JSON-LD hours; it is never printed on the page.
2. **Google links** — `googleReviewsUrl` and `mapsPlaceUrl` search by name / plus code. Replace them with the salon's own Google Maps "share" link (and the reviews link) when you have it.
3. **Real logo** — `public/logo.svg` is a redraw of the badge (black disc, gold rim, crossed scissors and comb). Drop in the original file under the same name.
4. **Prices and 3 real Google reviews** — see the table above.
5. Set `NEXT_PUBLIC_SITE_URL` in Vercel to the final domain (canonical URL, Open Graph, sitemap, JSON-LD). Without it the Vercel production domain is used.

## How it behaves
- **Language**: toggle in the navbar swaps every string and flips the layout (`dir="rtl"`). Choice is saved in `localStorage`; first visit uses `?lang=` or the browser language. Wide letter-spacing is switched off in Arabic so letters still join.
- **Open now badge**: computed from `Asia/Bahrain` time, refreshed every minute; handles the after-midnight close (12:30 AM).
- **Motion**: hero is CSS-only plus one small canvas of gold specks (paused off-screen, skipped with `prefers-reduced-motion`). Sections reveal with framer-motion (`LazyMotion`, plain divs under reduced motion).
- **Buttons**: one pill system in `src/components/ui/button.tsx` — `primary` (gold border + glow) and `ghost` (glass).
- **SEO**: title, description, Open Graph / Twitter image, canonical, `HairSalon` JSON-LD (address, phone, 4.9 / 83 rating, hours), `robots.txt`, `sitemap.xml`.

## Photos
`npm run assets -- <folder>` resizes originals into `public/gallery` (see `scripts/process-assets.mjs`; the originals are not committed).
Make sure every customer shown in the gallery has agreed to appear on the website.

## Deploy (Vercel)
Create a Vercel project from this repo with **Root Directory = `am-hairdresser`** (framework: Next.js, defaults are fine).
The repo root hosts a different static site.

Local Lighthouse (mobile, simulated throttling): Performance 91–93, Accessibility 100, Best Practices 100, SEO 100.
