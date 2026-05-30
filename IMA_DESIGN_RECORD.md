# IMA_DESIGN_RECORD.md — Indian Mahjong Association

**This is the single source of truth for all design and brand decisions.**
Read this before every task. Update it after every meaningful design decision.

Last updated: 2026-05-19

---

## 1. Project Identity

**Client:** Indian Mahjong Association (IMA)
**Founder:** Vineeta Sahni — army wife who learned authentic Chinese Mahjong during wartime postings and built a community of women gathered around the table.
**Emotional core:** *"Still centered around the same table."*
**Founded:** 1999
**Location:** New Delhi, India

### What this IS NOT
- A gaming or casino brand
- A startup, SaaS product, or tech company
- A modern entertainment portal
- A generic nonprofit or founder biography site
- A flashy or fast-moving digital experience

### What this IS
- A premium cultural institution website
- A luxury editorial experience
- A heritage storytelling platform
- A community that feels worth belonging to
- Something between a museum microsite and a luxury magazine

This distinction must be felt in every section. When a design decision could go either way, ask: does this read as a luxury cultural institution or as a digital product? Always choose the former.

---

## 2. Brand Pillars

These six words must be felt in every section — not listed as bullet points:

1. **Heritage** — the game has centuries of history
2. **Companionship** — women gathered in unfamiliar places
3. **Strategy** — intellectual depth, not casual play
4. **Ritual** — the game as ceremony, repeated, meaningful
5. **Community** — intergenerational, inclusive, rooted
6. **Cultural continuity** — authentic Chinese Mahjong tradition preserved in India

---

## 3. Design System

### Color Tokens

Defined in `src/app/globals.css` as CSS custom properties.

| Token | Hex | Emotional role |
|---|---|---|
| `--cream` | `#f5efe4` | Parchment base. Warmth. Memory. Everything begins here. |
| `--burgundy` | `#7c1f2d` | Ceremonial weight. Heritage. The association's authority. |
| `--jade` | `#2f5d50` | Chinese cultural identity. Calm authority. Growth. |
| `--sapphire` | `#456b8c` | Depth. Sophistication. Used selectively. |
| `--tea-brown` | `#8a6a4a` | Warm neutral. Parchment shadow. Earthiness. |
| `--soft-gold` | `#c6a87a` | The finishing note. Ornamental accents. Never loud. |
| `--foreground` | `#2d2926` | Body text. Never pure black — always warm. |

**Absolute color rules:**
- No pure black anywhere on the site
- No cool or grey shadows — always warm: rgba(burgundy/jade/tea-brown base)
- Gold is a finishing note, not a primary color
- Cream and parchment tones anchor everything
- Dark green (`#1b2f25`) used for footer background contrast

### Typography

- **Headings:** Playfair Display — `var(--font-heading)` — applied to all h1–h6 via globals.css
- **Body:** Inter — `var(--font-body)` — applied to body element
- **Eyebrow pattern:** `text-[0.65–0.72rem] uppercase tracking-[0.28–0.44em]` in tea-brown or gold
- **Headline scale:** large (2.5–5.5rem range), compressed leading (0.91–1.0)
- **Body text:** 0.94–1.05rem, leading 1.84–1.92. Warm, readable, never tight
- **Legal/fine print:** 0.63–0.77rem, uppercase with tracking for editorial feel
- **Feel:** Luxury editorial magazine, not product UI

### CSS Utilities (globals.css)

- `.paper-grain` — subtle radial + grid texture overlay for parchment feel
- `.hero-fade-mask` — mask-image compositing for atmospheric illustration blending

### Spacing and Layout

- `max-w-7xl mx-auto` — consistent content width across all sections
- Sections: `relative overflow-hidden` wrapper always
- Mobile-first, `lg:` breakpoint for column layouts
- Generous breathing room — this is not a dashboard or app

---

## 4. Illustration and Image Direction

### Illustration Style

When CSS illustration is used:
- Delicate linework and geometric composition
- Poster-like, symbolic, not decorative for its own sake
- Soft texture overlays and atmospheric layering
- Graceful human presence — silhouettes, not cartoon figures
- Mahjong tile motifs: rounded-[0.7rem–1rem] bordered rectangles
- Circular jade radial gradient as the table centerpiece
- Ornamental rings, arched frames, diagonal lines as structural decoration
- Chinese cultural references must be semantically correct — only use characters that mean what they say

