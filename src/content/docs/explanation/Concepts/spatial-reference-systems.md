---
title: Spatial reference systems
description: What are Spatial Reference Systems and why do we need them for geotechnical data
---

Each geotechnical site investigation has a location on Earth.
Geospatial data achieves its spatial awareness through [Spatial Reference Systems](https://en.wikipedia.org/wiki/Spatial_reference_system) (SRS), standardized definitions that link coordinates to real locations on Earth.

There are two types or reference system:

<dl>
    <dt>Geographic SRS</dt>
    <dd>Coordinates in degrees (Longitude, Latitude, Height)
    <ul>
        <li>Example: WGS84 (used by GPS)</li>
        <li>Global coverage but distance measurements are complex</li>
    </ul>
</dd>

<dt>Projected SRS</dt>
<dd>Coordinates in meters (Easting, Northing, Height)
    <ul>
        <li>Example: UTM Zone 31N, British National Grid</li>
        <li>Regional coverage but distance measurements are straightforward</li>
    </ul>
</dd>
</dl>

Geotechnical projects typically use projected coordinate systems that match local survey practices, making integration with engineering workflows seamless.

### Vertical Datums

Elevation values (Z) rely on a vertical datum, a defined reference surface for measuring height. Choosing the correct vertical datum ensures that depths, ground levels, and cross-section alignments are consistent across datasets.

There are two main types:

<dl>
    <dt>Ellipsoidal height</dt>
    <dd>Measured from a mathematical model of the Earth's shape (e.g. WGS84 ellipsoid). Common in GPS systems but not suitable for engineering unless converted.</dd>
    <dt>Orthometric height</dt>
    <dd>Measured from a defined sea level (e.g., <a href="https://epsg.io/5703">NAVD88</a> in the US, <a href="https://epsg.io/5709">NAP</a> in the Netherlands). This is the standard for most geotechnical and civil engineering work.</dd>
</dl>

For example, GPS-derived elevations often reference the WGS84 ellipsoid and must be converted to orthometric heights using a geoid model.
In the Netherlands, elevation is typically referenced to [NAP (Normaal Amsterdams Peil)](https://www.rijkswaterstaat.nl/zakelijk/open-data/normaal-amsterdams-peil), the national height datum.

#### Why it matters

Misalignment between vertical datums can introduce errors.
Accurate borehole logs, cross sections, and groundwater level interpretations depend on consistent vertical referencing.
Integrating data from multiple sources (surveying, LiDAR, CPT logs, BIM models) requires awareness of both horizontal and vertical CRS.

:::note
Always document the vertical datum alongside the coordinate system when sharing or visualizing geotechnical data.
:::
