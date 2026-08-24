---
title: Getting started
description: Install cpt-anywidget and show a CPT in a notebook.
sidebar:
  order: 1
---

cpt-anywidget is a set of [anywidget](https://anywidget.dev) viewers for
cone penetration tests (CPTs) and geotechnical borehole logs. The viewers
accept CPT data from any source: if you can load it into Python, you can
plot it. The viewers work in marimo and Jupyter notebooks. All viewers
share one zoomable vertical axis. The axis shows depth below surface, or
elevation in m NAP.

The package contains three viewers:

- [`CPTViewer`](/docs/cpt-anywidget/reference/cpt-viewer/) shows one CPT:
  measurement channels, interpretation columns, a nearby borehole log,
  and an editable layer column.
- [`ProfileViewer`](/docs/cpt-anywidget/reference/profile-viewer/) shows
  many CPTs side by side along a profile line (a cross-section).
- [`BoreholeViewer`](/docs/cpt-anywidget/reference/borehole-viewer/) shows
  one geotechnical borehole log with soil-composition bands.

## Requirements

- Python 3.10 or newer.
- A notebook environment: marimo, Jupyter, or another anywidget host.

## Install

The package is not on PyPI yet. Install it from git:

```sh
uv add "cpt-anywidget @ git+https://github.com/bedrock-engineer/cpt-anywidget"
```

The `bro` extra installs [brodata](https://pypi.org/project/brodata/):

```sh
uv add "cpt-anywidget[bro] @ git+https://github.com/bedrock-engineer/cpt-anywidget"
```

Only `layers_from_bhrgt` and `layers_from_bore` need the `bro` extra.
The viewers do not need it.

## Show a first CPT

Put this code in a notebook cell:

```python
import polars as pl
from cpt_anywidget import CPTViewer

df = pl.DataFrame({
    "depth": [0.0, 0.02, 0.04],         # m below surface
    "coneResistance": [0.1, 0.4, 0.9],  # MPa
    "localFriction": [0.01, 0.02, 0.02],
})

CPTViewer(df, vertical="depth", channels=["coneResistance", "localFriction"])
```

The notebook shows the widget when the cell returns it. The widget plots
each channel against the shared vertical axis.

## Prepare the data

The `data` argument takes
[tidy](https://data.europa.eu/apps/data-visualisation-guide/intro-to-tidy-data)
columns: a polars or pandas DataFrame, or a dict of equal-length lists.
Each row is one depth sample. Each column is one measurement.

The widget does not parse file formats. The widget does not convert
units. Use a reader to do that upstream. Any reader works. Examples:
[brodata](https://pypi.org/project/brodata/) for Dutch
[BRO](https://basisregistratieondergrond.nl/) data,
[pygef](https://pypi.org/project/pygef/) for GEF files,
[python-ags4](https://pypi.org/project/python-ags4/) for AGS files, or
plain `polars.read_csv` for a CSV.

Column names are free. The BRO column names get built-in labels, units,
and colors:
`coneResistance`, `localFriction`, `frictionRatio`, `porePressureU1`,
`porePressureU2`, and `inclination`. For a column with a different name,
pass a [`Channel`](/docs/cpt-anywidget/reference/cpt-viewer/#channel)
binding:

```python
from cpt_anywidget import Channel

CPTViewer(df, channels=[Channel("qn", label="qn", unit="MPa", color="tomato")])
```

## Select the vertical coordinate

Set `vertical` to the column that holds the vertical coordinate. A
vertical coordinate is one of two kinds:

- a depth below surface, in m, positive down
- an elevation in a vertical datum, in m, positive up: the surface
  elevation minus the depth

Any column can be the vertical coordinate. Bind it with a
[`Vertical`](/docs/cpt-anywidget/reference/vertical/):

```python
from cpt_anywidget import Vertical

CPTViewer(df, vertical=Vertical("elevation", label="TAW [m]", up=True))
```

The names `"depth"` and `"nap"` (elevation in the Dutch datum) carry
built-in labels and formats, the same way the BRO channel names do, so
they work as plain strings.

## Use the viewer

- To zoom the vertical axis, hold the Ctrl key (Cmd on macOS) and turn
  the mouse wheel. A trackpad pinch also zooms.
- To pan a zoomed axis, drag in the plot area.
- To zoom to a range, hold the Shift key and drag along the axis.
- To reset the zoom, double-click in the plot area.
- To read the values at a depth, move the pointer across the plot.

The mouse wheel without a modifier key scrolls the notebook, not the
chart.

## Next steps

- [`CPTViewer` reference](/docs/cpt-anywidget/reference/cpt-viewer/):
  all traits, including annotations, overlays, interpretations, the
  borehole column, and the editable layer column.
- [`ProfileViewer` reference](/docs/cpt-anywidget/reference/profile-viewer/):
  build a cross-section from many CPTs.
- [`BoreholeViewer` reference](/docs/cpt-anywidget/reference/borehole-viewer/):
  show a borehole log from any source, with converters for BRO BHR-GT
  and GEF files.
- [Data intake reference](/docs/cpt-anywidget/reference/intake/): the
  exact data contract, and the `tidy` and `split` helpers.