### Photography and Image Treatment

- Images must blend into sections, not sit as hard rectangular blocks
- Techniques: feathered or framed edges, atmospheric overlays, soft warm shadowing
- Masking: CSS `mask-image` / `clip-path` for organic dissolve into background
- Layering: images go under text with gradient scrims, not beside text in boxes
- Opacity: background images at 60–80% with a wash overlay of the section's dominant color
- Photography should feel curated, cinematic, and emotionally aligned with gathering, tradition, and companionship

---

## 5. Interaction and Animation

When Framer Motion is introduced:
- Motion is slow, atmospheric — not product UI snap
- Entrances: fade + slight upward drift (0.6–0.8s ease-out)
- Hover: tactile, refined — not bouncy or aggressive
- Parallax: optional, very subtle
- No aggressive, playful, or bouncy movement anywhere
- Transitions slightly slower and softer than typical product UI

---

## 6. Composition Principles (Absolute Rules)

1. **Sections blend, never stack.** Gradients, atmospheric transitions, and scroll frames connect sections rather than separating them as isolated blocks.

2. **No hard rectangular image containers.** Images are masked, feathered, blended. They dissolve into the page, not sit on top of it.

3. **Ornament is sensed, not seen.** All decorative elements operate at low opacity (10–55%). If a viewer would notice and name an ornamental element, it is too prominent.

4. **Mahjong must be visible.** The table, tiles, or game ritual must be central to at least the Hero and Events sections. The game is not a logo symbol — it is a living presence.

5. **Vineeta's portrait belongs in the Story section.** Her photo as a prominent hero element risks "founder profile" energy. In the Hero, her presence is atmospheric.

6. **Typography is the structural frame.** Headlines carry emotional meaning. They are not labels — they are editorial statements.

7. **Warm shadows only.** Never use grey, cool, or neutral shadows. Always warm: `rgba(110,79,47, opacity)` or similar burgundy/jade/tea-brown base.

8. **No pure black.** The darkest foreground is `#2d2926`.

9. **Chinese cultural references must be earned.** Do not use Chinese characters as decoration. When used (e.g., 桌 ghost character), they must be semantically correct.

10. **Emotional story first.** Every section should ask: what is the viewer feeling right now? Not: what are they reading?

**Final rule: Every future design decision must follow this system.**

---

## 7. Section-by-Section Design Log

---

### NAVBAR — Built ✓

**File:** `src/sections/Navbar/Navbar.tsx`

**Current implementation:**

*Desktop:* Floating sticky pill bar — `rounded-[2.35rem]`, cream/glass background with `backdrop-blur-xl`, max-w-7xl. Logo: actual IMA logo image at 64px with "Indian Mahjong Association" wordmark below. Nav links: Our Story, Membership, Trainers, Events, Contact. CTA: "Join IMA" (burgundy rounded-full).

*Mobile:* Plain flat bar — NO overflow-hidden, NO backdrop-blur (critical for iOS touch reliability). Logo + brand name left-aligned, hamburger trigger right-aligned. Hamburger uses `<label htmlFor="nav-drawer">` pattern (iOS-safe — never a button inside a blurred sticky container).

*Drawer:* Side slide panel from right, `translateX(100%)` → `translateX(0)`, 3 nav items only (Our Story, Membership, Trainers), X close button at bottom-center 20% above edge. Backdrop: semi-transparent overlay, tapping it closes the drawer.

*Scroll lock (iOS-safe):* `document.body.style.position = "fixed"` + `document.addEventListener("touchmove", fn, { passive: false })` + `e.preventDefault()`. This combination is required because iOS Safari ignores `overflow: hidden` on body alone.

**Why these decisions:**
- Floating pill nav → avoids corporate header feel
- `<label>` trigger → iOS Safari has always reliably fired touch events on labels; buttons inside `overflow-hidden` + `backdrop-blur` sticky containers have their touch areas clipped on iOS due to GPU compositing layer behaviour
- Two completely separate navbars (desktop `hidden lg:block` / mobile `lg:hidden`) → no shared overflow-hidden context between them
- 3 mobile items → editorial restraint; Events and Contact accessible via footer

**Logo asset:** `/public/assets/logos/logo.jpeg`

---

### HERO — Built ✓

**File:** `src/sections/Hero/Hero.tsx`

**Current implementation:**

