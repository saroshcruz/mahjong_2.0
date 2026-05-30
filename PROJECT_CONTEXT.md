# PROJECT_CONTEXT.md — Indian Mahjong Association

**Technical single source of truth.**
Read alongside `IMA_DESIGN_RECORD.md` before every task.
Update when architecture, file structure, or section status changes.

Last updated: 2026-05-19

---

## Stack

| Layer | Technology | Status |
|---|---|---|
| Framework | Next.js 16.2.6 (App Router) | Active |
| Language | TypeScript | Active |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, no config file) | Active |
| Fonts | Playfair Display (headings), Inter (body) — Google Fonts via next/font | Active |
| Animation | Framer Motion | Planned — not installed |
| Backend/DB | Supabase | Planned — not installed |
| Payments | Razorpay | Planned — not installed |
| Email | Resend | Planned — not installed |
| Deployment | Vercel | Active |

> **AGENTS.md Warning:** This is Next.js 16 — APIs, conventions, and file structure differ significantly from training data. Read `node_modules/next/dist/docs/` before writing any framework-specific code.

---

## File Structure

```
src/
  app/
    layout.tsx         — Root layout: Playfair + Inter fonts wired, cream bg, metadata
    page.tsx           — Assembles all sections + ScrollToTop
    globals.css        — CSS variables, paper-grain utility, hero-fade-mask utility
    favicon.ico
  sections/
    Navbar/
      Navbar.tsx       — BUILT ✓ (desktop pill + mobile label/checkbox drawer)
    Hero/
      Hero.tsx         — BUILT ✓ (two-column: text left, Vineeta portrait right)
    Footer/
      Footer.tsx       — BUILT ✓ (landscape bg image, 4-col grid, Razorpay trust line)
    Story/             — NOT YET BUILT
    Trainers/
      Trainers.tsx     — BUILT ✓ (featured + 4 supporting, CSS portrait placeholders)
    Membership/        — NOT YET BUILT
    Events/            — NOT YET BUILT
    Instagram/         — NOT YET BUILT
  components/
    ScrollToTop.tsx    — BUILT, partially working (see Known Issues)
  lib/                 — Not yet used

public/
  assets/
    logos/
      logo.jpeg        — IMA logo (square tile composition)
    founder/
      Vineeta.jpeg     — Founder portrait used in Hero
    footer/
      footer-landscape.png — Footer background image
```

---

## Sections Status

### ✓ Built

**Navbar** (`src/sections/Navbar/Navbar.tsx`)
- Desktop: floating sticky pill, `rounded-[2.35rem]`, cream backdrop-blur, IMA logo 64px, 5 nav links, "Join IMA" CTA
- Mobile: plain flat bar (no overflow-hidden, no backdrop-blur), `<label htmlFor="nav-drawer">` hamburger trigger, side drawer from right
- Drawer: 3 items only (Our Story / Membership / Trainers), X button fixed bottom-center 20% above edge
- Scroll lock: `body.style.position = "fixed"` + touchmove passive:false prevention

**Hero** (`src/sections/Hero/Hero.tsx`)
- Two-column: editorial text left, Vineeta portrait right
- Portrait: CSS mask-image elliptical fade, drop-shadow filter
- Atmospheric background: burgundy + gold radial glows, perimeter frame
- Mobile: single column, natural content height (no min-h)
- Desktop: `lg:min-h-[calc(100vh-6rem)]`

