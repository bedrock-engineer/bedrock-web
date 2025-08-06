---
title: bedrock_ge.gi.schemas
description: API reference for bedrock_ge.gi.schemas
prev: false
next: false
editUrl: false
---

pandera schemas for Bedrock GI data. Base schemas refer to schemas that have no calculated GIS geometry or values.

## Classes

### `class BedrockGIDatabase`

#### Attributes

- `model_config`

---

### `class BedrockGIGeospatialDatabase`

#### Attributes

- `model_config`

---

### `class InSituTestSchema`

#### Attributes

- `depth_to_base`
- `depth_to_top`
- `location_uid`
- `project_uid`

#### Methods

##### `depth_column_completeness`

##### `top_above_base`

If either column is missing, this check passes (nothing to compare). If both columns are present, the check fails if any row has depth_to_top > depth_to_base.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `df` | `<class 'pandas.core.frame.DataFrame'>` |  |  |

**Returns:**

**Type:** `<class 'pandas.core.series.Series'>`

pd.Series: pandas.Series of bools indicating successful checks.

---

### `class LabTestSchema`

#### Attributes

- `location_uid`
- `project_uid`
- `sample_uid`

---

### `class LocationSchema`

#### Attributes

- `depth_to_base`
- `easting`
- `ground_level_elevation`
- `location_source_id`
- `location_uid`
- `northing`
- `project_uid`

---

### `class LonLatHeightSchema`

#### Attributes

- `egm2008_ground_level_height`
- `latitude`
- `location_uid`
- `longitude`
- `project_uid`

---

### `class ProjectSchema`

#### Attributes

- `horizontal_crs`
- `horizontal_crs_wkt`
- `project_uid`
- `vertical_crs`
- `vertical_crs_wkt`

---

### `class SampleSchema`

#### Attributes

- `sample_source_id`
- `sample_uid`

---
