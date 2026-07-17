# Edward Georgevic — Portfolio

Personal portfolio for Edward Georgevic — engineering graduate, software engineer, and
freelance web designer. A fast, accessible, dependency-free static site.

**Live:** _add your URL here after deploying_

---

## Stack

- Plain **HTML, CSS, and vanilla JavaScript** — no framework, no build step.
- One external dependency: **Google Fonts** (Inter + Space Grotesk).
- Images served as **WebP with JPEG fallback** via `<picture>`; all lazy-loaded.
- Fully responsive, dark theme, respects `prefers-reduced-motion`, targets WCAG 2.2 AA
  (skip link, visible focus, alt text, semantic headings).

## Project structure

```
portfolio/
├── index.html                     # Home (hero, about, work, services, experience, contact)
├── 404.html                       # Friendly not-found page
├── style.css                      # Shared design system + components
├── script.js                      # Nav, scroll reveals, image lightbox
├── favicon.svg
├── robots.txt · sitemap.xml       # SEO
├── netlify.toml · vercel.json     # One-click deploy configs (caching + headers + 404)
├── work/
│   ├── avon-capital-estates.html  # Case study — client website
│   ├── berrylush.html             # Case study — brand + front-end build
│   └── hydralink.html             # Case study — product/data platform
├── live/
│   └── berrylush/                 # Live, self-contained BerryLush prototype (noindex)
└── assets/
    ├── ace/ berry/ hydra/         # Screenshots (.jpeg + .webp)
    ├── og-card.png                # 1200×630 social share card
    └── docs/                      # CV (PDF/JPEG), project PDFs, case-study source docs
```

## Run locally

No build required. Open `index.html` in a browser, or serve the folder:

```bash
# any one of these
python3 -m http.server 8000      # then visit http://localhost:8000
npx serve .
```

## Deploy

It's a static site — host it anywhere. Easiest free options:

- **Netlify** — drag the folder onto app.netlify.com, or `netlify deploy --prod`. `netlify.toml`
  configures caching, security headers, and the custom 404.
- **Vercel** — `vercel --prod`. `vercel.json` handles the same.
- **Cloudflare Pages / GitHub Pages** — point at this folder / repo root; no build command.

### Before going live (1 quick edit)

The site uses a placeholder domain. Find-and-replace **`https://edwardgeorgevic.com`** with
your real domain across these files: `index.html`, `work/*.html`, `robots.txt`, `sitemap.xml`.
These drive canonical URLs, Open Graph / Twitter share cards, and the sitemap.

## Editing

- **Colours, spacing, type** live as CSS variables at the top of `style.css` (`:root`).
- **Content** is plain HTML — edit the relevant section directly.
- **New images:** add both a `.jpeg` and `.webp`, then reference them with a `<picture>`
  block like the existing ones (WebP `<source>` first, `<img>` fallback with `alt`).
- **New case study:** copy any file in `work/`, swap the content, and add it to
  `sitemap.xml` and the work grid in `index.html`.

## Accessibility & performance notes

- Colour contrast, focus states, and reduced-motion are handled in `style.css`.
- Images are the main weight; keep new ones optimised (WebP, ~1600px max width).
- No cookies, no trackers, no analytics by default. Add GA4 / Plausible in `<head>` if wanted.

## Credits

Design & build: Edward Georgevic. The BerryLush prototype under `live/` is a portfolio
demo of a fictional brand.
