# Redesign brief — shlub.org

Paste everything below the line into a fresh Claude Code session opened in this repo.

Written against `origin/main` @ `41a04a8`. Note: your local `main` was 3 commits behind when
this was written — run `git pull` before starting, or the line numbers below won't match.

---

## Role

You are the design lead on a redesign of my portfolio site. I have already rejected the
current design for looking templated — it reads as generic AI-generated dark SaaS. I am
paying for a point of view: make deliberate, opinionated choices about palette, typography,
layout and motion that are specific to *this* site, and take one real aesthetic risk you can
justify in a sentence.

Do not start by writing code. Follow the process at the bottom.

## What the site is

Static, hand-written, no framework, no build step, no dependencies.

- `index.html` — homepage
- `style.css` — single stylesheet (482 lines), shared with the case studies
- `script.js` — vanilla JS: nav, showcase carousel, scroll reveal, lightbox, contact form
- `work/*.html` — three case studies: Avon Capital Estates, BerryLush, HydraLink
- `assets/fonts/` — self-hosted woff2 + `fonts.css`
- `assets/` — real client screenshots, webp with jpeg fallback
- `live/berrylush/` — a separate storefront prototype with its own tokens. **Out of scope.
  Don't touch it or its fonts (`fonts-berrylush.css`, Baloo 2, Nunito).**

Keep all of that. No Tailwind, no React, no bundler, no npm.

## Hard technical constraint — read this before choosing anything

`netlify.toml:46` and `vercel.json:19` set a strict CSP pinned to `'self'`:

```
default-src 'self'; script-src 'self'; font-src 'self'; img-src 'self' data:;
connect-src 'self' https://api.web3forms.com; ...
```

So: **no Google Fonts, no CDN, no external script or stylesheet of any kind.** Any typeface
you choose must be downloaded and self-hosted as woff2 in `assets/fonts/` and registered in
`fonts.css` alongside the existing entries. If you propose a font, you are also proposing to
vendor it. Don't quietly relax the CSP to make a choice work — if a direction needs that,
say so and pick something else.

## Who it's for

Me: Edward Georgevic, engineer and freelance web designer. The site is **freelance-only** —
a previous pass deliberately removed the job-seeking copy, so don't reintroduce it.

Audience, in priority order:

1. Commercial property firms with dated sites losing tenants and investors
2. Consumer brands needing identity plus a storefront

My differentiator: I'm an engineer, not a decorator. Engineering & Management graduate
(Exeter, first class), currently building UI components, parametric features and 3D-modelling
software for HVAC systems. The visual language can draw on that world — tolerances, drawings,
schedules, revisions — if you think it earns its place.

## The problem — what to eliminate

Every item below is in the code today and every one is a reason it reads as templated.
Removing them is not optional; the replacements are yours to choose.

**Colour and surface**
- Blue → teal gradient text (`.gradient-text`, `style.css:94`) on the hero headline
  (`index.html:51`) and inline inside an About sentence (`index.html:255`)
- Two fixed radial background glows — `style.css:43–52`
- SVG `feTurbulence` noise overlay at 2.2% opacity — `style.css:53–61`
- Faded grid-line backdrop with a radial mask behind the hero — `style.css:142–146`
- `#08090c` near-black ground with `rgba(255,255,255,.08)` hairline cards — the default
  dark-card look

**Components**
- Pulsing green "Available for freelance projects" pill — `index.html:50`, `style.css:148–154`
- Fully-rounded (100px) buttons with a coloured glow shadow — `style.css:103, 110`
- Glassmorphic nav: `backdrop-filter: blur(18px) saturate(140%)` — `style.css:124`
- Infinite marquee of skill words separated by `✦` — `index.html:164–169`, `style.css:170–173`
- Chips for everything — 18 on the homepage, 12 in the Toolbox alone — `index.html:262–273`
- ALL-CAPS eyebrows at `.22em` tracking with a 26px dash — `style.css:82–87`
- The identical right-arrow SVG, inlined nine times on one page

