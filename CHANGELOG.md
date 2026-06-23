# CHANGELOG.md — Indian Mahjong Association

Lightweight session log. Record meaningful changes, key decisions, and known issues.
Format: Date → Change → Why → Files touched.

---

## 2026-06-23

### Staging — forced fresh deployment
**Why:** No-op deployment trigger for staging cache refresh after live payment verification.
**Files:** `CHANGELOG.md`

## 2026-05-19

### Navbar — refactored mobile menu to label/checkbox drawer
**Why:** Button-based hamburger inside a `backdrop-blur` sticky header was broken on real iPhone Safari and iPhone 12/17. iOS GPU compositing layer intercepts touch events on children of blurred sticky containers. Switched to `<label htmlFor="nav-drawer">` + hidden `<input type="checkbox">` — the most iOS-reliable interactive pattern. Side drawer slides from right (`translateX`). Scroll lock uses `body.style.position = "fixed"` + active touchmove prevention.
**Files:** `src/sections/Navbar/Navbar.tsx`

### Hero — replaced CSS illustration with Vineeta portrait
**Why:** CSS illustration of Mahjong table was technically correct but felt decorative rather than emotional. Vineeta's actual portrait carries the "Still centered around the same table" story more truthfully. CSS mask-image elliptical fade used instead of oval frame (oval frame signals "founder profile" regardless of execution).
**Files:** `src/sections/Hero/Hero.tsx`

### Footer — redesigned from CSS gradient to background image
**Why:** Landscape background image (`footer-landscape.png`) with jade wash overlay is richer and more editorial than the previous pure CSS jade-to-burgundy gradient.
**Files:** `src/sections/Footer/Footer.tsx`

### Footer — multiple small refinements
- Instagram link updated to correct URL with `_` suffix
- Instagram handle displays without `@` prefix
- Membership tiers (Pearl · Ruby · Jade) display inline on mobile with `·` separator instead of vertical stack
- "Payments secured by Razorpay" trust line added below copyright
- Reduced bottom spacing below Razorpay line
**Files:** `src/sections/Footer/Footer.tsx`

### ScrollToTop — added, mobile scroll detection unresolved
**Why:** Scroll-to-top button requested. Component mounts and renders correctly on all devices (confirmed via red debug dot). Fixed positioning works. However, scroll event (`window.scroll`, `touchmove`, `visualViewport`, `document.scroll`, `getScrollTop` fallback) does not reliably update visibility state on real Android/iPhone. Root cause unknown — possibly related to body scroll lock interfering with event propagation. Currently ships as a debug build.
**Files:** `src/components/ScrollToTop.tsx`, `src/app/page.tsx`

### Documentation — consolidated to 3 files
Deleted `PROJECT_MEMORY.md` (stale, superseded) and `IMA_DESIGN_SYSTEM.md` (merged into design record).
Renamed `DESIGN_MEMORY.md` → `IMA_DESIGN_RECORD.md` as the single design source of truth.
Cleaned `PROJECT_CONTEXT.md` to purely technical content.
**Files:** `IMA_DESIGN_RECORD.md`, `PROJECT_CONTEXT.md`, `CHANGELOG.md`
