# LXRY — Luxury Yachts L.L.C

Website for Luxury Yachts L.L.C (brand **LXRY**), a Dubai yacht rental and water sports company licensed by the Dubai Maritime City Authority.

This is a static site with no build step: `index.html`, `styles.css` and `main.js`. The photos in `images/` come from lxry.ae and are colour-graded to a single look.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

On Vercel, import the repository with no framework preset and no build command. The output directory is the root.

## Design rules

- Palette: near-black `#0D1114`, ivory `#F7F5F0`, platinum `#C9CED6` and deep sea teal `#0E4A52`.
- Never use gold, yellow, amber, mustard, champagne or beige-gold, including in icons, borders, stars, hovers or gradients.
- Fonts: Cormorant Garamond for headings and Inter for body text, from Google Fonts.
- Social icons are single-colour inline SVG in platinum that turn white on hover.
- Motion: buttons press to 0.96 with a ripple, lift 2px on desktop hover, sections fade up once and images zoom to 1.03 on hover. With `prefers-reduced-motion`, only colour changes remain.

## Content still needed (not found on lxry.ae)

| Item | Where it shows |
| --- | --- |
| Prices for every yacht and activity | Every card says "Price on request" |
| Higher-resolution Events & Decorations photo | Fishing & Events tab. The best photo on lxry.ae is only 335×214 px. |
| Opening hours | Not shown anywhere on the site |
| Google rating and review count | Reviews show quotes only, with no stars, because lxry.ae shows no ratings |
| Custom domain | The canonical and share URLs point to `lxry-yachts.vercel.app` |
