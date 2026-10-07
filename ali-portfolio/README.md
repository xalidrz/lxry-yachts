# Ali — portfolio

One-page portfolio built with Next.js (App Router), Tailwind CSS v4 and shadcn/ui-style components, with Lucide icons.

## Before you publish

1. **Contact details** — set in `lib/site.ts` (WhatsApp +92 336 1710242 and aliwebstudio11@gmail.com). To change them, edit that file or set `NEXT_PUBLIC_WHATSAPP_NUMBER` / `NEXT_PUBLIC_EMAIL` in Vercel.
2. **Real screenshots** — replace the five placeholder files in `public/projects/` with screenshots of the live sites,
   keeping the same names (`orient.png`, `royal-wedding.png`, `rbc-yachts.png`, `gcs.png`, `dacha.png`). Use 1440×900.
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
