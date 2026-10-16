# Vesari Yoga: Espace bien-être & détente (Orléans)

Single-page, mobile-first French site. React 18, Vite, Tailwind CSS, shadcn/ui-style components (Radix Slot + cva) and Lucide icons only.
Fonts (Cormorant Garamond, Inter) are self-hosted via `@fontsource`. No blur effects anywhere. Palette: espresso, cream and soft gold (`#F2C887`), defined in `tailwind.config.ts`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks, outputs ./dist
```

## Editing content

All text, the phone number, address, hours, prices, review and photo alt texts live in **`src/content.ts`**.
The three "Soins" cards are placeholders (`price: "Tarif sur demande"`): replace title, description and price there.
Only "Fermeture 20h" is shown for hours until real opening hours are confirmed.

## Hero photo

The hero background is `public/photos/hero.jpg`. Replace that file with your own photo (subject on the right works best; keep it under about 400 KB). The current file is a stand-in.

## Photos

TODO: replace with real photos of the studio. The gallery uses stand-in photos in `public/photos`; `npm run photos -- <folder>` regenerates the resized WebP files from originals.

## Notes

- The Google Maps iframe loads only when the visitor scrolls near it.
- No canonical URL or sitemap is set yet; add them once the domain is known.
- The review text is a French translation of the review summary; paste the exact Google wording into `reviews.items` if preferred.
- The navbar logo is the Lucide `Flower2` icon plus "VESARI" text; the footer keeps the small line-art mandala.
