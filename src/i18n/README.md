# i18n Setup

This directory contains the internationalization (i18n) setup for marketing pages.

## Structure

```
src/
├── i18n/
│   ├── ui.ts              # Main config & re-exports
│   ├── utils.ts           # Helper functions
│   └── pages/             # Translation files per page
│       ├── about.ts
│       ├── mission.ts
│       └── ...
├── components/pages/      # Page components (HTML/markup)
│   ├── AboutPage.astro
│   ├── MissionPage.astro
│   └── ...
└── pages/
    ├── about.astro        # EN route
    ├── mission.astro      # EN route
    └── nl/
        ├── about.astro    # NL route
        ├── mission.astro  # NL route
        └── ...
```

## Pattern: Zero HTML Duplication

**Key concept**: Page markup lives in components, route files are minimal wrappers.

## Adding a New Page

### 1. Create Translation File

Create `src/i18n/pages/yourpage.ts`:

```typescript
export const ui = {
  en: {
    title: "Your Page Title",
    intro: "Your intro text...",
  },
  nl: {
    title: "Jouw Paginatitel",
    intro: "Jouw introtekst...",
  },
} as const;
```

Export from `src/i18n/ui.ts`:

```typescript
export { ui as yourpage } from "./pages/yourpage";
```

### 2. Create Page Component

Create `src/components/pages/YourPageContent.astro`:

```astro
---
interface Props {
  t: any; // translations object
}
const { t } = Astro.props;
---

<div class="page">
  <h1>{t.title}</h1>
  <p>{t.intro}</p>
  <!-- All your HTML here -->
</div>

<style>
  /* Scoped styles here */
</style>
```

### 3. Create Route Files

Create `src/pages/yourpage.astro` (English):

```astro
---
import Navbar from "../components/Navbar.astro";
import Footer from "../components/Footer.astro";
import BaseLayout from "../layouts/BaseLayout.astro";
import YourPageContent from "../components/pages/YourPageContent.astro";
import { yourpage } from "../i18n/ui";
import { useTranslations } from "../i18n/utils";

const t = useTranslations(Astro.url, yourpage);
---

<BaseLayout>
  <Navbar />
  <YourPageContent t={t} />
  <Footer />
</BaseLayout>
```

Create `src/pages/nl/yourpage.astro` (Dutch):

```astro
---
import Navbar from "../../components/Navbar.astro";
import Footer from "../../components/Footer.astro";
import BaseLayout from "../../layouts/BaseLayout.astro";
import YourPageContent from "../../components/pages/YourPageContent.astro";
import { yourpage } from "../../i18n/ui";
import { useTranslations } from "../../i18n/utils";

const t = useTranslations(Astro.url, yourpage);
---

<BaseLayout>
  <Navbar />
  <YourPageContent t={t} />
  <Footer />
</BaseLayout>
```

## How It Works

- **English routes**: `/about`, `/mission` (no prefix)
- **Dutch routes**: `/nl/about`, `/nl/mission`
- Language picker in navbar switches between them
- HTML lives in ONE component, zero duplication
- Route files are tiny wrappers (~10 lines)

## Examples

- Component: `src/components/pages/AboutPage.astro`
- EN route: `src/pages/about.astro`
- NL route: `src/pages/nl/about.astro`
