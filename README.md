# Edward Georgevic — Portfolio

Personal portfolio for Edward Georgevic — engineering graduate, software engineer, and
freelance web designer. A fast, accessible, dependency-free static site.

**Live:** https://shlub.org

---

## Stack

- Plain **HTML, CSS, and vanilla JavaScript** — no framework, no build step.
- **Zero third-party origins.** Fonts (Inter + Space Grotesk) are self-hosted from
  `assets/fonts/`; the only outbound request is the contact form POST to Web3Forms.
- Images served as **WebP with JPEG fallback** via `<picture>`; all lazy-loaded.
- Fully responsive, dark theme, respects `prefers-reduced-motion`, targets WCAG 2.2 AA
  (skip link, visible focus, alt text, semantic headings).

## Project structure

```
portfolio/
├── index.html                     # Home (one-line hero → work carousel → case studies →
│                                  #       about, services, experience, contact)
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
│   └── berrylush/                 # Live BerryLush prototype (noindex)
│       ├── index.html
│       └── app.js                 # Cart, FAQ, toast — external so the CSP needs no inline JS
└── assets/
    ├── ace/ berry/ hydra/         # Screenshots (.jpeg + .webp)
    ├── fonts/                     # Self-hosted woff2 + @font-face CSS (latin, latin-ext)
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

**Live at https://shlub.org** — deployed on Vercel, which builds automatically on every push
to `main`. `vercel.json` handles caching, security headers, and the custom 404.

Alternative hosts (it's a static site, so anywhere works): **Netlify** (`netlify.toml` is already
configured), **Cloudflare Pages**, or **GitHub Pages** — point at the repo root, no build command.

### Canonical domain

The canonical domain is **`https://shlub.org`**, referenced across `index.html`, `work/*.html`,
`robots.txt` and `sitemap.xml`. These drive canonical URLs, Open Graph / Twitter share cards,
and the sitemap. If the domain ever changes, find-and-replace it across those four places.

Note: `www.shlub.org` has no DNS record — only the apex domain resolves. Add a `www` CNAME in
your DNS if you want visitors typing `www.` to land somewhere rather than fail.

## Editing

- **Colours, spacing, type** live as CSS variables at the top of `style.css` (`:root`).
- **Content** is plain HTML — edit the relevant section directly.
- **New images:** add both a `.jpeg` and `.webp`, then reference them with a `<picture>`
  block like the existing ones (WebP `<source>` first, `<img>` fallback with `alt`).
- **New case study:** copy any file in `work/`, swap the content, and add it to
  `sitemap.xml` and the work grid in `index.html`.

## Contact form

The form posts to **Web3Forms**, which relays submissions to an inbox without the email
address ever appearing in the page source.

**The form is not live until an access key is set.** Get a free key at
<https://web3forms.com> and replace `YOUR_WEB3FORMS_ACCESS_KEY` in the hidden
`access_key` input in `index.html`. Until then every submission is rejected and the
visitor sees an error. A hidden `botcheck` honeypot field handles spam.

## Security

Static site — no server, no database, no auth, no cookies. Headers are set identically in
`vercel.json` and `netlify.toml`:

| Header | Value |
| --- | --- |
| `Content-Security-Policy` | `default-src 'self'`, `script-src 'self'`, `style-src-elem 'self'` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` |
| `Permissions-Policy` | camera, mic, geolocation, payment, USB and sensors all denied |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` · CSP `frame-ancestors` | `SAMEORIGIN` / `'self'` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Cross-Origin-Opener-Policy` | `same-origin` |

`/.well-known/security.txt` gives researchers a way to report issues. Its `Expires`
field needs bumping once a year or the file is considered stale.

Three things to keep in mind when editing:

- **No inline `<script>` and no `onclick=` attributes.** `script-src 'self'` blocks both.
  Put JS in `script.js` (or `live/berrylush/app.js`) and bind with `addEventListener`;
  the prototype uses `data-action` attributes with one delegated listener.
- **No inline `<style>` blocks** either — `style-src-elem 'self'` blocks them. Put CSS in
  `style.css` or `live/berrylush/styles.css`. Inline `style=""` attributes are still
  allowed (`style-src-attr 'unsafe-inline'`), since inline CSS can't execute script.
- **Adding analytics or any third-party script/embed means widening the CSP** in both
  deploy configs, or it will be blocked. That is the intended friction — for a
  privacy-preserving option, prefer something self-hosted.

### DNS records (set at name.com, not in this repo)

The site's headers can't cover domain-level attacks. These are worth adding:

```
# Stop anyone spoofing email "from" shlub.org — the domain sends no mail
shlub.org.          TXT   "v=spf1 -all"
_dmarc.shlub.org.   TXT   "v=DMARC1; p=reject; rua=mailto:<your@email>"

# Restrict which CAs may issue certificates for the domain
shlub.org.          CAA   0 issue "letsencrypt.org"
shlub.org.          CAA   0 issue "pki.goog"
```

Keep both CAA entries — Vercel renews via Let's Encrypt but can fall back to Google
Trust Services, and a CAA record that is too narrow will break certificate renewal.
Enabling DNSSEC at name.com is a further step.

## Accessibility & performance notes

- Colour contrast, focus states, and reduced-motion are handled in `style.css`.
- Images are the main weight; keep new ones optimised (WebP, ~1600px max width).
- No cookies, no trackers, no analytics.

## Credits

Design & build: Edward Georgevic. The BerryLush prototype under `live/` is a portfolio
demo of a fictional brand.
