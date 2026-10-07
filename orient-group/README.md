# Orient Group Gulf website

Product reference site for Orient Group Gulf General Trading Co. (Shuwaikh Industrial Area, Kuwait).
No cart, no checkout: every product has an **Ask for price** button that opens WhatsApp with the product name pre-filled.

Next.js (App Router) · Tailwind CSS 4 · shadcn/ui-style components · Lucide icons · Archivo + Source Sans 3.

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # static build, every page prerendered in English and Arabic
npm run lint && npm run typecheck
```

## Deploy on Vercel

This folder lives inside a repo that also holds another site, so in Vercel set **Root Directory = `orient-group`** (framework preset: Next.js, no other settings).
Environment variables (see `.env.example`):

- `NEXT_PUBLIC_SITE_URL`: the live domain. Drives canonical URLs, `sitemap.xml`, `robots.txt` and Open Graph tags. Default `https://orientgroupkwt.com`.
- `NEXT_PUBLIC_ALLOW_INDEXING`: **the site is NOT indexable by default.** Unless this is exactly `true`, every page gets `<meta name="robots" content="noindex, nofollow">` and `robots.txt` returns `Disallow: /`. Set it to `true` when the site goes live. Both variables are read at build time, so redeploy after changing them.

## Adding or editing a product

Everything is in **`data/products.ts`**. Add one entry to the `products` array (fields are documented at the top of the file). The product page, category listing, search, related products, sitemap and SEO tags all update on the next build.

Photos: put the file in `public/products/` and set `image: "/products/<file>.jpg"`. It is shown at 4:3 on light grey, scaled to fit.

## Other things you may want to change

| What | Where |
| --- | --- |
| Phones, emails, address, WhatsApp number, **Google Maps link** | `lib/site.ts` (`GOOGLE_MAPS_URL` is one constant) |
| Brand logos | `data/brands.ts` (add `logo: "/brands/name.svg"`) |
| Categories | `data/categories.ts` |
| Colours (brand tokens, defined once) and fonts | `app/globals.css` (`:root`), `app/layout.tsx` |
| Logo | `public/logo-mark.png` (header) and `public/logo-mark-white.png` (footer, dark background). Read at build time; a text logo shows if a file is missing |
| Favicon | `public/icon.png`, `public/apple-icon.png`, `public/favicon.ico` (OGG monogram) |
| Brand logos | `public/brands/*.png`, wired up in `data/brands.ts` |
| Product photos | `public/products/*.jpg`, set per product with `image` in `data/products.ts`. Products without a photo show a light grey box with the category icon in red and the brand name. Extra photos go in `moreImages` and appear as thumbnails on the product page |
| Arabic / RTL | `lib/i18n.ts` and `components/language-toggle.tsx` (toggle is in place, Arabic side inactive; components use logical start/end spacing) |

Refrigerant gas pages have no specification table: they show "Contact us for specifications, cylinder sizes and availability." with a WhatsApp button (`specs: []` plus `specsPrompt`). The R600 entry reads "R600 / R600a" until the client confirms which he stocks.

Products supplied in several brands use `brand: ANY_BRAND`. Set a real brand name on an entry once it is confirmed.

## Security

The site is a static catalogue: no login, database, forms, uploads or webhooks, and no secrets (the only environment variables are public `NEXT_PUBLIC_*` settings). What is in place:

- Security headers on every response (`next.config.ts`): Content-Security-Policy (same-origin only, no frames, no plugins), `X-Frame-Options: DENY`, `nosniff`, HSTS, Referrer-Policy, Permissions-Policy, COOP. No CORS headers are sent, so the browser blocks cross-origin reads.
- XSS: React escapes all text; the only raw HTML is JSON-LD built from our own data with `<` escaped. Search input is capped at 100 characters and never leaves the browser except URL-encoded into a WhatsApp link.
- Production: no browser source maps, `X-Powered-By` removed, no logging.
- `.env*` files are git-ignored (only `.env.example` is tracked).
- `npm audit --omit=dev`: 0 vulnerabilities. The 5 "high" findings in full `npm audit` are one advisory in `braces`, used only by the ESLint tooling during development; no patched release exists yet.

