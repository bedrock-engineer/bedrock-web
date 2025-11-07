# Bedrock Website

<figure style="margin-inline: block;">
  <img src="https://bedrock.engineer/bedrock.png" alt="Bedrock logo" width="200px"/>
</figure>

<h3 style="margin-inline: block;">Bedrock, the Open Source Foundation for Geotechnical Engineering</h3>

---

🌐 **Website:** <https://bedrock.engineer/>

📃 **Documentation:** <https://bedrock.engineer/getting-started>

📃 **API Reference:** <https://bedrock.engineer/reference/>

🖥️ **Source Code:** <https://github.com/bedrock-engineer/bedrock-ge>

🐍 **`bedrock-ge` on PyPI:** <https://pypi.org/project/bedrock-ge/>

🔗 **LinkedIn:** <https://www.linkedin.com/company/bedrock-engineer>

---

## Overview

> **Definition of Bedrock**
>
> In an abstract sense, the bedrock refers to the main principles something is based on. [1]
>
> In the real world, the bedrock is the hard area of rock in the ground that holds up the loose soil above. [1]
>
> In many civil engineering projects, the identification of the bedrock through digging, drilling or geophysical methods is an important task, which greatly influences (geotechnical) design. [2]
>
> Sources: [[1] Bedrock | Cambridge Dictionary](https://dictionary.cambridge.org/us/dictionary/english/bedrock), [[2] Bedrock | Wikipedia](https://en.wikipedia.org/wiki/Bedrock)

Ground Investigation (GI) data is often trapped in bespoke or legacy formats that limit analysis and visualization possibilities.
`bedrock-ge` lets you transform this data from specialized geotechnical formats and common tabular formats (Excel, CSV) into modern, standardized geospatial data.

This standardization lets you bridge the gap between raw geotechnical data, the modern Python (geo)scientific ecosystem and modern geospatial tools.
This gives geotechnical engineers greater flexibility in visualization, modeling, and integration across different software environments while avoiding vendor lock-in.
For example, this enables connecting your GI data with GIS as well as BIM environments through [platforms like Speckle](#-put-your-gi-data-into-speckle).

The purpose of Bedrock is NOT to become THE standard for geotechnical data, because [we don't need 15 instead of 14 competing standards](https://xkcd.com/927/).

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## API Reference Generation

The API reference documentation in `src/content/docs/reference/api/` is auto-generated from the bedrock-ge Python package using a custom zero-dependency Python script.

### Prerequisites

1. Ensure the bedrock-ge package is installed in your environment:
   ```bash
   uv add bedrock-ge  # Install the package to document
   ```

### Generating API Documentation

To regenerate the API reference documentation:

```bash
npm run docs:generate
```

This command runs `scripts/docs/generate_api_docs.py` which:

1. **Auto-discovers modules**: Automatically finds all modules in the bedrock-ge package
2. **Extracts documentation**: Reads docstrings, type annotations, and signatures using Python's `inspect` module
3. **Generates enhanced markdown**: Creates professional documentation with:
   - Parameter tables including **Type**, **Default**, and **Description** columns
   - Return type information with type annotations
   - Filtered content (excludes inherited methods from base classes like Pydantic/Pandera)
   - Starlight-compatible frontmatter with navigation disabled
4. **Outputs clean files**: Saves markdown files to `src/content/docs/reference/api/`

### Features

The generated documentation includes:

- **Professional styling**: Clean parameter tables with type hints and defaults
- **Auto-discovery**: No need to manually maintain module lists
- **Type annotations**: Full type information extracted from function signatures  
- **Filtered inheritance**: Only shows methods/attributes defined in your classes, not inherited framework code
- **Zero dependencies**: Uses only Python standard library (`inspect`, `importlib`, `pathlib`)
- **Starlight integration**: Perfect integration with navigation and theming

### Configuration

The generation script is located at `scripts/docs/generate_api_docs.py` and requires no external configuration files. It automatically:

- Discovers all modules in the bedrock-ge package
- Filters out private members (starting with `_`)
- Excludes inherited methods from base classes
- Formats type annotations for readability
- Adds proper Starlight frontmatter

The generated files automatically integrate with Starlight's navigation via the "API Reference" link in the sidebar and the `autogenerate: { directory: "reference" }` setting in `astro.config.mjs`.
