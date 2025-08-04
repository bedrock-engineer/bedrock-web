---
title: bedrock_ge.gi.ags
description: API reference for bedrock_ge.gi.ags
prev: false
next: false
editUrl: false
---

## Functions

### `ags_to_brgi_db_mapping(source, projected_crs, vertical_crs, encoding)`

Map AGS 3 or AGS 4 data to the Bedrock GI data model.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `source` | `Union[str, pathlib.Path, IO[str], IO[bytes], bytes]` |  | The AGS file (str or Path) or a file-like object that represents the AGS file. |
| `projected_crs` | `<class 'pyproj.crs.crs.CRS'>` |  | Projected Coordinate Reference System (CRS). For example: |
| `vertical_crs` | `<class 'pyproj.crs.crs.CRS'>` | `EPSG:3855` | Vertical CRS. Defaults to EGM2008 height, EPSG:3855, |
| `encoding` | `str \| None` | `None` | Encoding of the text file or bytes stream. Defaults to None. |

**Returns:**

**Type:** `<class 'bedrock_ge.gi.mapping_models.BedrockGIMapping'>`

Object that maps AGS 3 or AGS 4 data to Bedrock GI data model.

---
