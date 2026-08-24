---
title: Edit layers
description: "The editable layer column: gestures, seeding, and reading edits back into Python."
sidebar:
  order: 2
---

`CPTViewer` can show a manually editable layer column after the
read-only interpretation columns: a place to draw your own layer
interpretation next to the automated ones, directly in the widget.
Every change syncs back to Python through the
[`editedLayers`](/docs/cpt-anywidget/reference/cpt-viewer/#editedlayers--list-bidirectional)
trait, so the notebook always holds the current state.

## Start a column

The column is always there. While it is empty, it offers a
click-to-start placeholder: one click creates a single classless layer
spanning the whole sounding, ready to be split up.

To start from existing layers instead, set `editedLayers` when you
build the viewer, or assign the trait later. A common seed is one of
the read-only interpretations, with its labels mapped onto your soil
classes:

```python
to_class = {"sand mix": "sand", "silt mix": "silt", "organic clay": "clay"}

viewer.editedLayers = [
    {
        "top": l["top"],
        "bottom": l["bottom"],
        "class": to_class.get(l["label"], "clay"),
    }
    for l in robertson["layers"]
]
```

Assigning the trait replaces the whole column, so re-seeding discards
any edits made so far.

## The gestures

- To move a boundary, drag it. A drag stops at a minimum layer
  thickness, so layers cannot collapse.
- To split a layer, click in the narrow lane on the column's outer
  edge. While the pointer is in the lane, a dashed line previews where
  the new boundary would go.
- To merge two layers, move the pointer near their boundary in that
  same lane and click the × it offers. The upper layer keeps its class.
- To set the class of a layer, click the layer. A pie menu opens with
  one wedge per soil class: click a wedge, or walk the wedges with the
  arrow keys and push <kbd>Enter</kbd>. <kbd>Escape</kbd> or a click
  outside closes the menu.
- As a fast path, press the layer, drag toward a wedge, and release.

## Classes and colors

The pie menu offers the entries of the
[`soil_classes`](/docs/cpt-anywidget/reference/cpt-viewer/#soil_classes--list)
palette, which is also the single source of truth for the layer
colors: each edited layer carries a `class` key referencing a palette
entry by name, and that entry drives both the fill and the label. The
default palette holds gravel, sand, silt, clay, and peat; override the
trait to change the classes or colors project-wide.

## Read edits back

The front end writes every edit back to `editedLayers`. Observe the
trait to keep a copy in Python:

```python
edited = []

def on_edit(change):
    edited[:] = change["new"]

viewer.observe(on_edit, names="editedLayers")
```

In Jupyter this is the whole story: `edited` always holds the latest
layers, and any later cell can read it.

## Keep edits alive in marimo

marimo's reactivity adds one trap. A widget is rebuilt whenever its
cell reruns, and a cell reruns whenever something it reads changes. If
the viewer cell read the edits reactively, every boundary drag would
rerun the cell and rebuild the widget mid-gesture, and the column
would reset under the pointer.

The pattern that works: keep the edits in a plain dict that the viewer
cell reads without tracking, and mirror them into `mo.state` for the
cells that display the result.

```python
# in a cell of its own, so it runs once and survives viewer rebuilds
edited_store = {"layers": []}
get_edited, set_edited = mo.state([])
```

```python
def on_edit(change):
    edited_store["layers"] = change["new"]
    set_edited(change["new"])

viewer = CPTViewer(
    cpt_data,
    interpretations=interpretations,
    editedLayers=edited_store["layers"],
)
viewer.observe(on_edit, names="editedLayers")
viewer
```

```python
pd.DataFrame(get_edited())  # a reactive reader, reruns on every edit
```

An edit now updates the store and the mirror, the table cell reruns,
and the viewer cell does not. When something else does rebuild the
viewer (a changed channel selection, a new file), it comes back with
`editedLayers=edited_store["layers"]` and the edits survive.

## Store depths, display any coordinate

Layer boundaries arrive in whatever vertical coordinate the viewer
plots. If the notebook can switch between depth and NAP, store the
edits canonically in depth below surface and convert only at the
widget boundary, with
[`from_vertical` and `to_vertical`](/docs/cpt-anywidget/reference/vertical/#to_vertical):

```python
def on_edit(change):
    edited_store["layers"] = [
        {
            **l,
            "top": from_vertical(l["top"], offset, vertical),
            "bottom": from_vertical(l["bottom"], offset, vertical),
        }
        for l in change["new"]
    ]
```

The edits then survive a coordinate switch: the viewer cell converts
them back with `to_vertical` when it rebuilds, the same way it
converts annotations and interpretation layers.