**Footer** (`src/sections/Footer/Footer.tsx`) — id="contact"
- Background: `/assets/footer/footer-landscape.png` at 70% opacity, jade wash overlay (#1b2f25 @ 38%)
- Grid: brand col (2fr) + Explore / Learn / About (1fr each) — `lg:grid-cols-[2fr_1fr_1fr_1fr]`
- Mobile tiers: Pearl · Ruby · Jade inline with separator (not vertical stack)
- Instagram: icon + `indianmahjongassociation` (no @ prefix)
- Bottom: copyright + Privacy + Refund Policy + "Payments secured by Razorpay" fine print

**ScrollToTop** (`src/components/ScrollToTop.tsx`)
- Fixed circle button, cream background, burgundy arrow, z-index 9999
- Mounts via `page.tsx` as last child of `<main>`
- See Known Issues — scroll detection unreliable on mobile

### ✗ Still To Build

Each section must be created as its own file and added to `src/app/page.tsx`.

| Section | File path | id | Notes |
|---|---|---|---|
| Story | Temporarily removed | Restore route/id only when rebuilt | Founder narrative, editorial card layout |
| Trainers | `src/sections/Trainers/Trainers.tsx` | `#trainers` | 5 trainers, tile-rhythm layout |
| Membership | `src/sections/Membership/Membership.tsx` | `#membership` | Pearl/Ruby/Jade tiers, Razorpay ready |
| Events | `src/sections/Events/Events.tsx` | `#events` | Poster feel, static or Supabase-driven |
| Instagram | `src/sections/Instagram/Instagram.tsx` | `#instagram` | Editorial grid, "coming soon" acceptable |

---

## Coding Conventions

- All colors as raw hex/rgba in Tailwind utilities — no Tailwind config tokens
- `aria-hidden="true"` on all decorative/ornamental divs
- `pointer-events-none` on all overlay/decorative layers
- Responsive: mobile-first, `lg:` breakpoint for two-column layouts
- Section wrapper pattern: `relative overflow-hidden` with inner `max-w-7xl mx-auto px-6 lg:px-16`
- No code comments — self-documenting class names
- No external icon libraries — inline SVG only
- Warm shadow rgba pattern: `rgba(110,79,47,0.XX)` for tea-brown base shadows
- Sticky header: `sticky top-0 z-50` — desktop only gets backdrop-blur

---

## Mobile Implementation Rules

- Always test on real devices (iPhone Safari + Android Chrome), not only desktop responsive mode
- Hamburger trigger: must be a `<label htmlFor="...">` pointing to a hidden checkbox — never a `<button>` inside an `overflow-hidden` or `backdrop-blur` ancestor (iOS Safari clips touch areas in those contexts)
- Scroll lock: `body.style.position = "fixed"` + `body.style.top = "-${scrollY}px"` + passive:false touchmove listener with `e.preventDefault()` — required because iOS Safari ignores `overflow:hidden` on body alone
- Fixed position elements: `position: fixed` works on iOS as long as no ancestor has `transform`, `filter`, `backdrop-filter`, or `perspective` active
- Mobile drawer z-index: backdrop z-[58], panel z-[59]
- Safe area insets: use `env(safe-area-inset-bottom)` for elements pinned to bottom on mobile

---

## Known Issues

| Issue | Component | Status | Notes |
|---|---|---|---|
| Scroll detection unreliable on mobile | `ScrollToTop.tsx` | Open | `window.scroll` event not firing on Android/iOS; component mounts correctly (confirmed via red debug dot); multiple fallback listeners tried (touchmove, visualViewport, document scroll, getScrollTop fallback) — none resolved it; root cause unknown |

---

## Integrations Roadmap

Do NOT install any of these until all sections are UI-complete.

1. **Framer Motion** — scroll-triggered entrance animations, hover effects, optional parallax
2. **Supabase** — membership signups (form → DB), events data, trainer profiles
3. **Razorpay** — membership payment flow linked to Pearl / Ruby / Jade tiers
4. **Resend** — transactional email confirmations post-signup

---

## Key Brand Copy (for placeholder use)

- Tagline: *"Still centered around the same table."*
- Founded: 1999
- Location: New Delhi, India
- Instagram: `indianmahjongassociation` — links to `https://www.instagram.com/indianmahjongassociation_/?hl=en`
- Email placeholder: hello@indianmahjongassociation.org
- Copyright: © 2026 Indian Mahjong Association
- Membership tiers: Pearl, Ruby, Jade
