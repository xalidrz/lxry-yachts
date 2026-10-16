# Vesari Yoga: Espace bien-être & détente (Orléans)

Single-page, mobile-first French site. React 18, Vite, Tailwind CSS, shadcn/ui-style components (Radix Slot + cva) and Lucide icons only.
Fonts (Cormorant Garamond, Inter) are self-hosted via `@fontsource`. No blur effects, no yellow or gold.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks, outputs ./dist
```

## Editing content

All text, the phone number, address, hours, prices, review and photo alt texts live in **`src/content.ts`**.
The three "Nos soins & cours" cards are placeholders (`price: "Tarif sur demande"`): replace title, description and price there.
Only "Fermeture 20h" is shown for hours until real opening hours are confirmed.

## Photos

`npm run photos -- <folder>` regenerates the resized WebP files in `public/photos` from the originals.

## Notes

- The Google Maps iframe loads only when the visitor scrolls near it.
- No canonical URL or sitemap is set yet; add them once the domain is known.
- The review text is a French translation of the review summary; paste the exact Google wording into `reviews.items` if preferred.
- The supplied logo (gold tones) is not used; the logo is text, per the no-gold rule.
