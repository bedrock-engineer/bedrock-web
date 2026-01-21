---
title: bedrock_ge.gi.io_utils
description: API reference for bedrock_ge.gi.io_utils
prev: false
next: false
editUrl: false
---

Utility functions for reading, parsing and writing data.

## Overview

**Functions:**
- [`brgi_db_to_dfs`](#brgi_db_to_dfs)
- [`coerce_string`](#coerce_string)
- [`convert_object_col_content_to_string`](#convert_object_col_content_to_string)
- [`detect_encoding`](#detect_encoding)
- [`geodf_to_df`](#geodf_to_df)
- [`open_text_data_source`](#open_text_data_source)

**Constants:**
- `DEFAULT_ENCODING`

## Constants

### `DEFAULT_ENCODING`

**Value:** `'utf-8'`

## Functions

### `brgi_db_to_dfs`

Converts a Bedrock GI (geospatial) database to a dictionary of DataFrames.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `brgi_db` | `bedrock_ge.gi.schemas.BedrockGIDatabase \| bedrock_ge.gi.schemas.BedrockGIGeospatialDatabase` |  | The Bedrock GI (geospatial) database. |

**Returns:**

**Type:** `dict[str, pandas.core.frame.DataFrame | geopandas.geodataframe.GeoDataFrame]`

A dictionary where the keys are the Bedrock GI table names and the values are the DataFrames that contain the data for each table.

---

### `coerce_string`

Converts a string to an appropriate Python data type.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `string` | `<class 'str'>` |  | The input string to be converted. |

**Returns:**

**Type:** `None | bool | float | str`

None if the string is 'none', 'null', or empty. bool if the string is 'true' or 'false' (case insensitive). int if the string can be converted to a float and has no decimal part. float if the string can be converted to a float with a decimal part. str if the string cannot be converted to any of the above types.

---

### `convert_object_col_content_to_string`

Therefore, this function converts all the data in columns with the object dtype to strings, and then back to the object dtype.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `df` | `<class 'pandas.core.frame.DataFrame'>` |  | The DataFrame to modify. |
| `in_place` | `<class 'bool'>` | `True` | Whether to modify the DataFrame in-place (default) or return a new DataFrame. |

**Returns:**

**Type:** `<class 'pandas.core.frame.DataFrame'>`

The modified DataFrame with object dtypes converted to string dtypes.

---

### `detect_encoding`

Detect the character encoding of various input types.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `source` | `Union[str, pathlib.Path, IO[str], IO[bytes], bytes]` |  | The source to detect encoding from. |

**Returns:**

**Type:** `<class 'str'>`

The detected encoding name (e.g., 'utf-8', 'iso-8859-1', 'ascii', etc.)

---

### `geodf_to_df`

Convenience function to convert GeoDataFrames to DataFrames for nicer display in notebook environments like marimo.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `geodf` | `<class 'geopandas.geodataframe.GeoDataFrame'>` |  |  |

**Returns:**

**Type:** `<class 'pandas.core.frame.DataFrame'>`

---

### `open_text_data_source`

Opens or wraps a given source for reading AGS (text-based) data.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `source` | `Union[str, pathlib.Path, IO[str], IO[bytes], bytes]` |  | The source to read from. |
| `encoding` | `str \| None` | `None` | Encoding to use for decoding bytes. Default is None. |

**Returns:**

**Type:** `ContextManager[io.TextIOBase]`

A context manager yielding a text stream.

---
