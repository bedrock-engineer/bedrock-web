---
title: Vertical coordinates
description: API reference for the Vertical binding and the datum conversion helpers.
sidebar:
  order: 4
---

Every viewer plots against one vertical coordinate. The `verticalKey`
trait selects which data column that is. A vertical coordinate is
either a depth below surface (positive down) or an elevation in a
vertical datum (positive up); the `up` field is the only thing the
widgets act on. Two column names carry built-in display defaults:

| Key | Meaning | Direction | Axis label | Readout format |
| --- | --- | --- | --- | --- |
| `depth` | depth below surface, in m | positive down | `depth [m]` | `.2f` |
| `nap` | elevation in m NAP, the Dutch datum | positive up | `NAP [m]` | `+.2f` |

The widgets themselves never see datums. Compute an elevation column on
the Python side, as the surface elevation minus the depth
([`to_vertical`](#to_vertical) does exactly this), and express
annotation `at` values, layer `top` and `bottom` values, and the
vertical `axisLimits` entry in the selected coordinate.

## Vertical

`Vertical` binds a data column to the vertical coordinate. It mirrors
[`Channel`](/docs/cpt-anywidget/reference/cpt-viewer/#channel): only
`key` is required, and omitted fields fall back to defaults. Pass one
anywhere a vertical key string goes, to plot against a datum the package
does not know:

```python
from cpt_anywidget import Vertical

CPTViewer(df, vertical=Vertical("taw", label="TAW [m]", up=True, format="+.2f"))
```

| Field | Type | Description |
| --- | --- | --- |
| `key` | str | The column name in the data. Required. |
| `label` | str | The full axis title, for example `"NAP [m]"`. Default: the key. |
| `up` | bool | `True` for a positive-up coordinate (elevation), `False` for positive down (depth). Default for an unknown key: `False`. |
| `format` | str | The readout number format: a [d3-format](https://d3js.org/d3-format) string, which follows [Python's format-specifier mini-language](https://docs.python.org/3/library/string.html#format-specification-mini-language), for example `"+.2f"` to force a sign. Default for an unknown key: `".2f"`. |

The direction matters in two places: it sets the sort order at intake
(the topmost sample must come first) and it orients the vertical
`limits` pair.

## to_vertical

```python
to_vertical(depth, offset, vertical_key)
```

Converts a depth below surface to the selected vertical coordinate.

| Parameter | Type | Description |
| --- | --- | --- |
| `depth` | float or None | Meters below surface, positive down. `None` (a missing sample) passes through. |
| `offset` | float | The surface elevation in the target datum. Only used for positive-up coordinates. |
| `vertical_key` | str, `Vertical`, or dict | The target coordinate. A depth-like key returns the depth unchanged. A positive-up key (`"nap"`, or `up=True`) returns `offset - depth`. |

Use it at the widget boundary, for example to place an annotation at
1.5 m below a surface at NAP +2.1 m:

```python
from cpt_anywidget import to_vertical

at = to_vertical(1.5, 2.1, "nap")   # 0.6
```

## from_vertical

```python
from_vertical(value, offset, vertical_key)
```

Converts a value in the selected vertical coordinate back to depth below
surface, the inverse of [`to_vertical`](#to_vertical). Use it to read
`editedLayers` boundaries back into depths.
