# Style Guide

How styling works in this repo, and where a new style belongs. The lint guard
rails (ESLint `better-tailwindcss`, Stylelint) enforce the mechanical parts;
this document records the decisions behind them.

## Styling layers

Styles live in exactly one of four places. Work top-down: use the highest
layer that can express what you need.

1. **Design tokens** — `tokens/*.json`, compiled to `src/styles/tokens.css`
   by `npm run tokens:build`. Never edit `tokens.css` by hand. Every color,
   size, radius, shadow, duration, and type/space step is defined here once.
2. **Global element defaults and shared classes** — `src/styles/custom.css`.
   Element defaults (`h1`–`h4` get the condensed family, `p` gets
   `text-wrap: pretty`) and classes reused across pages (`.heading-*`,
   `.paragraph`, `.badge`, `.eyebrow`, `.feature-list`, `.cta-button*`,
   `.card-surface`, `.section`/`.section-wrapper`, `.inline-link`).
3. **Scoped component styles** — `<style>` in `.astro` files, or a CSS file
   next to a component (`DropdownMenu.css`, `animated-tabs.css`). These state
   **deltas only**: what this component changes relative to layers 1–2. Never
   re-declare what an element already gets globally (e.g. `font-family` on an
   `h3`) and never redefine a shared class's look locally.
4. **Tailwind utilities** — one-off layout in markup: `flex`, `gap-4`,
   `mbs-6`. If the same utility combination appears three or more times,
   promote it to a class in layer 2 or 3. Arbitrary values and arbitrary
   variants are banned by ESLint; if a value is worth an arbitrary utility,
   it is worth a token.

A class name is owned by the layer that defines it. `Link.astro` owns
`.link`; the global stylesheet's plain-markup link is `.inline-link`. Never
define the same class name in two layers — Astro scopes with `:where()`
(zero specificity), so the winner would be decided by bundle order.

## Color

Written in `oklch()`. Hex, `rgb()`, and `hsl()` are banned by Stylelint.
Use hue `0` (not `none`) for grays and whites until stylelint-gamut's
bundled colorjs.io supports `none`; nothing may feed these into
`color-mix()` meanwhile.

Three token layers, used in this order:

1. **Semantic tokens** (`--color-text`, `--color-surface-overlay`,
   `--color-primary`, `--color-focus`, …) — use these whenever one exists
   for the *role* you are styling: body text, muted text, a raised or
   tinted surface, a default border, the brand action color, a focus ring.
2. **Raw scale steps** (`--green-7`, `--gray-4`, `--gray-6`) — allowed when
   no semantic token covers the role, typical for Radix-style fine-grained
   states: hover borders (`green-7`/`green-8`), pressed backgrounds
   (`gray-4`/`gray-5`), hairline separators (`gray-6`).
3. **Fixed palettes** (`--color-footer-*`, `--color-inverted-*`) — for
   regions that deliberately do not follow the theme (footer, hero
   overlays).

Focus rings are always `var(--color-focus)` (teal), never a green. The
teal is intentional: it stays visible against the green-heavy UI.

### Dark mode

`color-scheme` follows `data-theme` (set in `custom.css`); tokens carry
both values. For a one-off two-color swap (e.g. an inline SVG logo's fill)
use `light-dark(lightValue, darkValue)` — not a `:root:not([data-theme])`
override rule. Raster images that need a dark variant use `filter` (see
`WorkedWith.astro`) because there is no fill to swap.

## Typography

- `h1`–`h4` get the condensed family, weight, and `text-wrap: balance`
  globally. Scoped styles never re-declare `font-family` on headings.
- Page-level headings use `.heading-1`–`.heading-4` (fluid size, leading,
  and default block-end margin).
- Card and tile titles are the one sanctioned exception: an `h2`/`h3` with
  a component class setting `--text-xl` (or `--heading-4` on DemoCard) and
  weight 600, margin handled by the card's `gap`.
- Font sizes always come from tokens (`--text-*`, `--heading-*`), never
  raw `px`/`rem`. `--text-base` and `--text-sm` are static on purpose (UI
  chrome anchors at 1rem); `--text-lg` and up are fluid.
- Prose width is `--measure` (default) or `--measure-narrow` (cards,
  callouts, columns). The `--container-*` tokens are **layout region**
  widths — never use them as a text measure.

## Spacing

- Inside components, the parent sets spacing with `gap`; children carry no
  block margins of their own.
- In prose, the `.heading-*` classes own the rhythm below a heading, and
  `.prose-container` spaces paragraphs and lists. Don't stack `mbs-*`
  utilities on top of that rhythm; use them only where no class owns the
  spacing.
- Spacing values come from the fluid `--space-*` scale.

## Primitives

- **Radius:** `--border-radius-xs` (2px, the sharp brand corner: links,
  CTA buttons), `-sm` (4px: badges, chips, inline code), `-md` (8px:
  cards, popovers), `-lg` (16px: hero surfaces). `9999px` is reserved for
  deliberate pills (tabs, tag chips).
- **Shadows:** `--shadow-sm` / `--shadow-md` / `--shadow-lg`. No
  hand-rolled `box-shadow` values.
- **Motion:** durations from `--duration-instant/fast/normal/slow`,
  easing from `--ease-out` / `--ease-in-out`. Never `ease-in`, never
  `transition: all`. A deliberate exception (the ThemeToggle's overshoot
  spring) carries a comment saying so.

## Interaction states

Every interactive element has all four, in this shape:

- `:hover` styles live inside `@media (hover: hover) and (pointer: fine)`
  (Tailwind's `hover:` variant gates itself).
- `:active` gives press feedback (color/background shift, or `scale`
  0.95–0.98 on buttons).
- Focus is `:focus-visible` with an `outline` in `var(--color-focus)`.
  Never `outline: none`; a component that draws its own ring keeps a
  transparent outline so forced-colors mode can repaint it.
- Transitions that move or scale something sit inside
  `@media (prefers-reduced-motion: no-preference)`; color and opacity
  fades may run unconditionally.

## Layout

- Prefer intrinsic layout over breakpoints: `repeat(auto-fit, minmax(min(100%,
  Nrem), 1fr))` grids, flex sidebar pairs that wrap on their own
  (`flex-basis` + `flex-grow: 999` + `min-inline-size`), and `clamp()` for
  anything that scales with the viewport.
- Media queries that must exist and mirror a token value (the `1200px` ==
  `--container-md` section-border breakpoint) say so in a comment — media
  queries cannot read custom properties, so the sync is manual.
- Logical properties only: `margin-block-start`, `inset-inline-end`,
  `mbs-*`/`pe-*` utilities — never `top`/`left`/`mt-*`/`pr-*`.

## Variants

Style variants and states use `data-*` attributes
(`[data-variant="solid"]`, `[data-pressed]`) or ARIA state attributes
(`[aria-checked="true"]`, `[aria-current="page"]`) — not BEM-style
modifier classes.
