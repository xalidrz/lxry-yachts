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
Set the environment variable `NEXT_PUBLIC_SITE_URL` to the live domain (see `.env.example`). It drives canonical URLs, `sitemap.xml`, `robots.txt` and Open Graph tags. The default is `https://orientgroupkwt.com`.

## Adding or editing a product

Everything is in **`data/products.ts`**. Add one entry to the `products` array (fields are documented at the top of the file). The product page, category listing, search, related products, sitemap and SEO tags all update on the next build.

Real photos: put the file in `public/products/` and set `image: "/products/<file>.jpg"`. Until then a branded placeholder shows.

## Other things you may want to change

| What | Where |
| --- | --- |
| Phones, emails, address, WhatsApp number, **Google Maps link** | `lib/site.ts` (`GOOGLE_MAPS_URL` is one constant) |
| Brand logos | `data/brands.ts` (add `logo: "/brands/name.svg"`) |
| Categories | `data/categories.ts` |
| Colours and fonts | `app/globals.css`, `app/layout.tsx` |
| Arabic / RTL | `lib/i18n.ts` and `components/language-toggle.tsx` (toggle is in place, Arabic side inactive; components use logical start/end spacing) |

Products supplied in several brands use `brand: ANY_BRAND`. Set a real brand name on an entry once it is confirmed.
