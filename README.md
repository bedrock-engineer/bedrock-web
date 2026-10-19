# Bedrock Website

<a href="https://bedrock.engineer">
<img src="https://bedrock.engineer/Bedrock_TextRight.png" width="300px" alt="Bedrock Logo" />
</a>

Source for <https://bedrock.engineer>: the Bedrock marketing site, demos, and the documentation for Bedrock's open-source packages.

🌐 **Website:** <https://bedrock.engineer/>

📃 **Documentation:** <https://bedrock.engineer/docs/>

🖥️ **GitHub organization:** <https://github.com/bedrock-engineer>

🔗 **LinkedIn:** <https://www.linkedin.com/company/bedrock-engineer>

## Stack

- [Astro](https://astro.build) with [Starlight](https://starlight.astro.build) for the docs
- React islands (with React Aria Components) for interactive demos
- Tailwind CSS 4 plus plain CSS in `src/styles/`
- Content in MDX and Markdoc; MDX pages can embed reactive [marimo](https://marimo.io) cells that run Python in the browser via Pyodide
- Deployed to Cloudflare as a static build (no SSR adapter): `astro build` produces `./dist`, `wrangler deploy` uploads it as static assets per `wrangler.jsonc`

## Project structure

| Path                    | Contents                                                                                             |
| :---------------------- | :--------------------------------------------------------------------------------------------------- |
| `src/pages/`            | Marketing pages (`index`, `services`, `demos`, `tools`, …), Dutch pages under `nl/`, OG image routes |
| `src/content/docs/docs/`| Starlight docs, one directory per package, plus shared `concepts/`                                    |
| `src/data/demos.ts`     | Single source of truth for demo/tool cards; pages map over it                                         |
| `src/components/`       | Astro and React components                                                                            |
| `scripts/docs/`         | Python script that generates the bedrock-ge API reference                                             |

## Documentation structure

Docs are organized per package using [starlight-sidebar-topics](https://github.com/HiDeoo/starlight-sidebar-topics): each open-source package gets its own sidebar topic with a switcher at the top. Current topics:

- **cpt-anywidget** — Python widget for CPT data, with live marimo examples
- **bro-xml-parser** — TypeScript parser for BRO XML
- **bedrock-ge** — Python package for ground investigation data ([PyPI](https://pypi.org/project/bedrock-ge/), [source](https://github.com/bedrock-engineer/bedrock-ge))
- **Concepts** — package-independent background reading (GI data to geospatial, open standards, formats like AGS4 and GEF)

To add a package: create `src/content/docs/docs/<package>/` and add a topic entry in `astro.config.mjs`.

## Commands

All commands are run from the root of the project:

| Command                 | Action                                                      |
| :---------------------- | :---------------------------------------------------------- |
| `npm install`           | Install dependencies                                        |
| `npm run dev`           | Start local dev server at `localhost:4321`                  |
| `npm run build`         | Build the production site to `./dist/`                      |
| `npm run build:all`     | Regenerate the API reference, then build                    |
| `npm run preview`       | Preview the build locally before deploying                  |
| `npm run deploy`        | Build and deploy to Cloudflare via Wrangler                 |
| `npm run docs:generate` | Regenerate the bedrock-ge API reference (requires `uv`)     |
| `npm run lint`          | ESLint                                                      |
| `npm run format`        | Prettier                                                    |
| `npm run stylelint`     | Stylelint over CSS and Astro files                          |
| `npm run knip`          | Find unused files, dependencies, and exports                |

## API reference generation

The bedrock-ge API reference in `src/content/docs/docs/bedrock-ge/reference/API/` is auto-generated from the bedrock-ge Python package by `scripts/docs/generate_api_docs.py`, a zero-dependency Python script run through `uv` (the package itself is declared in `pyproject.toml`):

```bash
npm run docs:generate
```

The script auto-discovers modules in bedrock-ge, extracts docstrings and type annotations, and writes markdown with parameter tables. The generated files are picked up by the `autogenerate` entries in the bedrock-ge sidebar topic in `astro.config.mjs`. This only needs re-running when the bedrock-ge package changes; day-to-day site work can use `npm run build`.

## License

The source code is licensed under the Apache License 2.0. The documentation and other website content are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The Bedrock name, logo and other brand assets are © Bedrock Technologies B.V., all rights reserved. See [LICENSE](LICENSE) for details.
