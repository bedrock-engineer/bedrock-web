---
title: bedrock_ge.gi.write
description: API reference for bedrock_ge.gi.write
prev: false
next: false
editUrl: false
---

## Functions

### `sanitize_table_name(sheet_name)`

Makes table names consistent with SQL, GeoPackage and Excel naming conventions by replacing invalid characters and spaces with underscores.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sheet_name` |  |  | The original sheet name. |

**Returns:**

A sanitized sheet name with invalid characters and spaces replaced.

---

### `write_brgi_db_to_file(brgi_db, path, driver)`

Writes a Bedrock GI (geospatial) database to a file. The file type is determined by the `driver` argument. Possible values are "GPKG" and "EXCEL".

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `brgi_db` | `bedrock_ge.gi.schemas.BedrockGIDatabase \| bedrock_ge.gi.schemas.BedrockGIGeospatialDatabase` |  | The Bedrock GI (geospatial) database. |
| `path` | `str \| pathlib.Path` |  | The path of the output file. |
| `driver` | `Literal['EXCEL', 'GPKG']` | `GPKG` | The type of the output file. Possible values are "GPKG" and "EXCEL". |

**Returns:**

**Type:** `None`

None

---

### `write_gi_db_to_excel(dict_of_dfs, excel_path)`

Each DataFrame in the database dictionary will be saved in a separate Excel sheet named after the dictionary keys. This function can be used on any GI database, whether in AGS, Bedrock, or another format.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `dict_of_dfs` | `dict[str, pandas.core.frame.DataFrame \| geopandas.geodataframe.GeoDataFrame]` |  | A dictionary where keys are GI table names and values are DataFrames with GI data. |
| `excel_path` | `str \| pathlib.Path` |  | Path to the output Excel file. Can be provided as a string or Path object. |

**Returns:**

**Type:** `None`

None

---

### `write_gi_db_to_gpkg(dict_of_dfs, gpkg_path)`

Writes a dictionary of DataFrames containing Bedrock Ground Investigation data to a [GeoPackage file](https://www.geopackage.org/). Each DataFrame will be saved in a separate table named by the keys of the dictionary.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `dict_of_dfs` | `dict[str, pandas.core.frame.DataFrame \| geopandas.geodataframe.GeoDataFrame]` |  | A dictionary where keys are brgi table names and values are pandas |
| `gpkg_path` | `str \| pathlib.Path` |  | The name of the output GeoPackage file. |

**Returns:**

**Type:** `None`

None

---
