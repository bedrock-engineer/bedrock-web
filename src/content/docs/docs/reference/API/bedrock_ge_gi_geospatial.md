---
title: bedrock_ge.gi.geospatial
description: API reference for bedrock_ge.gi.geospatial
prev: false
next: false
editUrl: false
---

## Functions

### `calc_distances_along_3d_linestring`

Calculate cumulative distances along a 3D LineString.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `linestring` | `<class 'shapely.geometry.linestring.LineString'>` |  |  |

**Returns:**

**Type:** `<class 'numpy.ndarray'>`

---

### `create_brgi_geodb`

Creates a Bedrock GI geospatial database by performing the following steps:

1. Creates a geospatial DataFrame for the Location table using the `create_location_geodf` function.
2. Creates a geospatial DataFrame for the LonLatHeight table using the `create_lon_lat_height_geodf` function.
3. Creates a dictionary of geospatial DataFrames for the In-Situ test tables using the `interpolate_gi_geometry` function.
4. Creates a geospatial DataFrame for the Sample table using the `interpolate_gi_geometry` function, if the Sample table exists.
5. Returns a BedrockGIGeospatialDatabase object.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `brgi_db` | `<class 'bedrock_ge.gi.schemas.BedrockGIDatabase'>` |  | The Bedrock GI database to be converted. |

**Returns:**

**Type:** `<class 'bedrock_ge.gi.schemas.BedrockGIGeospatialDatabase'>`

The resulting Bedrock GI geospatial database.

---

### `create_location_geodf`

This function generates a GeoDataFrame for the Location table using the input Bedrock GI database. It assumes the boreholes are vertical (for now) and calculates elevation at the base of each borehole. It raises an error if multiple horizontal or vertical coordinate reference systems (CRS) are found in the project data.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `brgi_db` | `<class 'bedrock_ge.gi.schemas.BedrockGIDatabase'>` |  | The Bedrock GI database containing location |

**Returns:**

**Type:** `<class 'geopandas.geodataframe.GeoDataFrame'>`

A GeoDataFrame with LineString geometries representing vertical boreholes, using the compound CRS derived from the project's horizontal and vertical CRS.

---

### `create_lon_lat_height_geodf`

This function processes all GI locations in a Bedrock GI database, transforming the (easting, northing, ground level elevation) coordinates to WGS84 (lon, lat) + EGM2008 orthometric height coordinates, which have coordinate reference system EPSG:9518. It returns a GeoDataFrame with the transformed longitude, latitude, and EGM2008 ground level height, along with the corresponding point geometries in EPSG:9518.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `brgi_db` | `<class 'bedrock_ge.gi.schemas.BedrockGIDatabase'>` |  | The source Bedrock Ground Investigation database containing location and project information. |

**Returns:**

**Type:** `<class 'geopandas.geodataframe.GeoDataFrame'>`

A GeoDataFrame with the transformed longitude, latitude, and EGM2008 ground level height, along with the corresponding point geometries in EPSG:9518.

---

### `interpolate_3d`

Return the first point if the distance is less than 0 or the last point if the distance is greater than the total length. This behavior is different than the shapely.LineString.interpolate method.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `linestring` | `<class 'shapely.geometry.linestring.LineString'>` |  | A 3D LineString geometry |
| `distance` | `<class 'float'>` |  | Distance along the line in 3D space |

**Returns:**

**Type:** `<class 'shapely.geometry.point.Point'>`

The interpolated 3D point

---

### `interpolate_gi_geometry`

This function takes an In-Situ test or Sample DataFrame and a GI Location GeoDataFrame and returns a GeoDataFrame with its geometry interpolated from the Location GeoDataFrame. The In-Situ test geometry is always a LineString or Point, depending on whether the In-Situ test is performed at a specific depth or over a depth interval inside a borehole. The geometry is calculated by linearly interpolating the depth values for each row in a In-Situ test DataFrame along the corresponding location's LineString geometry.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `insitu_test_df` | `Union[pandera.pandas.DataFrame[bedrock_ge.gi.schemas.InSituTestSchema], pandera.pandas.DataFrame[bedrock_ge.gi.schemas.SampleSchema]]` |  | The In-Situ test or Sample DataFrame containing the depth values to be interpolated. |
| `location_geodf` | `<class 'geopandas.geodataframe.GeoDataFrame'>` |  | The location GeoDataFrame containing the location LineStrings to be used for interpolation. |

**Returns:**

**Type:** `<class 'geopandas.geodataframe.GeoDataFrame'>`

A GeoDataFrame containing the interpolated geospatial geometry for the In-Situ test DataFrame.

---

### `substring_3d`

Extract a substring of a 3D LineString using true 3D distances.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `linestring` | `<class 'shapely.geometry.linestring.LineString'>` |  | A 3D LineString geometry |
| `start_dist` | `<class 'float'>` |  | Start distance along the line in 3D space |
| `end_dist` | `<class 'float'>` |  | End distance along the line in 3D space |

**Returns:**

**Type:** `shapely.geometry.linestring.LineString | shapely.geometry.point.Point`

The extracted 3D LineString segment

---