If an admin area, login or database is added later, it needs its own design: server-side sessions in httpOnly cookies, hashed passwords, email verification, rate limiting, parameterised queries or row-level security, and secrets kept server-side.

## Languages (English and Arabic)

- Every page lives under `/en` or `/ar` (`/en/products`, `/ar/products`). Each language has its own static pages, `lang`/`dir` attributes (Arabic is right-to-left), canonical and hreflang links, and sitemap entries.
- `proxy.ts` redirects a bare URL such as `/` or `/products` to `/en/...`, or to `/ar/...` for visitors who chose Arabic (cookie `ogg-lang`, kept for a year). The `عربي / EN` toggle sets the cookie. Old category URLs (`/products/hvac`) redirect permanently to `/en/categories/hvac` (`next.config.ts`).
- Interface text is in `lib/dictionaries.ts` (one object per language, same shape, so a missing Arabic string fails the type check). Product, category and engraving text is next to its data: add `ar: { name, shortDescription, description, specs? }` inside a product entry in `data/products.ts`. Anything missing falls back to English.
- Arabic uses the Cairo font (`app/[lang]/layout.tsx`). Customer testimonials are shown in their original English on both versions.
- To add the About page project names, put them in `data/projects.ts`; the "Projects we've labelled for" section appears when the list is not empty.

## Content you fill in later

- **Engraving "Sample work" gallery:** drop photos into `public/engraving/`. They appear on the Engraving page (masonry grid with a lightbox) on the next build; with no photos the section is hidden. Describe each photo in `lib/engraving-gallery.ts` (`captions`) for accurate alt text.
- **Opening hours:** the hours on the Contact page are **placeholders**; edit `OPENING_HOURS` in `lib/site.ts` (English and Arabic).
- **Map:** the Contact page embeds Google Maps by address (`GOOGLE_MAPS_EMBED_URL` in `lib/site.ts`); the Content-Security-Policy allows only `https://www.google.com` for frames.
- **About page projects:** `data/projects.ts` (hidden while empty). **About photos:** `public/about/` and `data/about-images.ts`.

## Home page content to confirm

- **Counters** (years in Kuwait, products, brands, gases): `STATS` and `GAS_TYPE_COUNT` in `lib/site.ts`. "15+" and "500+" are placeholders to confirm with the client. The brand count comes from `data/brands.ts`. The final numbers are in the HTML; they count up when scrolled into view.
- **Shop by category tiles:** `data/shop-groups.ts` (photo and which products each tile covers). Tiles link to `/products?group=<key>`. The product list also reads `?category=` and `?q=` from the URL.
- Clicking a product card opens a dialog (photo, brand, short description, WhatsApp button). The card title is still a real link to the product page.

## B2B features

- **Quote basket:** "Add to quote" with a quantity stepper on every product card and product page; the "Quote (n)" button in the navbar (and a floating one on mobile) opens a side drawer. The list is stored in the visitor's browser (`localStorage`, key `ogg-quote-v1`) and sent as a WhatsApp message to the main WhatsApp number (`WHATSAPP_NUMBER` in `lib/site.ts`). There is no payment or checkout. Message format: `lib/quote-message.ts`; intro text: `quote.intro` in `lib/dictionaries.ts`.
- **Mega menu:** "Products" in the navbar lists every group from `data/shop-groups.ts` with its products. On mobile the same groups are an accordion in the menu.
- **FAQ:** questions and answers are in `data/faq.ts` (English and Arabic). `/faq` shows all eight with FAQPage structured data; the home page shows the first three. Opening hours and address in the answers come from `lib/site.ts`.
- **Catalogue PDF:** put the file at `public/catalogue/orient-group-gulf-catalogue.pdf`. The "Download product catalogue (PDF)" links in the footer and on the Contact page appear automatically on the next build; without the file they are hidden.
- **Structured data:** LocalBusiness (with `OPENING_HOURS_SPEC` in `lib/site.ts`, a placeholder like the visible hours), Product (no price), BreadcrumbList and FAQPage.
