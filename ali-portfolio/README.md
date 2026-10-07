# Ali — portfolio

One-page portfolio built with Next.js (App Router), Tailwind CSS v4 and shadcn/ui-style components, with Lucide icons.

## Before you publish

1. **Your contact details** — edit `lib/site.ts` (or set `NEXT_PUBLIC_WHATSAPP_NUMBER` and `NEXT_PUBLIC_EMAIL` in Vercel).
   The WhatsApp number is digits only with country code, e.g. `923001234567`.
2. **Real screenshots** — replace the three placeholder files in `public/projects/` with screenshots of the live sites,
   keeping the same names (`orient-group-gulf.png`, `dacha.png`, `dhil-al-shams.png`). Use 1440×900.
3. **Open Graph image** — after step 2, run `npm run build && npm start`, then in another terminal `npm run og`
   to regenerate `public/og.png` from the hero.
4. **Domain** — set `NEXT_PUBLIC_SITE_URL` (e.g. `https://ali.dev`) so link previews resolve.

## Run

```sh
npm install
npm run dev      # http://localhost:3000
npm run build
```

Deploy on Vercel with the project root set to `ali-portfolio`.
