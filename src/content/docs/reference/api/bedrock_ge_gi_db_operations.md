---
title: bedrock_ge.gi.db_operations
description: API reference for bedrock_ge.gi.db_operations
prev: false
next: false
editUrl: false
---

## Functions

### `merge_dbs`

The function concatenates the pandas DataFrames of the second dict of DataFrames to the first dict of DataFrames for the keys they have in common. Keys that are unique to either dictionary will be included in the final concatenated dictionary.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `brgi_dbs` | `collections.abc.Iterable[bedrock_ge.gi.schemas.BedrockGIDatabase]` |  | The Bedrock GI databases containing the data to be merged. |

**Returns:**

**Type:** `<class 'bedrock_ge.gi.schemas.BedrockGIDatabase'>`

Merged Bedrock GI database.

---
