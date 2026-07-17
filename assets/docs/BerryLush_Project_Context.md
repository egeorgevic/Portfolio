# PROJECT_CONTEXT.md — berryLush™

Distilled context for the berrylush.com project, drawn from the Product Requirements
Document (v1.0, July 17 2026, owner Ed Georgevic) and the BerryLush Brand Book. This is the
"why" behind the build. For working rules, see `CLAUDE.md`.

---

## 1. The product & the opportunity

BerryLush™ is a new better-for-you strawberry candy: soft, sugar-sanded chews with a
molten strawberry center, made from real strawberry purée, set with plant-based pectin
(no gelatin), colored with fruit & vegetable juice (no artificial dyes). Tagline:
**"Real Fruit. Real Good. Reimagined."**

The wedge: the candy aisle is sweet but stale. Legacy gummy brands own *fun* with
artificial everything; better-for-you brands got *clean* but forgot the joy. BerryLush sits
in the empty high-fun + real-fruit quadrant. Market context: $41B+ U.S. confectionery
market, ~47% of consumers occasionally buy "better-for-you" candy, ~4% projected annual
growth in reduced-sugar/plant-based/clean-label lines.

**Positioning:** Candy, not compromise. One hero fruit, obsessively celebrated.

## 2. Website role & business goals

The site is the brand's primary owned channel and the destination for every link in the
90-day "Unapologetically Strawberry" social campaign (feeds-first, TikTok + Instagram).

- **Year-1 targets:** $1.8M net revenue, 40K DTC orders in the launch window.
- DTC + social shops = ~30% of Year-1 revenue.
- Retail: grow toward 1,200 wholesale doors by month 18.
- Five objectives: **Convert** (turn social traffic into first buyers), **Retain** (grow
  "The Berry Drop" subscription), **Tell the story** (real fruit, plant-based, no artificial
  colors — provable), **Support retail** (store locator), **Own the audience** (email/SMS).

## 3. Success metrics (KPIs)

| Metric | Definition | M1–6 | M7–12 |
|--------|-----------|------|-------|
| Conversion rate | Sessions → completed orders | ≥ 2.0% | ≥ 3.0% |
| Average order value | Net revenue / orders | ≥ $18 | ≥ $22 |
| Subscription share | % of DTC revenue from Berry Drop | ≥ 10% | ≥ 25% |
| Email/SMS capture | Signups / unique visitors | ≥ 4% | ≥ 5% |
| Repeat purchase rate | Customers with 2+ orders in 90 days | ≥ 15% | ≥ 25% |
| Core Web Vitals | LCP/INP/CLS, p75 mobile | all "good" | all "good" |
| Store locator usage | Locator sessions / total | baseline | ≥ 8% |

## 4. Target users (mobile-first, ~75%+ of sessions)

- **The Label Reader (28–45):** scrutinizes claims before buying. Needs full ingredient
  list, certifications (vegan, gluten-free, non-GMO), "no artificial colors" proof,
  nutrition panel.
- **The Nostalgic Millennial (30–42):** emotional buyer, gifts candy. Needs rich story
  page, gifting, mascot merch hooks, warm brand-voice copy.
- **The Gen Z Flavor Chaser (16–27):** arrives from TikTok/IG, impulse buys, shares. Needs
  fast mobile PDP, express checkout (Apple Pay / Shop Pay), shareable content, socials/AR.

Shared truth: none want "diet candy" — they want real candy that respects them.

## 5. Product line & pricing

| SKU | Format | Price | Timing |
|-----|--------|-------|--------|
| Original Chews | 4 oz resealable stand-up pouch (flagship) | $4.49 | Launch now |
| Lush Minis | 10 oz family bag of wrapped minis | $9.99 | Wave 2 (+6 mo) |
| Single mini | — | $1.29 | — |
| Flavor Drops | Seasonal limited runs (Strawberry Lemonade, Berries & Cream, Sour Lush) | — | Wave 3 (+12 mo) |

Spec targets: ≈100 cal/serving, ~20% real fruit content, vegan, gluten-free, non-GMO.

## 6. Information architecture (full site)

`/` Home · `/shop` PLP · `/products/{slug}` PDP · `/berry-drop` subscription landing ·
`/our-story` · `/ingredients` · `/find-us` store locator · `/faq` · `/contact` ·
`/cart` · `/checkout` · `/account` · legal (Privacy, Terms, Accessibility, CA notices).

**Current build (`index.html`) covers:** Home hero, claims strip, featured product,
product line, ingredients (In Every Bite / Never Ever), Berry Drop teaser, Our Story,
personas, email capture, FAQ, footer — plus a demo cart drawer. Still to build as real
pages: Shop/PLP, PDP, dedicated Berry Drop page, Ingredients page, Find Us, Contact,
account, and real checkout.

## 7. Key requirements by priority

