# CH Real Estate & Builder's — website

Single-page luxury real-estate + construction site. React 18, Vite, Tailwind CSS, shadcn/ui (Radix) components,
Framer Motion and Lucide icons (the only icon set used). Dark theme only, branded in the logo's gold + charcoal.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then outputs ./dist (deploy this folder)
npm run preview    # serve the production build locally
```

## What to replace before launch

| What | Where |
| --- | --- |
| Phone, WhatsApp, email, address, hours, social links | `src/lib/site.ts` (everything reads from here) |
| Property listings (**currently sample data**) | `src/data/properties.ts` |
| Projects (**currently sample data**) | `src/data/projects.ts` |
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

## Behaviour notes
- **Contact form** has no backend: on submit it validates, then opens WhatsApp (`wa.me`) with the enquiry pre-filled.
  To email instead, replace the `window.open(...)` call in `src/components/sections/Contact.tsx` with a POST to a form
  service (Formspree, Web3Forms, your own API).
- **Hero search** filters the sample listings (Buy / Rent by type, area, size and budget). The **Build** tab sends the
  visitor to the contact form with a pre-filled construction quote request.
- **Navbar Buy / Rent** switch the property filter chips; "Request a quote" on a service card pre-selects it in the form.
- **Marla converter**: 1 Marla = 225 sq ft, 1 Kanal = 20 Marla (change the two constants in
  `src/components/sections/Converter.tsx` if your area uses a different Marla).
- Map is a keyless Google Maps embed of the office address, darkened with a CSS filter. For an exact pin, replace
  `mapEmbedSrc` in `src/lib/site.ts` with the "Embed a map" URL from Google Maps.
- Respects `prefers-reduced-motion`.
