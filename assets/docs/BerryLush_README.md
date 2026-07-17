# berryLush™ website

The marketing + DTC e-commerce site for **BerryLush™**, a better-for-you strawberry candy
brand. *Real Fruit. Real Good. Reimagined.*

This repo currently holds a polished, single-file **marketing landing page** plus the
handover docs and design tokens needed to grow it into the full storefront.

## Quick start

No build step, no dependencies. Just open the page:

```
open index.html          # macOS
# or drag index.html into any browser
```

Edit `index.html` directly and refresh. It's self-contained — HTML, CSS, JavaScript, and
all illustrations (inline SVG). The only external request is Google Fonts (Baloo 2 + Nunito).

## What's in here

| File | What it is |
|------|-----------|
| `index.html` | The landing page — hero, claims, featured product, product line, ingredients, Berry Drop, story, personas, email capture, FAQ, footer, and a working demo cart drawer. |
| `brand-tokens.css` | Canonical design tokens (colors, fonts, radii, shadows) as CSS variables. Import into every new page. |
| `CLAUDE.md` | Working rules for AI agents / developers: brand guardrails, voice, accessibility, how to extend. **Read first.** |
| `PROJECT_CONTEXT.md` | The "why": product vision, personas, KPIs, IA, roadmap, tech stack, open questions — distilled from the PRD and brand book. |
| `BerryLushPRD.docx` | Original product requirements (source of truth). |
| `BerryLushSlideDeck.pdf` | Original brand book (source of truth). |

## What works today

- Fully responsive (mobile-first, breaks cleanly under 900px).
- On-brand palette, type, and voice pulled straight from the brand book.
- Interactive: slide-out cart drawer with free-shipping progress bar, add-to-cart bounce +
  toast, FAQ accordion, email capture, scroll reveals — all respecting
  `prefers-reduced-motion`.
- Hand-built inline SVG mascot, pouch, and minis (no image assets to manage yet).

## Important: this is a prototype, not a store

The cart, checkout, and subscription flows are **front-end demos**. There's no payment
processing, no real inventory, no order emails. Per the PRD, real commerce is planned on
**Shopify** + a subscription app (Recharge/Skio class) + **Klaviyo** for email/SMS. See
`PROJECT_CONTEXT.md` §9 for the recommended stack, and don't build a custom checkout.

Illustrations are placeholders — the brand's "honest window" rule requires **real product
photography** before launch.

## Suggested next steps

1. Build the remaining pages as siblings (Shop/PLP, PDP, `/berry-drop`, `/ingredients`,
   `/find-us`, `/contact`), sharing `brand-tokens.css`.
2. Swap SVG placeholders for real product photography.
3. Port into a Shopify Online Store 2.0 theme when moving toward a real launch.
4. Wire analytics (GA4 + consent mode) and Klaviyo capture.
5. Run the launch acceptance checklist in `PROJECT_CONTEXT.md` §13.

## Guardrails (the short version)

Bold, playful, unapologetically strawberry. Body text is always Berry Ink `#5C1030`
(pink text fails contrast on blush). Rounded corners everywhere. Mascot for delight only,
never on legal/nutrition content. WCAG 2.2 AA on every flow. Full detail in `CLAUDE.md`.
