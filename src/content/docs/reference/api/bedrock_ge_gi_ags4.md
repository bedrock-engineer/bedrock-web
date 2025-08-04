---
title: bedrock_ge.gi.ags4
description: API reference for bedrock_ge.gi.ags4
prev: false
next: false
editUrl: false
---

## Functions

### `ags4_to_dfs`

Converts AGS 4 data to a dictionary of pandas DataFrames.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `source` | `Union[str, pathlib.Path, IO[str], IO[bytes], bytes]` |  | The AGS4 file (str or Path) or a file-like object that represents and AGS 4 file. |

**Returns:**

**Type:** `dict[str, pandas.core.frame.DataFrame]`

A dictionary of pandas DataFrames, where each key represents a group name from AGS 4 data, and the corresponding value is a pandas DataFrame containing the data for that group.

---