Two-column editorial layout (text left, founder portrait right). `lg:min-h-[calc(100vh-6rem)]` on desktop, natural content height on mobile.

Left column: eyebrow "Since 1999" with gold line, headline "Still / centered / around the / same table.", ornamental pause (gold dots), body paragraph about Vineeta and army postings, two CTAs (Join Membership burgundy / Our Story cream-gold), brand pillars (Heritage · Companionship · Strategy).

Right column: Vineeta's portrait photo (`/assets/founder/Vineeta.jpeg`) with CSS `mask-image` elliptical feathering — image dissolves into the cream background organically. Parchment warmth overlay and bottom mist gradient applied to soften the portrait edges.

Atmospheric background: burgundy radial glow top-left, gold radial glow top-right, atmospheric light gradients.

Perimeter frame: thin gold border `inset-5`, arch ornaments at top and bottom center, gold pillar lines at left and right.

**Why portrait (not CSS illustration):**

Three hero concepts were evaluated. CSS illustration (Concept A originally) was competent but felt decorative rather than emotional. Vineeta's portrait was chosen because the human, personal quality of her presence carries the emotional core ("Still centered around the same table") more truthfully than an abstract table scene.

**Why portrait is NOT oval-framed:**

The oval portrait frame — even beautifully executed — carries an irreversible genre signal: "founder profile," "nonprofit about page," "memorial portrait." This cannot be designed away with ornamental framing. The CSS mask-image elliptical dissolve solves this: the portrait emerges from the background rather than being contained within a visible shape.

---

### FOOTER — Built ✓

**File:** `src/sections/Footer/Footer.tsx`
**id:** `contact`

**Current implementation:**

Dark jade background `#1b2f25`. Background: `/assets/footer/footer-landscape.png` at 70% opacity, `object-cover object-[center_bottom]`, with `rgba(27,47,37,0.38)` jade wash and a radial vignette overlay.

Four-column grid: brand column (2fr) + Explore / Learn / About (1fr each).

Brand column: IMA logo + "Indian Mahjong Association" wordmark, brand description paragraph, Instagram link (icon + `indianmahjongassociation` without @ prefix).

Explore column: "Membership Tiers" sub-header, Pearl / Ruby / Jade links. On mobile these display inline with `·` separator instead of stacking vertically.

Learn column: Trainers link.
About column: Our Story link.

Bottom strip: copyright © 2026, Privacy Policy, Refund Policy. Below that: a narrow ornamental divider + "Payments secured by Razorpay" in fine print (`0.63rem` uppercase).

---

### STORY — Temporarily removed

**Target id:** Restore only when the section is rebuilt.

Planned: Founder story of Vineeta Sahni — army postings → community building → IMA today. Deeply human and narrative-led. Editorial card layout with slight rotation (inspired by Magia de Pires recipe card approach). Vineeta's portrait belongs here, in intimate context. No generic timeline dots.

---

### TRAINERS — Not yet built

**Target id:** `#trainers`

Planned: 5 featured trainers. Layout rhythm inspired by mahjong tile arrangement — collectible, characterful. Not generic team card grid.

---

### MEMBERSHIP — Not yet built

**Target id:** `#membership`

Planned: Premium pricing tiers (Pearl, Ruby, Jade) in jade + burgundy palette. Should feel like joining an institution, not a checkout funnel. Benefits-forward, elevated language. Razorpay integration when UI is complete.

---

### EVENTS — Not yet built

**Target id:** `#events`

Planned: Upcoming tournaments, salon evenings, training tables. Editorial poster feel — ceremonial, not calendar-widget. Inspired by exhibit programming and event invitations.

---

### INSTAGRAM — Not yet built

**Target id:** `#instagram`

Planned: Luxury editorial grid. Art-directed feel, not an embedded social widget. "Coming soon" state is acceptable initially.

---

## 8. Writing & Typography Rules

### Voice and Tone

The IMA website voice should feel: refined, warm, editorial, culturally grounded, premium, human.

NOT: corporate, startup-like, overly dramatic, marketing-heavy, or AI-sounding.

Copy should read like an editorial cultural institution, not AI-generated luxury copy.

Keep language restrained, elegant, clear, emotionally warm and readable. Avoid overly poetic filler.

### Punctuation Rules (HARD RULES)

**1. No em dashes anywhere on the website.**

Forbidden character: —

Do not use em dashes in headings, body copy, CTAs, descriptions, trainer bios, membership text, footer copy, or UI labels.

