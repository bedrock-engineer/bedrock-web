---
title: Data intake
description: API reference for the tidy and split helpers, and the data contract they enforce.
sidebar:
  order: 5
---

The intake module is the seam between your data source and the widgets'
wire format. The package never parses file formats, never converts
units, and never renames columns. Readers — brodata, pygef, python-ags4,
a CSV reader — stay upstream.
[`Channel`](/docs/cpt-anywidget/reference/cpt-viewer/#channel) and
[`Vertical`](/docs/cpt-anywidget/reference/vertical/#vertical) bindings
adapt the chart to whatever the columns are called.

The intake enforces only what the front end cannot recover from:

- **JSON safety.** NaN and inf become `None` — NaN is invalid JSON and
  kills the trait sync. Numpy scalars unwrap to plain Python numbers. A
  non-numeric sample raises immediately, with the column and the value
  named. Nothing is silently coerced.
- **Equal lengths.** Every column is indexed by the vertical sample
  position. A ragged dict would silently misalign channels, so it
  raises.
- **Render order.** Rows sort so the first sample is the topmost — the
  order the front end renders in. Samples without a vertical value
  cannot be placed and are dropped.

The viewer constructors call these helpers for you. Call them directly
to inspect or test the wire format.

## tidy

```python
from cpt_anywidget import tidy

tidy(data, vertical="depth")
```

Turns tidy columns into the wire-ready
[`cptData`](/docs/cpt-anywidget/reference/cpt-viewer/#cptdata--dict)
dict.

| Parameter | Type | Description |
| --- | --- | --- |
| `data` | DataFrame or dict | A polars or pandas DataFrame, or a dict of equal-length columns: one row per depth sample, one column per measurement. |
| `vertical` | str, `Vertical`, or dict | The column that places rows on the vertical axis. Rows sort ascending for depth-like coordinates and descending for positive-up ones, so the first sample is the topmost either way. |

Returns exactly what the widget receives: plain lists, JSON-safe
samples, rows in render order.

Raises `ValueError` when:

- a column holds a non-numeric sample (coerce upstream, for example
  `pd.to_numeric(...)` or `.cast(pl.Float64)`),
- columns differ in length,
- the vertical column is not in the data.

## split

```python
from cpt_anywidget import split

split(data, name="name")
```

Turns tidy **long**-format columns into `{name: columns}`, one group per
CPT. The
[`ProfileViewer`](/docs/cpt-anywidget/reference/profile-viewer/)
constructor composes `split` and `tidy` exactly this way.

| Parameter | Type | Description |
| --- | --- | --- |
| `data` | DataFrame or dict | Every CPT's samples stacked in one DataFrame or dict of columns, with a name column that tells them apart. |
| `name` | str | The column that holds the CPT names. Default: `"name"`. |

Groups keep first-appearance order and drop the name column. Each group
is raw: feed it to [`tidy`](#tidy).

Raises `ValueError` when the name column is not in the data, or when
columns differ in length.