**Motion**
- `translateY(-2/-3/-4/-5px)` hover lift on buttons, chips, carousel buttons, dots, work
  cards *and* service cards — `style.css:112, 115, 194, 240, 281, 290, 319`
- Fade-up-on-scroll with `.d1/.d2/.d3` stagger applied to 27 elements

**Type**
- Inter + Space Grotesk (`style.css:24–25`). This is the single most common AI font pairing
  in existence. Both are self-hosted, so replacing them means removing the old woff2 files
  and their `@font-face` blocks too — don't leave orphans.

**Inconsistency**
- Corner radii are scattered: 2, 4, 6, 10, 12, 13, 14, 18 and 26px all appear, plus 100px
  pills and 50% circles. Pick one value and hold it.
- Four inline `style=""` attributes — `index.html:172, 255, 275, 400`. They go.

## Structural problems worth fixing, not just re-skinning

1. **The three projects are presented twice on one page.** A carousel at `#work`
   (`index.html:68–161`) and then the same three as case-study cards at `#case-studies`
   (`index.html:172–247`), with overlapping copy and metrics. A visitor reads Avon Capital
   Estates twice before reaching About. Decide which presentation earns its place and cut
   the other, or merge them into one.
2. **The strongest proof is buried.** "1.5M ft² across 193 units, board-approved and
   launched" is the most persuasive sentence on the site and it's the third clause of a hero
   paragraph. Consider whether the proof should *be* the hero rather than the headline.
3. **Dead CSS.** `.hero-meta` and `.scroll-hint` (`style.css:160–166`) aren't used by any
   HTML file any more. Sweep for others as you go.
4. **The Toolbox chip wall** lists twelve things including "Technical Writing". Nobody hiring
   a web designer reads it. Either make it say something specific or cut it.

Rewriting copy is in scope. The **facts** are fixed — dates, employers, the degree, 1.5M ft²,
193 units, 6 agencies, ~2 hrs, WCAG 2.2 AA, what each project actually was. The phrasing is
yours. Kill the filler that's there now: "at the intersection of engineering rigour and design
craft", "turn visitors into customers", "engineering-minded and detail-obsessed", "I care
about the whole picture". Plain verbs, sentence case, specific over clever.

## Non-negotiables

- Semantic HTML. Keep the skip link, `:focus-visible` rings, `prefers-reduced-motion`
  handling, real `alt` text, and the carousel's `aria-roledescription` / `aria-live` wiring.
- Keep `<picture>` with webp + jpeg fallback and the `loading` / `decoding` attributes.
- Keep every `<head>` tag: canonical, OG, Twitter card, theme-color, favicon. Update
  `theme-color` to match the new ground colour.
- Keep the Web3Forms form working, including the honeypot and the status region.
- Works down to a 360px viewport. Text contrast ≥ 4.5:1 (≥ 3:1 for large display type).
- At most **two** typefaces, self-hosted, **four woff2 files maximum** for the site itself.
- CSS stays one file, organised tokens-first. Watch selector specificity — don't let a
  `.section` rule and an element rule fight over the same padding.

## The parameters — decide these explicitly, and state them before you write CSS

I don't know how to specify a design, so this is the list I want you to fill in. Give me
actual values, not adjectives.

1. **Palette** — 5 to 6 named hex values, each with a stated role (ground, raised surface,
   primary text, secondary text, rule, accent). Rules: exactly **one** accent hue; no
   gradient used as a text fill anywhere; if you go dark, commit to a real hue rather than
   another blue-black; if you go light, don't land on the cream-paper default either.
2. **Type** — a display face and a body face, named, with a reason each, and confirmation
   that both are freely licensed for self-hosting. Banned because they're the current
   defaults: Inter, Space Grotesk, Poppins, Montserrat, DM Sans, Plus Jakarta Sans, Manrope,
   Satoshi, General Sans, Playfair Display. Give me the modular scale (base size and ratio),
   the exact weights you'll load, letter-spacing at display sizes, and a body measure between
   60 and 72 characters.
