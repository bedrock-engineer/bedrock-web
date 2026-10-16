# Bedrock Design System

The visual language of Bedrock.engineer: colors, typography, spacing, textures, and components. The source of truth is the **DTCG design-token files in `tokens/`** — the website's CSS is generated from them, and the same files can be imported into Figma and other apps.

## Philosophy

- **Tokens are generated** — edit `tokens/*.json`, run `npm run tokens:build`, never edit `src/styles/tokens.css` by hand
- **Fluid by default**: typography and spacing scale smoothly across viewport sizes using clamp() (inspired by [Utopia](https://utopia.fyi/))
- **No hard breakpoints**: layouts adapt naturally without explicit media queries where possible
- **Semantic spacing**: named variables (--space-m, --space-l) rather than magic numbers
- **Component variants via data attributes**: `data-variant="arrow"` / `data-layout="compact"` with CSS nesting — never BEM-style `--` modifier classes
- **Radix UI colors only**: all theme colors reference the Radix scales (--green-9, --gray-2, …) or the semantic aliases built on them
- **Tailwind for small containers, vanilla CSS for complex layouts**: simple flex/grid → Tailwind utilities; complex grids with minmax(), variants, and state → vanilla CSS

## Token pipeline

```
tokens/
  bedrock.resolver.json        ← composes the sets below (DTCG Resolver, version 2025.10)
  color/
    scales.light.tokens.json   ← Radix green/gray/brown/teal 1–12 + a1–a12 + contrast, light
    scales.dark.tokens.json    ← same token names, dark values
    semantic.tokens.json       ← aliases (color.text → {color.gray.12}) + fixed palettes
  typography.tokens.json       ← heading/text sizes, leading, font families & weights
  space.tokens.json            ← fluid space scale + semantic spacing
  size.tokens.json             ← containers, measures, border radii
  shadow.tokens.json           ← shadow.sm/md/lg
  duration.tokens.json         ← motion durations

terrazzo.config.mjs            ← Terrazzo config (@terrazzo/cli + @terrazzo/plugin-css)
src/styles/tokens.css          ← GENERATED output, committed; imported by custom.css
```

Commands:

- `npm run tokens:build` — regenerate `src/styles/tokens.css` (also runs as part of `npm run build`)
- `npm run tokens:check` — lint the token files

**Light/dark modes**: the resolver's `theme` modifier maps light to bare `:root` and dark to `:root[data-theme="dark"]`. Only the raw color scales differ per mode; semantic aliases resolve through `var()` at runtime. Terrazzo also emits `@media (color-gamut: p3/rec2020)` fallback blocks automatically.

**Fluid and ch-width values**: DTCG has no fluid type, so those tokens carry the exact CSS in `$extensions["engineer.bedrock.css"]` (with `min`/`max` for fluid ones), while `$value` holds a spec-valid static equivalent (the desktop max, or a px approximation for ch widths). The CSS plugin's `transform` emits the extension value; design tools read `$value`.

**Figma**: import the token files with the Figma variables import / Tokens Studio. The light/dark contexts map to variable modes; `scales.*` become a Primitives collection, `semantic.tokens.json` a second collection of aliases.

## Color

Four Radix scales, each 1–12 plus alpha variants (a1–a12) and a `contrast` color: **green** (brand), **gray** (neutrals), **brown** (secondary/warm), **teal** (focus/accent).

**Scale guide** (applies to all hues):

- `1–3`: lightest backgrounds
- `4–6`: subtle borders, overlays
- `7–8`: UI component borders/hovers
- `9–10`: interactive elements, primary actions — **green-9 `oklch(56.2% 0.0594 140.8)` / `#627e5d` is the brand color**
- `11–12`: text, high contrast

**Use the semantic aliases in components**, not raw scale steps, wherever one fits:

| Token                                                          | Alias of                | Use                         |
| -------------------------------------------------------------- | ----------------------- | --------------------------- |
| `--color-text`                                                 | gray-12                 | Body text                   |
| `--color-text-muted`                                           | gray-11                 | Secondary text              |
| `--color-text-subtle`                                          | gray-9                  | De-emphasized text          |
| `--color-surface`                                              | gray-1                  | Page/section background     |
| `--color-surface-raised`                                       | gray-2                  | Cards, nav                  |
| `--color-surface-overlay`                                      | gray-3                  | Hover fills, code chips     |
| `--color-border`                                               | gray-5                  | Standard borders            |
| `--color-border-subtle`                                        | gray-4                  | Light borders (cards)       |
| `--color-border-strong`                                        | gray-7                  | Prominent borders           |
| `--color-primary`                                              | green-9                 | Primary actions             |
| `--color-primary-hover`                                        | green-10                | Hover state                 |
| `--color-primary-text`                                         | green-11                | Links, tinted text          |
| `--color-primary-subtle`                                       | green-3                 | Tinted backgrounds (badges) |
| `--color-primary-contrast`                                     | green-contrast (#fff)   | Text on primary             |
| `--color-focus`                                                | teal-10                 | Focus rings                 |
| `--color-shadow` / `--color-shadow-strong` / `--color-overlay` | fixed oklch black-alpha | Shadows, modal overlays     |
| `--color-background`                                           | fixed per theme         | `<body>` background         |

**Fixed palettes** (do not change with theme):

- `--color-footer-*` (bg, border, text, text-muted, link) — the footer is intentionally always dark
- `--color-inverted-button-*` (bg, bg-hover, text) — buttons on always-dark imagery (hero)

Dark mode is driven by `data-theme` on `<html>`: `BaseLayout.astro` SSRs `data-theme="dark"`, `ThemeToggle.astro` persists the choice in `localStorage("theme")`.

## Typography

**Families** (declared in Tailwind's `@theme` block in custom.css so `font-sans` / `font-condensed` / `font-mono` utilities work; also in `tokens/typography.tokens.json` for Figma):

- `--font-sans` — IBM Plex Sans (body; weights 400–700 + italics)
- `--font-condensed` — IBM Plex Sans Condensed (headings h1–h4)
- `--font-mono` — IBM Plex Mono (code, tabular values)

Never synthesize styles: all real weights are loaded via @fontsource and `font-synthesis: none` is set globally.

**Fluid type scale** (375px → 1440px):

```css
--heading-display: clamp(
  1.8rem,
  1.75rem + 2.4vw,
  4rem
); /* hero only — wider range */
--heading-1: clamp(2.5rem, 1.5rem + 4vw, 4rem); /* 40px → 64px */
--heading-2: clamp(2rem, 1.4rem + 2.4vw, 2.8rem); /* 32px → 44.8px */
--heading-3: clamp(1.5rem, 1.2rem + 1.2vw, 2rem); /* 24px → 32px */
--heading-4: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem); /* 20px → 24px */

--text-xl: clamp(1.125rem, 1rem + 0.5vw, 1.25rem); /* 18px → 20px */
--text-lg: clamp(1rem, 0.95rem + 0.2vw, 1.125rem); /* 16px → 18px */
--text-base: 1rem;
--text-sm: 0.875rem;
--text-xs: 0.75rem;
```

**Line heights**: `--leading-tight` 1.25 · `snug` 1.375 · `normal` 1.5 · `relaxed` 1.625 · `loose` 1.75
**Weights**: `--font-normal` 400 · `--font-medium` 500 · `--font-semibold` 600 · `--font-bold` 700

**Utility classes** (custom.css):

```astro
<h1 class="heading-1">Page Title</h1>
<p class="paragraph">Standard body (fluid 16→18px, 60ch max-width)</p>
<p class="paragraph-xl">Intro text (fluid 18→20px)</p>
<p class="paragraph-sm">Small text (16px, no max-width)</p>
<p class="subtitle">UPPERCASE KICKER ABOVE/BELOW H1</p>
<span class="badge">Featured by Cesium</span>
<!-- data-variant="solid" for filled -->
```

## Spacing & sizing

**Fluid space scale** (Utopia-style, 375px → 1440px):

```css
--space-3xs: 4px → 5px --space-s: 16px → 20px --space-xl: 48px → 60px
  --space-2xs: 8px → 10px --space-m: 24px → 30px --space-2xl: 64px → 80px
  --space-xs: 12px → 15px --space-l: 32px → 40px --space-3xl: 96px → 120px;
```

**One-up pairs** for spacing that varies more dramatically: `--space-3xs-2xs` … `--space-2xl-3xl` (e.g. `--space-m-l`: 24px → 40px).

**Semantic spacing**: `--section-padding-block` (xl) · `--section-padding-inline` (m-l) · `--card-padding` (m) · `--card-gap` (l) · `--grid-gap` (m-l).

**Containers & measures**:

```css
--container-narrow: 60ch; /* prose */
--measure: 50ch; /* paragraph width */
--container-md: 1200px; /* sections */
--measure-narrow: 40ch; /* cards, callouts */
--container-wide: 1480px; /* full width */
```

**Border radius**: `--border-radius-sm` 4px (badges, inline code) · `--border-radius-md` 8px (cards, buttons) · `--border-radius-lg` 16px (hero card). Pills use literal `9999px`.

## Shadows & motion

**Shadows**: `--shadow-sm` (badges) · `--shadow-md` (dropdowns, mobile nav) · `--shadow-lg` (modals, uses `--color-shadow-strong`).

**Durations** — always via token, always gated behind `@media (prefers-reduced-motion: no-preference)`:

```css
--duration-instant: 100ms; /* pressed states, form feedback */
--duration-fast: 150ms; /* color/background hovers */
--duration-normal: 200ms; /* borders, transforms, slide-ins */
--duration-slow: 300ms; /* image zooms, large surfaces */
```

## Components

### Card (`src/components/Card.astro`)

Polymorphic card — renders `<a>` when `href` is set, else `<div>`. Base surface comes from the global `.card-surface` class (flex column, gray-2 background, subtle border).

- `variant`: `default` | `featured` (gray-1 bg, stronger border) | `interactive` (pointer, hover border)
- `size`: `small` | `medium` | `large` (grid-column span)
- `href`, `class`; extra `data-*` attributes are spread onto the element

### DemoCard (`src/components/DemoCard.astro`)

Media card for demos: image or iframe + title/description/links, optional `badge` (rendered as solid `.badge`), filter metadata (`country`, `type`, `sourceData`, `gm`) exposed as data attributes, and view-transition names per `id`. Composes the same `.card-surface` base.

### Link (`src/components/Link.astro`)

- `variant`: `default` (underlined) | `arrow` (animated → on hover) | `email` (bold, underline on hover)
- `external` auto-detected from `http` prefix → `target="_blank" rel="noopener noreferrer"`

### TeamMember (`src/components/TeamMember.astro`)

- `variant="compact"`: landing-page grid card — grayscale round portrait, name, bio; stacks via container query (`team-grid` container, declared by the page grid)
- `variant="expanded"`: about-page layout — 200px photo column, social-link buttons (`socials` prop: `{href, label, icon}` with Starlight icon names), bio as slot content

### DetailsList (`src/components/DetailsList.astro`)

Key-value `<dl>` list. `items`: `{term, value}[]`; `direction`: `column` (about-page company info) | `row` (terms-page legal details).

### CTA buttons (classes, not a component)

```astro
<a href="…" class="cta-button">Primary</a>
<a href="…" class="cta-button-secondary">Secondary</a>
<!-- on always-dark imagery (hero): -->
<a href="…" class="cta-button-inverted">Primary</a>
<a href="…" class="cta-button-secondary-inverted">Secondary</a>
```

### Layout components

- **Navbar.astro** — sticky bar; desktop links and mobile popover share one link style; hamburger is anchor-positioned where supported
- **Footer.astro** — always dark (`--color-footer-*`), granite texture at 150px
- **ThemeToggle.astro** — triangle toggle, persists to `localStorage("theme")`, also overrides Starlight's toggle via astro.config

## Layout patterns

### Section-wrapper pattern

```astro
<div class="page">
  <div class="section-wrapper texture-607">
    <section class="section intro-section">
      <h1 class="heading-1">Page Title</h1>
      <p class="paragraph">Introduction</p>
    </section>
  </div>

  <div class="section-wrapper texture-232-k">
    <section class="section"><!-- content --></section>
  </div>

  <div class="section-wrapper texture-620">
    <section class="section cta-section">
      <h2 class="heading-2">Get Started</h2>
      <a href="…" class="cta-button">Contact us</a>
    </section>
  </div>
</div>
<Footer />
```

`.section-wrapper` is the full-width textured band (bordered, `--container-wide`); `.section` is the bordered content column (`--container-md`, section padding). `.intro-section` and `.cta-section` center their content.

### Textures

SVG grid patterns in `public/textures/`, applied with `.texture-*` classes. Rotate through them for visual rhythm (classic sequence: 607 → 232-K → 620 → repeat).

| Class              | File        | Size  | Typical use          |
| ------------------ | ----------- | ----- | -------------------- |
| `.texture-607`     | 607.svg     | 70px  | Intro sections       |
| `.texture-232-k`   | 232-K.svg   | 80px  | Content sections     |
| `.texture-616`     | 616.svg     | 80px  | Content sections     |
| `.texture-620`     | 620.svg     | 100px | CTA sections         |
| `.texture-667`     | 667.svg     | 120px | Loose grid           |
| `.texture-668`     | 668.svg     | 220px | Very loose grid      |
| `.texture-granite` | granite.svg | 150px | Footer (dense, dark) |

The SVG stroke colors adapt to dark mode via `prefers-color-scheme` inside the files. (`233-K.svg` and `685.svg` also exist in `public/textures/` but are not part of the site's texture set.)

### Grids

```astro
<!-- simple: Tailwind -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">…</div>

<!-- responsive auto-fit: global classes -->
<div class="grid-auto-fit">…</div>
<!-- minmax(min(320px,100%),1fr) -->
<div class="grid-auto-fit-narrow">…</div>
```

### Prose

```astro
<div class="prose-container">
  <!-- 60ch, centered, paragraph/list spacing -->
</div>
```

## Starlight integration

Docs pages run on Starlight. `custom.css` pins the cascade layer order (`properties, theme, base, starlight, components, utilities`) and maps the token system onto Starlight's variables (`--sl-color-accent`, `--sl-color-gray-*`, `--sl-text-*`, …) — that mapping block is hand-written and stays in custom.css. Starlight's ThemeToggle is replaced with ours in `astro.config.mjs`.

## Tailwind usage

Tailwind v4 runs via `@import "tailwindcss"` in custom.css — **there is no tailwind.config.js**. Theme extension lives in custom.css:

- `@theme` declares the three font families → `font-sans`, `font-condensed`, `font-mono` utilities
- `@theme inline` maps the green/gray scales → `bg-gray-3`, `text-green-11`, … (theme-reactive `var()` references)

**Tailwind's own design system is disabled where it could conflict with ours:**

- `--color-*: initial` removes the default palette — `bg-emerald-400` etc. don't exist; only the Bedrock scales and `white` generate color utilities
- `--text-2xl` … `--text-9xl` are removed — sizes beyond the scale don't exist; use the `heading-*` classes/tokens instead
- `text-xs`…`text-xl`, `leading-*`, `shadow-*`, and `font-*` utilities stay, but resolve to **our** tokens: tokens.css defines the same variable names unlayered at `:root`, which outranks Tailwind's `@layer theme` defaults
- Tailwind's spacing multiplier (`p-4`, `gap-8`), breakpoints (`md:`), and layout utilities are kept as-is — mechanics, not brand

Heuristics: Tailwind for small, simple containers (`flex flex-wrap gap-4 px-6`, `md:grid-cols-2`); vanilla CSS with nesting + data-attribute variants for components and complex grids.

## Verification workflow

After styling changes:

1. `npm run build` — must pass (includes `tz build`)
2. `npm run stylelint` and `npm run knip`
3. Undefined-var check: every `var(--…)` used in `src/` must be defined (tokens.css, custom.css, Tailwind `@theme`, `--sl-*`, or component-local)
4. Visual check: `npm run preview`, then `node scripts/screenshot-pages.mjs screenshots/<name> http://localhost:4321` screenshots all key routes in light/dark at 375/1440 for comparison against a baseline capture (requires `npm i --no-save puppeteer-core`)

## Tools & resources

- Utopia fluid calculators: https://utopia.fyi/type/calculator · https://utopia.fyi/space/calculator
- Radix Colors: https://www.radix-ui.com/colors
- Terrazzo: https://terrazzo.app
- DTCG spec: https://www.designtokens.org
- Example pages: `src/components/pages/LandingPage.astro` (hero, sections, team grid), `src/pages/demos.astro` (DemoCard grid, filters), `src/pages/mission.astro` (prose container)
