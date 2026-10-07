# Orient Group Gulf website

Product reference site for Orient Group Gulf General Trading Co. (Shuwaikh Industrial Area, Kuwait).
No cart, no checkout: every product has an **Ask for price** button that opens WhatsApp with the product name pre-filled.

Next.js (App Router) · Tailwind CSS 4 · shadcn/ui-style components · Lucide icons · Archivo + Source Sans 3.

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # static build, all 44 pages prerendered
npm run lint && npm run typecheck
```

## Deploy on Vercel

This folder lives inside a repo that also holds another site, so in Vercel set **Root Directory = `orient-group`** (framework preset: Next.js, no other settings).
Environment variables (see `.env.example`):

- `NEXT_PUBLIC_SITE_URL`: the live domain. Drives canonical URLs, `sitemap.xml`, `robots.txt` and Open Graph tags. Default `https://orientgroupkwt.com`.
- `NEXT_PUBLIC_ALLOW_INDEXING`: **the site is NOT indexable by default.** Unless this is exactly `true`, every page gets `<meta name="robots" content="noindex, nofollow">` and `robots.txt` returns `Disallow: /`. Set it to `true` when the site goes live. Both variables are read at build time, so redeploy after changing them.

## Adding or editing a product

Everything is in **`data/products.ts`**. Add one entry to the `products` array (fields are documented at the top of the file). The product page, category listing, search, related products, sitemap and SEO tags all update on the next build.

Real photos: put the file in `public/products/` and set `image: "/products/<file>.jpg"`. Until then a branded placeholder shows.

## Other things you may want to change

| What | Where |
| --- | --- |
| Phones, emails, address, WhatsApp number, **Google Maps link** | `lib/site.ts` (`GOOGLE_MAPS_URL` is one constant) |
| Brand logos | `data/brands.ts` (add `logo: "/brands/name.svg"`) |
| Categories | `data/categories.ts` |
| Colours (brand tokens, defined once) and fonts | `app/globals.css` (`:root`), `app/layout.tsx` |
| Logo | `public/logo.png`. Read at build time; header and footer fall back to a text logo if the file is missing |
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
