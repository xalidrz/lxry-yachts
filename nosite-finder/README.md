# NoSite Finder

Find local businesses that have no website, so you can pitch them. Everything runs in the browser: no backend, no API keys, no paid services.

- **Data:** Nominatim (geocoding) and the Overpass API (businesses) from OpenStreetMap. Only results with a name and a phone or address, and no `website`, `contact:website` or `url` tag, are kept.
- **Politeness:** one network search per 10 s, geocodes and results are cached, Overpass mirrors are tried in turn, and timeouts show a retry message.
- **Leads:** saved in `localStorage` (My Leads page, filter by status, CSV export).
- **Stack:** React, Vite, Tailwind, shadcn/ui (Radix), Lucide icons, Leaflet.

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

`dist/` is plain static files with relative paths and hash routing, so it deploys to Vercel, Netlify, GitHub Pages or any static host.
