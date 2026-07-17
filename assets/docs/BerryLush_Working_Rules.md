# CLAUDE.md — berryLush™ website

Guidance for any AI agent or developer working on this project. Read this first, then
`PROJECT_CONTEXT.md` for the full product/brand background. **Every change must pass the
brand test: bold, playful, unapologetically strawberry.**

---

## What this project is

The marketing + DTC e-commerce website for **BerryLush™**, a better-for-you strawberry
candy brand. Source of truth: `BerryLushPRD.docx` (product requirements) and
`BerryLushSlideDeck.pdf` (brand book). Current build is a single-file marketing landing
page (`index.html`); the roadmap is a full multi-page storefront.

## File map

| File | Purpose |
|------|---------|
| `index.html` | The landing page. Self-contained: HTML + CSS + JS + inline SVG art, no build step, no external assets except Google Fonts. |
| `brand-tokens.css` | Canonical design tokens (colors, fonts, radii, shadows). Import this into any new page so the brand stays consistent. |
| `PROJECT_CONTEXT.md` | Distilled product context: vision, personas, KPIs, IA, roadmap, open questions. |
| `README.md` | How to open, edit, and extend. Start here if you're new. |
| `CLAUDE.md` | This file. |

## How to run / edit

No build, no dependencies. Open `index.html` in a browser. Edit the file directly and
refresh. If you add pages, keep them as sibling HTML files and share `brand-tokens.css`.

---

## Brand guardrails (do NOT break these)

**Palette — 60/30/10 weighting.** Blush/Petal fields (60%), Lush Berry moments (30%),
Leaf Green freshness accents only (10%).

| Token | Hex | Use |
|-------|-----|-----|
| Lush Berry | `#E8235A` | Hero color, primary CTAs, ~60% of layout weight |
| Deep Berry | `#B01345` | Depth, dark buttons, headings, dark sections |
| Blush | `#FDEFF3` | Default light background |
| Petal | `#F9D2DD` | Tints, cards, soft blocks |
| Leaf Green | `#2E9E44` | The fresh accent — calyx / "yes" checks ONLY |
| Berry Ink | `#5C1030` | ALL body text |

**Type.** Display face = chunky rounded (Baloo 2 / Fredoka class) — **hero headlines and
wordmark only**. Body = friendly sans (Nunito here; brand book names Calibri). Letterspaced
ALL-CAPS labels are "seasoning" — use sparingly.

**Logo rules.** Rounded corners everywhere, no sharp angles. Lowercase `berry` flows into
capital `Lush`. Never recolor the berry mark, stretch the wordmark, add outlines/drop
shadows to the logo, or place it on clashing reds.

**Imagery — the "honest window" rule.** Real product photography only for products; no
renders passed off as real. Current build uses inline SVG illustrations as placeholders —
swap to real photography before any real launch. Mascot is for delight moments only
(empty cart, 404, order confirmation) — **never** on legal/nutrition content.

**Motion.** Small, springy micro-interactions (add-to-cart bounce, mascot wink). Always
respect `prefers-reduced-motion` — the current CSS already disables animation/transitions
under that query; keep it that way.

## Voice & tone

Three rules: **lead with joy, never preach, keep it juicy.** Short sentences, big flavor
words, a wink when possible. Error/empty states stay playful.

Say this → not that:
- "Made with real strawberries. Obviously." — not "Contains fruit juice concentrate for enhanced flavor delivery."
- "No fake colors. This pink is all fruit." — not "Free from artificial colorants as defined by FDA regulation."
- "Juicy inside. Chewy outside. Pure happiness." — not "A dual-texture confectionery experience."

Empty cart is already "Your pouch is empty. Let's fix that." Keep that energy.

## Accessibility (non-negotiable — WCAG 2.2 AA)

Brand pinks on blush frequently **fail contrast**. Rule: all text is Berry Ink `#5C1030`
(or white on Lush/Deep Berry) and must pass 4.5:1. Keep visible focus states, full
keyboard support, and the reduced-motion variant. Do not put pink text on blush.

## When extending the site

- New pages: reuse the SVG `<symbol>` sprite (`#berry`, `#mascot`, `#pouch`, `#minis`) and
  `brand-tokens.css`. Keep the sticky header, announcement bar, and footer consistent.
- Priorities live in the PRD: **P0 = launch blocker, P1 = launch target, P2 = fast-follow.**
  Check `PROJECT_CONTEXT.md` before building — don't ship P2 work while P0 gaps remain.
- The current cart/checkout/subscription are **front-end demos only.** Real commerce is
  planned on Shopify (checkout, PCI, tax) + a subscription app (Recharge/Skio class) +
  Klaviyo for email/SMS. Do not build a custom checkout or store card data.
- US-only at launch. No international shipping/localization, no B2B portal, no loyalty
  program, no native app in v1 (see PRD "Out of scope").

## Definition of done for any change

1. Passes the brand voice + visual checklist above.
2. Works on mobile and desktop; no layout breaks under 900px.
3. Meets WCAG 2.2 AA on the changed flow (contrast, focus, keyboard, reduced-motion).
4. No new external dependencies without a reason (keep it fast — Core Web Vitals "good").