**P0 (launch blockers):** sticky header + cart drawer; CMS announcement bar; footer with
newsletter + socials + allergen statement; brand design system; hero (LCP < 2.5s mobile);
claims strip; featured product add-to-cart; email/SMS capture with 10%-off incentive; PLP
with all SKUs; PDP gallery + one-time vs. subscribe selector + ingredient/nutrition +
certifications; cart drawer with free-ship progress; platform checkout with express wallets;
discount codes; US shipping + free threshold; order confirmation + transactional emails;
Subscribe & Save on core SKUs; self-serve subscription management (cancel ≤ 3 clicks);
upcoming-order email; Our Story; Ingredients two-column; FAQ accordion.

**P1 (launch target):** Berry Drop teaser + landing; social proof/UGC embeds; story teaser;
reviews with photos; bundles; waitlist/notify-me; structured data; order tracking; contact
with topic routing + wholesale line-sheet; store locator list.

**P2 (fast-follow ≤90 days):** site search; post-purchase one-click upsell; churn-save flow;
map-based locator; press kit; revisit blog/SEO hub and headless migration.

## 8. Non-functional requirements

- **Performance:** Core Web Vitals "good" at p75 mobile (LCP < 2.5s, INP < 200ms,
  CLS < 0.1). Image CDN + responsive srcsets; SVG for illustrations.
- **Accessibility:** WCAG 2.2 AA. Brand pinks on blush fail contrast — text uses Berry Ink
  or passes 4.5:1; visible focus; keyboard support; reduced-motion variant.
- **SEO:** semantic markup, per-page metadata, OG/Twitter cards, sitemap, canonicals;
  target term ownership: "strawberry candy."
- **Security/payments:** PCI DSS via platform-hosted checkout (no card data on our infra);
  TLS everywhere; rate-limited, spam-protected forms.
- **Privacy:** CCPA/CPRA; cookie consent (prior consent for non-essential trackers);
  COPPA care; SMS double opt-in (TCPA).
- **Reliability:** 99.9% availability; launch-day load target 50× baseline (campaign drops).
- **Content ops:** marketing can edit promos, FAQ, retailer list, landing modules without
  engineering.

## 9. Recommended tech stack (per PRD)

- **Commerce:** Shopify (checkout, catalog, tax, PCI; fast path to express wallets + TikTok
  Shop / IG Shopping).
- **Storefront:** v1 — Shopify Online Store 2.0 theme customized to the design system;
  v2 (post-launch, if needed) — headless (Hydrogen/Next.js).
- **Subscriptions:** Shopify-native app (Recharge/Skio class).
- **CRM/lifecycle:** Klaviyo (email + SMS: welcome, abandoned cart, post-purchase,
  subscription notices, restock/waitlist).
- **Reviews:** platform-integrated app with photo reviews + structured data.
- **Analytics:** GA4 + server-side conversion APIs (Meta, TikTok) with consent mode.

> Note: the current `index.html` is a standalone marketing prototype, **not** a Shopify
> theme. Its cart/checkout/subscribe are front-end demos. Porting into Shopify is the
> path to a real launch.

## 10. Milestones (in step with the campaign)

- **M0 — Teaser** (campaign wks 1–3): single mystery landing page, mascot, #WhoIsBerryLush,
  waitlist capture, no commerce.
- **M1 — Launch site** (wk 4): all P0 — full marketing site + shop + checkout + Berry Drop.
- **M2 — Optimize** (wks 5–12): P1 backlog — reviews, bundles, waitlists, Berry Drop
  landing, locator list, A/B program.
- **M3 — Fast follow** (mo 4–6): P2 — map locator, churn-save, upsell, press kit, search;
  evaluate blog/SEO + headless.

## 11. Risks & dependencies

- Product photography not ready → book shoot in M0; label interim renders honestly.
- Summer shipping (candy melts) → heat-safe packaging, warm-weather notice at checkout.
- Launch traffic spike → managed platform, load test 50×, static teaser fallback.
- Ingredient-claims scrutiny → all front-end claims reviewed by regulatory counsel;
  nutrition sourced from final co-packer specs.
- Subscription app choice → select/contract in M0.
- Retailer data freshness → launch with verified list only; quarterly audit.

## 12. Open questions (unresolved in PRD)

- Merch (mascot apparel/stickers): v1 shop or subscriber-exclusive only?
- Launch exclusive: does TikTok Shop get a window before berrylush.com, or simultaneous?
- Free-shipping threshold: $30 vs. $35 (margin modeling in progress; prototype uses $30).
- Reviews: launch disabled until ≥50 seeded orders, or day one?
- Age gate: none planned (general-audience food) — confirm with counsel.

## 13. Launch acceptance criteria

All P0 implemented and verified on mobile + desktop (latest iOS Safari, Android Chrome,
desktop Chrome/Safari/Edge/Firefox); a test order placed and refunded end-to-end in
production including a Berry Drop create → skip → cancel cycle; Core Web Vitals "good" on
Home/PLP/PDP; WCAG 2.2 AA passes on core flows; full-funnel analytics verified with consent
mode; brand review sign-off on every page.
