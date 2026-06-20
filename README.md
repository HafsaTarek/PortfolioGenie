# PortfolioGenie — Portfolio Content Editor

A pixel-matched, production-ready React implementation of the "Portfolio Content"
dashboard (About Me / Skills / Projects editor with a Content Score, SEO Score and
Quick Tips sidebar).

## 1. Project structure

```
portfoliogenie/
├── index.html                      Vite entry HTML (loads Inter font, sets viewport/meta)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                    React root, imports global token/reset CSS
    ├── App.jsx                     Top-level page: Header + PageHeader + PortfolioContent
    ├── App.module.css
    ├── styles/
    │   ├── tokens.css              Design tokens: color, type, spacing, radius, shadow, motion
    │   └── reset.css                Minimal CSS reset + base element styles + a11y helpers
    ├── data/
    │   └── mockData.js             Mock content (user, nav links, about/skills/projects, scores)
    └── components/
        ├── icons/
        │   └── icons.jsx           Dependency-free inline SVG icon set
        ├── layout/
        │   ├── Header.jsx / .module.css        Top nav bar (logo, links, user menu, burger)
        │   ├── UserMenu.jsx / .module.css       Accessible avatar dropdown (click-out + Esc)
        │   ├── PageHeader.jsx / .module.css     "Portfolio Content" title + Preview button
        │   └── Sidebar.jsx / .module.css        Composes ScoreCard ×2 + QuickTipsCard
        ├── common/                  Generic, reusable building blocks
        │   ├── Button.jsx                       primary / outline / ghost / danger / icon-only
        │   ├── Card.jsx                          White rounded panel shell
        │   ├── SectionHeader.jsx                 Title + right-aligned action row
        │   ├── Field.jsx                         Labeled input/textarea + hint row
        │   ├── Tabs.jsx                          WAI-ARIA tabs w/ arrow-key navigation
        │   ├── ProgressBar.jsx                   Labeled metric bar (success/warning tone)
        │   ├── ScoreCard.jsx                     Content Score / SEO Score card
        │   ├── AITipBox.jsx                      Lavender "AI Tip" callout
        │   ├── QuickTipsCard.jsx                 Gradient "Quick Tips" sidebar card
        │   └── index.js                          Barrel export
        └── portfolio/                Feature-specific composition
            ├── AboutMeTab.jsx                    Headline, Biography, Interests, AI tip
            ├── SkillItem.jsx / SkillsTab.jsx      Editable skill rows + add/regenerate
            ├── ProjectCard.jsx / ProjectsTab.jsx  Repeating project editor cards
            └── PortfolioContent.jsx               Tabs + active panel + Sidebar grid
```

Every visual primitive (button, card, progress bar, score card, tip box, tab list,
input field) is its own component so the three tabs reuse the same building blocks
instead of duplicating markup/CSS.

## 2. Running it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build to dist/
```

## 3. How responsiveness was implemented

**Mobile-first tokens.** All spacing, radii, shadows and colors live in
`src/styles/tokens.css` as CSS custom properties, so every component pulls from one
source of truth — nothing is hand-typed twice.

**Fluid typography.** Headings and key text sizes use `clamp()` (e.g.
`--text-2xl: clamp(1.4rem, 1.25rem + 0.7vw, 1.875rem)`), so type scales smoothly
between breakpoints instead of jumping at fixed widths.

**Breakpoint strategy** (defined per-component, next to the styles they affect,
rather than one giant global stylesheet):

| Range | Behavior |
|---|---|
| `< 480px` (phone) | Single column everywhere. `PageHeader`'s Preview button goes full-width. Skill rows wrap the percentage onto its own line if needed. |
| `480–900px` (large phone / small tablet) | Header collapses to a logo + hamburger; nav links and the user's name move into a slide-down mobile panel (`max-height` transition, no layout shift). |
| `640–1023px` (tablet) | `Sidebar` switches to a 2-column grid (Content Score + SEO Score side-by-side, Quick Tips spanning full width) since there's now room, while the main editor stays single column. |
| `≥ 1024px` (laptop) | `PortfolioContent` becomes a CSS Grid: `1fr 320px` — main editor + fixed sidebar. |
| `≥ 1280px` (desktop) | Sidebar widens slightly to `340px` and inter-column gap increases for breathing room on large monitors. |

**Layout primitives.** Two-column areas (`PortfolioContent`, `Sidebar`) use **CSS
Grid** for the macro layout; everything inside a card (header rows, button groups,
form fields) uses **Flexbox** with `flex-wrap` so content reflows instead of
overflowing.

**No horizontal scroll.** `overflow-x: hidden` is set on `html`/`body`/`#root` as a
safety net; the real fix is that every row-based layout (`SectionHeader` actions,
`PageHeader`, skill rows, header nav) uses `flex-wrap: wrap` plus `min-width: 0` on
flex children so long text/inputs shrink instead of pushing the viewport wider. The
tab list scrolls internally (`overflow-x: auto` with hidden scrollbar) only as a
last-resort safety net for very narrow screens — at the actual 3-tab content here it
never needs to.

**Responsive images.** The avatar is a fixed-aspect circular image with
`object-fit: cover`, so it never distorts regardless of the source image's
dimensions.

**Accessibility.** Tabs follow the WAI-ARIA Tabs pattern (`role="tablist"/"tab"/"tabpanel"`,
roving `tabIndex`, arrow/Home/End key support). All icon-only buttons (delete, edit)
have `aria-label`s. Inputs use `<label htmlFor>` pairings. Progress bars expose
`role="progressbar"` with `aria-valuenow/min/max`. The mobile menu and user dropdown
manage `aria-expanded`/`aria-haspopup`, close on outside-click and `Escape`, and all
interactive elements have a visible `:focus-visible` ring. `prefers-reduced-motion`
is respected globally.

## 4. Notes on the mock data

`src/data/mockData.js` holds placeholder content matching the screenshots (skills,
two sample projects, score breakdowns, quick tips). In a real app this file would be
replaced by data fetched from your backend; every component already accepts that
shape as props, so wiring up a real API only means swapping the import in `App.jsx`
for a fetch/query result.
=======
# Follow these simple steps to get the exact frontend branch running on your machine:

### 1. Download and Switch to the Frontend Branch
Open your terminal in your main workspace folder and run:

```bash
# 1. Clone the project
git clone [https://github.com/HafsaTarek/PortfolioGenie.git](https://github.com/HafsaTarek/PortfolioGenie.git)

# 2. Go into the project folder
cd PortfolioGenie

# 3. Switch to the frontend branch
git checkout frontend


# ▶️ Running The Project

## Frontend

```bash
cd client
npm install
npm run dev
```
