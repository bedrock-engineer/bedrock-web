---
title: bedrock_ge.gi.mapper
description: API reference for bedrock_ge.gi.mapper
prev: false
next: false
editUrl: false
---

## Functions

### `map_to_brgi_db`

This function takes a BedrockGIDatabaseMapping, which contains various table mappings for project, location, in-situ tests, samples, lab tests, and other tables, and converts it into a BedrockGIDatabase object. It creates pandas DataFrames for each table, validates them against their respective schemas, and constructs the final BedrockGIDatabase object.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `brgi_db_mapping` | `<class 'bedrock_ge.gi.mapping_models.BedrockGIMapping'>` |  | The mapping object containing GI data and metadata for mapping to Bedrock's schema. |

**Returns:**

**Type:** `<class 'bedrock_ge.gi.schemas.BedrockGIDatabase'>`

The transformed Bedrock GI database containing validated DataFrames for each table type.

---