3. **Space** — a base unit and the full spacing scale derived from it. Vertical rhythm
   between sections. Column grid and max content width. Say whether the layout is symmetric
   or deliberately asymmetric.
4. **Shape** — one border-radius value used everywhere, or zero radius used everywhere. Pick
   one. State the rule policy (hairlines? none?) and the elevation policy: either no shadows
   at all, or exactly one shadow token. No coloured glows.
5. **Motion budget** — name the maximum number of distinct animations on the page and list
   what they are. Everything else is static. No global hover-lift: a hover state may change
   **one** property. Every animation needs a `prefers-reduced-motion` off-switch.
6. **Signature** — the one element this site is remembered by, that couldn't be lifted onto
   someone else's portfolio without looking stolen. Spend the boldness here and keep
   everything around it quiet.
7. **Density** — pick a stance and hold it: generous and sparse, or tight and information-
   dense. The current site is neither.

Known AI-default clusters — don't land on one by accident: (a) cream `#F4F1EA` background
with a high-contrast serif and a terracotta accent; (b) near-black with a single acid-green
or vermilion accent; (c) broadsheet layout with hairline rules, zero radius and dense
newspaper columns.

## Direction

Pick **one** and delete the others, or — if none are right — propose three of your own.
Either way, fill in all seven parameters properly. These are starting points, not token sets.

**A · Measured.** The page borrows from the drawing and the schedule of areas: real figures
(1.5M ft², 193 units, 6 agencies, ~2 hrs) set as a proper schedule rather than big-number
cards, extension and dimension lines annotating the client screenshots, a revision table
standing in for the experience timeline, a title block carrying project number and status.
Paper ground, ink text, one blueprint blue. Earned twice over — by the CAD work and by a
property audience that reads floorplans for a living. But it has to be *used*, not just
gestured at with a mono font.

**B · Warm dark, one signal.** Stay dark, but properly: a warm dark ground rather than
another blue-black, one signal colour, no gradients, no glows, typography carrying the page.
A high-contrast display face set very large against a plain body face. Signature: a
persistent measurement rail down the left edge that reads as an instrument, not a progress
bar.

**C · Structural grid.** Light, near-monochrome, with the column grid made visible and used
asymmetrically — content hung deliberately off-centre rather than centred in a box. One ink
colour, used only for rules and links. Heavy condensed display against a readable serif body.
Structure carries the personality; there is almost no decoration.

## Process

1. **Don't code yet.** Give me three directions. For each: the palette as named hex values,
   the type pairing with real font names and the scale, the layout as a six-line ASCII
   wireframe, and the signature element in one sentence. Plus one line on why it fits *this*
   site rather than any portfolio.
2. **Critique your own three.** For each, ask honestly: would I have produced this for any
   portfolio brief? Kill or revise the ones where the answer is yes, and tell me what changed.
3. **Stop and wait for my pick.** Don't build all three.
4. Once I've picked, build the **homepage only**, complete. Screenshot it at 1440px and 390px
   and show me before touching anything else.
5. Then bring `work/*.html` and `404.html` onto the same system.

## Acceptance

Before telling me it's done, verify and report on each:

- Zero gradient text fills, radial glows, noise overlays, marquees, glow shadows, and no
  universal hover-lift
- Animation count at or under the budget you set, all of it disabled under
  `prefers-reduced-motion`
- One radius value, one accent hue, four woff2 files or fewer, no orphaned `@font-face`
  blocks or unused font files left in `assets/fonts/`
- No inline `style=""` anywhere; no dead CSS rules
- Every interactive element reachable and visible by keyboard; carousel still operable by
  arrow keys
- Contrast measured, not assumed
- No horizontal scroll at 360px
- Nothing in `live/berrylush/` changed
- Screenshots at 1440px and 390px

Finally, tell me the one thing you'd change if you had another day on it.
