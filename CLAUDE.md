# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a marketing and documentation website for Bedrock, built with Astro and Starlight. Bedrock (`bedrock-ge`) is an open-source Python library that transforms ground investigation (GI) data from various specialized and common formats into structured, standardized geospatial data. The library serves as a bridge between legacy geotechnical data formats and modern Python-based analysis workflows.

**Core Functionality**:
- **Data Reading**: Imports from specialized formats (AGS3/4, GEF, DIGGS) and common formats (Excel, CSV, JSON)
- **Data Validation**: Uses pandera-based validation to ensure data consistency and relationships
- **Data Transformation**: Converts raw data into pandas DataFrames, then to GeoPandas GeoDataFrames
- **Data Export**: Outputs to modern geospatial formats (GeoPackage, GeoJSON, GeoParquet) and traditional formats

The site serves dual purposes:
1. Marketing site for Bedrock company and consultancy services
2. Educational content about the benefits of structured, geospatial data (important for this niche market)

**Target Audience**: Primary users are geotechnical engineers with basic-to-intermediate Python skills who need to work with subsurface data. Secondary users include GIS specialists, mining engineers, and computational designers working with geological data.

## Architecture

- **Framework**: Astro + Starlight (documentation-focused theme)
- **Content**: MDX files in `src/content/docs/` with automatic routing
- **Configuration**: `astro.config.mjs` contains Starlight configuration including sidebar navigation
- **Content Schema**: `src/content.config.ts` defines the docs collection using Starlight's schema
- **Assets**: Images stored in `src/assets/`, static assets in `public/`

The site uses Starlight's conventions:
- Documentation pages are `.md` or `.mdx` files in `src/content/docs/`
- Navigation is configured in `astro.config.mjs` sidebar property
- Hero page uses the `template: splash` layout with card grid components

## Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |
| `npm run astro ...` | Run Astro CLI commands |
| `uv add <package>` | Add Python dependencies (always use uv for Python packages) |
| `uv run <command>` | Run Python commands in the uv environment |

## Content Management

- Main landing page: `src/content/docs/index.mdx` (splash template)
- Guide pages: `src/content/docs/guides/`
- Reference docs: `src/content/docs/reference/` (auto-generated in sidebar)
- Hero image: `src/assets/bedrock.png`
- Site configuration: `astro.config.mjs` (title, social links, sidebar structure)
- **Documentation Framework**: Follows the Diataxis framework for structured documentation
- **Quarto Integration**: Sometimes uses Quarto to render `.qmd` documents to `.md` documents that Starlight can handle, particularly for academic-style references
- **Content Strategy**: Professional but approachable tone, focusing on practical applications and real-world benefits for geotechnical engineers transitioning from GUI-based workflows to code-based approaches

## Key Files

- `astro.config.mjs`: Main configuration including Starlight setup and navigation
- `src/content.config.ts`: Content collection definitions
- `src/content/docs/index.mdx`: Landing page with hero section and card grid
- `package.json`: Dependencies and scripts (Astro, Starlight, Sharp for image processing)