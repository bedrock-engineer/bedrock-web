---
title: bedrock_ge.gi.ags_schemas
description: API reference for bedrock_ge.gi.ags_schemas
prev: false
next: false
editUrl: false
---

## Overview

**Classes:**
- [`Ags3CORE`](#class-ags3core)
- [`Ags3GEOL`](#class-ags3geol)
- [`Ags3HOLE`](#class-ags3hole)
- [`Ags3ISPT`](#class-ags3ispt)
- [`Ags3SAMP`](#class-ags3samp)
- [`Ags3WETH`](#class-ags3weth)
- [`Ags4CORE`](#class-ags4core)
- [`Ags4GEOL`](#class-ags4geol)
- [`Ags4ISPT`](#class-ags4ispt)
- [`Ags4SAMP`](#class-ags4samp)
- [`Ags4WETH`](#class-ags4weth)
- [`BaseCORE`](#class-basecore)
- [`BaseGEOL`](#class-basegeol)
- [`BaseISPT`](#class-baseispt)
- [`BaseSAMP`](#class-basesamp)
- [`BaseWETH`](#class-baseweth)

**Functions:**
- [`check_ags_proj_group`](#check_ags_proj_group)

## Classes

### `class Ags3CORE`

#### Attributes

- `CORE_BOT`
- `HOLE_ID`

---

### `class Ags3GEOL`

#### Attributes

- `HOLE_ID`

---

### `class Ags3HOLE`

#### Attributes

- `HOLE_FDEP`
- `HOLE_GL`
- `HOLE_ID`
- `HOLE_NATE`
- `HOLE_NATN`
- `HOLE_TYPE`

---

### `class Ags3ISPT`

#### Attributes

- `HOLE_ID`

---

### `class Ags3SAMP`

#### Attributes

- `HOLE_ID`

---

### `class Ags3WETH`

#### Attributes

- `HOLE_ID`
- `WETH_GRAD`

---

### `class Ags4CORE`

#### Attributes

- `CORE_BASE`
- `LOCA_ID`

---

### `class Ags4GEOL`

#### Attributes

- `LOCA_ID`

---

### `class Ags4ISPT`

#### Attributes

- `LOCA_ID`

---

### `class Ags4SAMP`

#### Attributes

- `LOCA_ID`
- `SAMP_ID`

---

### `class Ags4WETH`

#### Attributes

- `LOCA_ID`
- `WETH_WETH`

---

### `class BaseCORE`

#### Attributes

- `CORE_PREC`
- `CORE_RQD`
- `CORE_SREC`
- `CORE_TOP`

---

### `class BaseGEOL`

#### Attributes

- `GEOL_BASE`
- `GEOL_DESC`
- `GEOL_GEO2`
- `GEOL_GEOL`
- `GEOL_LEG`
- `GEOL_TOP`

---

### `class BaseISPT`

#### Attributes

- `ISPT_NVAL`
- `ISPT_TOP`

---

### `class BaseSAMP`

#### Attributes

- `SAMP_BASE`
- `SAMP_REF`
- `SAMP_TOP`
- `SAMP_TYPE`

---

### `class BaseWETH`

#### Attributes

- `WETH_BASE`
- `WETH_TOP`

---

## Functions

### `check_ags_proj_group`

Checks if the AGS 3 or AGS 4 PROJ group is correct.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `ags_proj` | `<class 'pandas.core.frame.DataFrame'>` |  | The DataFrame with the PROJ group. |

**Returns:**

**Type:** `<class 'bool'>`

Returns True if the AGS 3 or AGS 4 PROJ group is correct.

---
