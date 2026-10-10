# CH Real Estate & Builder's — website

Multi-page luxury real-estate + construction site. React 18, Vite, Tailwind CSS, shadcn/ui (Radix) components,
Framer Motion and Lucide icons (the only icon set used). Dark theme only, branded in the logo's gold + charcoal.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check → build → per-page HTML (see "SEO"), outputs ./dist
npm run preview    # serve the production build locally
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero search, featured properties, services, process, projects, why choose us, converter |
| `/buy`, `/rent` | Full listings with filters (area, type, size, budget) and sorting — filters live in the URL, e.g. `/buy?type=plot&budget=b2` |
| `/property/:id` | Property detail page with specs, features, enquiry buttons and similar listings |
| `/construction` | The four services in depth, build process, FAQ |
| `/projects` | All projects, filterable by Ongoing / Completed |
| `/about` | Story, what we do, why choose us, areas served |
| `/contact` | Enquiry form (pre-filled via `?interest=…&message=…`), details and map |
| `/marla-converter` | Marla ↔ Kanal ↔ sq ft converter plus a quick-reference size chart |
| anything else | 404 page |

Routing is React Router; every page except Home is code-split.

## What to replace before launch

| What | Where |
| --- | --- |
| Phone, WhatsApp, email, address, hours, social links | `src/lib/site.ts` (everything reads from here) |
| Property listings (**currently sample data**, 12 entries) — each `id` becomes `/property/<id>` | `src/data/properties.ts` |
| Projects (**currently sample data**) | `src/data/projects.ts` |
| Construction service copy | `src/data/services.ts` |
| FAQ, About text | `src/pages/ConstructionPage.tsx`, `src/pages/About.tsx` |
| Page titles + meta descriptions | `src/data/seo.json` |
| Placeholder artwork | `public/images/*` — swap in real photos and update the `image` paths in the data files and the hero `src` in `src/components/sections/Hero.tsx` |
| Site URL for SEO / social previews | set `VITE_SITE_URL` in `.env` (e.g. `https://yourdomain.com`, no trailing slash) before building |
| Social links | `site.social` in `src/lib/site.ts` (currently point to the platforms' home pages) |

### About the placeholder images
The hero, property and project images are generated illustrations in the brand palette (`npm run placeholders`
regenerates them from `scripts/generate-placeholders.mjs`). They are stand-ins only — real photography will lift the
site considerably. The OG/social card, favicon and apple-touch icon are generated from the real logo.

### About the logo
`public/logo.png` is the supplied logo, extracted from the mockup image onto a transparent background
(`scripts/logo-source.png` is the full-size copy). The source artwork was only ~200 px wide, so it is soft when shown
large (footer). If you have the original vector / high-resolution logo, drop it in as `public/logo.png`.

## Closing and reopening the site
The whole site can be switched to a public **"We're closed for now"** page with one setting, `VITE_SITE_CLOSED`:

| Value | Result |
| --- | --- |
| `true` (current default in `.env`) | **Every URL** (`/`, `/buy`, `/property/…`, anything) shows a single branded closed page with WhatsApp, phone, email and address. The build contains none of the site's pages or data (~60 KB JS), is marked `noindex, nofollow`, and writes no per-page HTML or sitemap. |
| `false` | The full website. |

- **On Vercel:** set an environment variable `VITE_SITE_CLOSED` = `false` (or `true`) in Project Settings → Environment
  Variables, then redeploy. A real environment variable overrides `.env`, so no code change is needed to open or close.
- **Locally:** edit `.env`, or run `VITE_SITE_CLOSED=false npm run build`.
- The closed page lives in `src/ClosedApp.tsx`; the wording is easy to change there.
- Limits of static hosting: the closed page is served with HTTP 200 (not 503) and `noindex` keeps it out of search results.
  This is a public "closed" notice, **not access control** — it does not password-protect anything. If you need the
  site to be private, use Vercel's Password Protection / Vercel Authentication instead.

## Deploying (Vercel)
`vercel.json` pins the build (`npm run build` → `dist`) and sets `cleanUrls` plus an SPA fallback, so `/buy`,
`/property/villa-10m` etc. all work as direct links and on refresh. Set **Root Directory** to `ch-real-estate`. The site currently ships in **closed** mode (see above) — set
`VITE_SITE_CLOSED=false` when you are ready to launch.
Any static host works if it serves `<route>.html` for `/<route>` and falls back to `index.html` for unknown paths.

## SEO
Static routes get their own `<title>`, description, canonical and social tags in the **HTML itself**: after
`vite build`, `scripts/prerender.mjs` writes `dist/buy.html`, `dist/about.html`, … from `src/data/seo.json`.
Property pages set their tags client-side. If `VITE_SITE_URL` is set, it also writes `sitemap.xml` (including every
property) and adds it to `robots.txt`. Unknown URLs return the app's 404 view with `noindex` (HTTP 200 — a limit of
static hosting).

## Behaviour notes
- **Contact form** has no backend: on submit it validates, then opens WhatsApp (`wa.me`) with the enquiry pre-filled.
  To email instead, replace the `window.open(...)` call in `src/components/sections/Contact.tsx` with a POST to a form
  service (Formspree, Web3Forms, your own API).
- **Hero search** sends the visitor to `/buy` or `/rent` with the chosen filters applied. The **Build** tab sends them
  to `/contact` with a pre-filled construction quote request. "Request a quote" buttons and property "Book a visit"
  buttons pre-fill the same form.
- **Marla converter**: 1 Marla = 225 sq ft, 1 Kanal = 20 Marla (change the two constants in
  `src/components/sections/Converter.tsx` if your area uses a different Marla).
- Map is a keyless Google Maps embed of the office address, darkened with a CSS filter. For an exact pin, replace
  `mapEmbedSrc` in `src/lib/site.ts` with the "Embed a map" URL from Google Maps.
- Respects `prefers-reduced-motion`.