Instead use: commas, periods, or soft sentence restructuring.

**2. No Oxford commas.**

Avoid: "culture, companionship, and strategy"

Preferred: "culture, companionship and strategy"

Apply both rules globally to all future website copy.

---

## 9. Moodboard References and How They Are Being Used

**Solar Terms / 霜降 Poster:**
- Oval window/arch framing → ornamental framing language throughout
- Ghost large characters in background → 桌 (table) ghost texture concept
- Deep indigo + persimmon palette → translated to burgundy + gold in IMA palette
- Multiple typography scales in one composition → eyebrow/headline/body hierarchy

**Fingertip Art / 东方美学:**
- Watercolor botanicals bleeding into parchment → how photography blends into section backgrounds
- Type over illustration over ground in same plane → layering philosophy
- Terracotta + sage palette → confirms IMA burgundy + jade direction

**Chinese Color Palette Reference:**
- Misty landscape as background texture → Story section background direction
- Aged/muted jade greens → jade should feel heritage, not digital
- Cultural color naming → think in terms of cultural color language, not just hex codes

**Magia de Pires Recipe Cards:**
- Off-center card layout with script + serif + sans hierarchy → Story section timeline card approach
- Decorative elements breaking out of card containers → confirmed approach to ornament
- Burgundy accent on cream → validates color pairing throughout

**Candle/Home Goods ("Where Warmth Lives"):**
- Full-bleed warm photography with text overlay → photography/portrait treatment in Hero
- Photography bleeding to full-width with warm overlay → how Vineeta's photo is treated
- Amber warmth saturating the whole composition → informs atmospheric glow approach

---

## 10. Rejected Ideas and Why

| Idea | Why Rejected |
|---|---|
| Dark navbar | Breaks warm parchment continuity from top |
| Full-width header bar | Corporate/startup feel |
| CSS illustration of seated figures as hero | Competent but decorative, not emotional |
| Oval portrait frame for Vineeta | Risks "founder biography" / nonprofit aesthetic regardless of execution |
| Button-based hamburger inside backdrop-blur sticky header | iOS Safari GPU compositing layer intercepts touch events — structurally broken on real devices |
| `overflow-hidden` wrapper around mobile hamburger trigger | Clips touch area geometrically on iOS — even small border-radius values |
| `position: fixed` scroll lock without touchmove prevention | iOS Safari ignores `overflow: hidden` on body; requires active touchmove prevention |
| Percentage-based ScrollToTop threshold | Unreliable on short pages; flat pixel value is more predictable |
| Grey/cool shadows | Off-brand — everything must be warm |
| Pure black text | Too harsh — warmth requires slightly warm dark tones |
| Feature bullet points for brand pillars | SaaS/startup pattern — pillars must be felt, not listed |
| Timeline with dots/lines for Story | Generic nonprofit storytelling |
| Dashboard-style card grid for Trainers | Anti-pattern for this brand |

---

## 11. Integrations Roadmap

Build all sections UI-complete first. Then layer in order:

1. **Framer Motion** — scroll-triggered entrance animations, hover effects, parallax
2. **Supabase** — membership signups, events data, trainer profiles
3. **Razorpay** — membership payment flow (Pearl / Ruby / Jade tiers)
4. **Resend** — email confirmations after membership signup

---

## 12. Open Questions / Pending Decisions

- [ ] Story section: editorial card rotation vs. scroll-linked animation vs. static editorial layout
- [ ] Trainers section: tile-rhythm layout specifics and data source
- [ ] Events section: static placeholder vs. Supabase-driven data
- [ ] Instagram section: live API grid vs. static art-directed placeholder
- [ ] ScrollToTop mobile: scroll event not firing reliably on some devices — root cause still unresolved
- [ ] Font licensing: Playfair Display via Google Fonts (open license — likely fine for commercial use)

---

## 13. Continuity Notes for New Sessions

- Read this file before any implementation task
- Read `PROJECT_CONTEXT.md` for technical architecture and current file structure
- The emotional core is ALWAYS: *"Still centered around the same table."*
- Every section must feel like it belongs to the same cultural institution
- When in doubt: more restraint, warmer tones, less decoration, more story
- Mobile is tested on REAL devices (iPhone Safari + Android Chrome), not only desktop responsive mode
- The label+checkbox pattern for the mobile menu is intentional and must not be changed to button-based triggers
