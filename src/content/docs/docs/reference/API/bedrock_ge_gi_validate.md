---
title: bedrock_ge.gi.validate
description: API reference for bedrock_ge.gi.validate
prev: false
next: false
editUrl: false
---

## Functions

### `check_brgi_db`

This function performs the same validation as `check_brgi_geodb`, but uses schemas that don't require geospatial geometry. It validates the following tables:

- Project (never has geospatial geometry)
- Location (without geospatial geometry)
- All In-Situ test tables (without geospatial geometry)
- Sample (without geospatial geometry)
- All Lab test tables (never has geospatial geometry)

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `brgi_db` | `<class 'bedrock_ge.gi.schemas.BedrockGIDatabase'>` |  | A Bedrock GI database object. |

**Returns:**

True if all tables are valid and relationships are properly maintained.

---

### `check_brgi_geodb`

This function checks that all tables in the BrGI geospatialdatabase conform to their respective schemas and that all foreign key relationships are properly maintained. It validates the following tables:

- Project
- Location
- LonLatHeight
- All In-Situ test tables
- Sample
- All Lab test tables

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `brgi_geodb` | `<class 'bedrock_ge.gi.schemas.BedrockGIGeospatialDatabase'>` |  | Bedrock GI geospatial database object. |

**Returns:**

True if all tables are valid and relationships are properly maintained.

---

### `check_foreign_key`

This function ensures that all foreign key values in a child table exist in the corresponding parent table, maintaining data integrity in the GIS database.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `foreign_key` | `<class 'str'>` |  | The name of the column that serves as the foreign key. |
| `parent_table` | `pandas.core.frame.DataFrame \| geopandas.geodataframe.GeoDataFrame` |  | The parent table containing the primary keys. |
| `table_with_foreign_key` | `pandas.core.frame.DataFrame \| geopandas.geodataframe.GeoDataFrame` |  | The child table containing the foreign keys. |

**Returns:**

**Type:** `<class 'bool'>`

True if all foreign keys exist in the parent table.

---
