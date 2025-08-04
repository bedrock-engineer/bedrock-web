---
title: bedrock_ge.gi.ags3
description: API reference for bedrock_ge.gi.ags3
prev: false
next: false
editUrl: false
---

## Functions

### `ags3_to_brgi_db_mapping(source, projected_crs, vertical_crs, encoding)`

Map AGS 3 data to the Bedrock GI data model.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `source` | `Union[str, pathlib.Path, IO[str], IO[bytes], bytes]` |  | The AGS 3 file (str or Path) or a file-like object that represents the AGS 3 file. |
| `projected_crs` | `<class 'pyproj.crs.crs.CRS'>` |  | Projected Coordinate Reference System (CRS). For example: |
| `vertical_crs` | `<class 'pyproj.crs.crs.CRS'>` |  | Vertical CRS. Defaults to EGM2008 height, EPSG:3855, |
| `encoding` | `<class 'str'>` |  | Encoding of the text file or bytes stream. |

**Returns:**

**Type:** `<class 'bedrock_ge.gi.mapping_models.BedrockGIMapping'>`

Object that maps AGS 3 data to Bedrock GI data model.

---

### `ags3_to_dfs(source, encoding)`

Also strips '?' from non-standard AGS 3 group and header names, in order to make the rest of the code more generic.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `source` | `Union[str, pathlib.Path, IO[str], IO[bytes], bytes]` |  | The AGS 3 file (str or Path) or a file-like object that represents the AGS 3 file. |
| `encoding` | `<class 'str'>` |  | Encoding of the text file or bytes stream. |

**Returns:**

**Type:** `dict[str, pandas.core.frame.DataFrame]`

A dictionary of pandas DataFrames, i.e. a database, where each key is an AGS 3 group, and the corresponding value is a pandas DataFrame containing the data for that group.

---
