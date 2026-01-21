---
title: Overview
description: API reference overview
---

`bedrock-ge` follows a pipeline architecture: Parse → Map → Transform → Validate → Export

## GI

### AGS

- `ags.py` - Main entry point with ags_to_brgi_db_mapping() function that auto-detects AGS3/4 format and routes to appropriate parser
- `ags3.py` - AGS3 parser with ags3_to_dfs() and ags3_to_brgi_db_mapping() functions
- `ags4.py` - AGS4 parser (leverages python_ags4 library)

### Data Models & Configuration

- `mapping_models.py` - Pydantic models defining how source data maps to Bedrock schema:
  BedrockGIMapping(Project, Location, InSitu, Sample, Lab, Other)
- `schemas.py` - Pandera validation schemas ensuring data quality:
  `BedrockGIDatabase`, `BedrockGIGeospatialDatabase`
- `sqlmodels.py` - SQLModel definitions for database persistence

### Mapping

- `mapper.py` - Main transformation engine with `map_to_brgi_db()` function:
  - Generates unique IDs and foreign key relationships
  - Applies mapping configurations to create final database
  - Validates data using schemas

### Geospatial Processing

- `geospatial.py` - 3D geometry creation with `create_brgi_geodb()`:
  - Creates LineString geometries for boreholes
  - Interpolates test positions along 3D borehole paths
  - Handles coordinate reference system transformations

### Utilities & I/O

- `io_utils.py` - File handling with smart encoding detection and type coercion
- `write.py` - Export functions for GeoPackage, Excel, and other formats
- `db_operations.py` - Database merging with merge_dbs() function
- `validate.py` - Data validation utilities for referential integrity

