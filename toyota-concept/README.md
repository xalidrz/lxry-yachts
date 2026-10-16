# Toyota US homepage — concept redesign

Concept only. **Not affiliated with Toyota.** Mock data only; every figure carries "(concept)".

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build
npm run images     # regenerate the vehicle imagery (scripts/generate-images.mjs)
```

## Structure
- `src/index.css`: design tokens first (palette, type scale, 8px spacing, grid, radius, motion), then base and components. `tailwind.config.ts` maps only to those variables.
- `src/data/content.ts`: all copy, nav, vehicles, offers, dealers, footer.
- `src/components/ui`: shadcn/ui-style primitives (Radix): button, badge, checkbox, input, label, toggle-group, dialog, sheet, accordion, navigation-menu, skeleton, plus a carousel on native CSS scroll-snap.
- `src/components/site`: page sections.

## Decisions worth knowing
- **Images are generated**, not photographed (Unsplash/Pexels were unreachable from the build sandbox, and no press photos are used). They are generic, unbadged side-profile illustrations written as SVG and rasterised to WebP (about 250 KB in total). Swap in licensed photography by replacing files in `public/images` under the same names.
- **The optional 3D hero was not built.** The hero is a single priority-loaded WebP.
- **Red `#EB0A1E`** is used only on primary buttons and tiny accents. White on red is 4.57:1. It is never used for text on dark surfaces (4.3:1).
- **Steel `#6B7077`** text is only used on white or paper (5.0 / 4.6:1). Dark surfaces use mist for secondary text.
- Dark sections re-point semantic tokens via `data-surface="dark|ink"`, so components never branch on theme.
- Reduced motion disables every transition and animation and shows content immediately (count-ups jump to their final value).

## Reviewing states
- `?demo=empty` or `?demo=loading` forces those states in the vehicle finder.
- Dealer search: ZIP `00000` = no results, `99999` = service error, anything that isn't 5 digits shows the inline validation error.
- Tick two or three vehicles to bring up the compare tray; the fourth checkbox then becomes disabled.
