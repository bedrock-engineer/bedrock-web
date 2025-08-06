---
title: Viewing Geotechnical Data on a Web Map
description: Learn how to transform geotechnical files for viewing on a web map using MapLibre GL JS
---

In this guide, you will convert AGS files to GeoJSON format and display them on an interactive web map using [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/). This approach allows you to share geotechnical data through web browsers without requiring specialized GIS software.

## Prerequisites

Before starting, ensure you have:

- Python installed with `bedrock-ge` package
  - We recommend using [`uv`](https://docs.astral.sh/uv/) to manage Python
- Basic knowledge of HTML, CSS, and JavaScript
- AGS files containing geotechnical data
- Knowledge of your project's coordinate reference system (CRS)
- A web server or hosting platform to serve your files

## Step 1: Set Up Your Python Environment

Install the required packages:

```bash
uv add bedrock-ge geopandas
```

## Step 2: Convert AGS Files to GeoJSON

First, convert your AGS files to a geospatial database, then export specific tables as GeoJSON:

```python
from pyproj import CRS
from pathlib import Path
from bedrock_ge.gi.mapper import map_to_brgi_db
from bedrock_ge.gi.ags import ags_to_brgi_db_mapping
from bedrock_ge.gi.geospatial import create_brgi_geodb
from bedrock_ge.gi.db_operations import merge_dbs

projected_crs = CRS("EPSG:2326")  # Hong Kong 1980 Grid System
vertical_crs = CRS("EPSG:5738")   # Hong Kong Principle Datum

# Process multiple AGS files
folder_path = Path("./ags_files")
ags_files = list(folder_path.glob("*.ags"))

ags_file_brgi_dbs = []

for file_path in ags_files:
    print(f"Processing {file_path.name}...")
    with open(file_path) as ags_file:
        brgi_mapping = ags_to_brgi_db_mapping(ags_file, projected_crs, vertical_crs)
        brgi_db = map_to_brgi_db(brgi_mapping)
        ags_file_brgi_dbs.append(brgi_db)

merged_brgi_db = merge_dbs(ags_file_brgi_dbs)
geodb = create_brgi_geodb(merged_brgi_db)
```

## Step 3: Export Tables as GeoJSON

Export the tables you want to display on the web map:

```python
import json

# Export location points (best for web display)
locations_geojson = geodb.LonLatHeight.to_json()
with open("locations.geojson", "w") as f:
    f.write(locations_geojson)

# Export SPT test results
if "ISPT" in geodb.InSituTests:
    spt_geojson = geodb.InSituTests["ISPT"].to_json()
    with open("spt_data.geojson", "w") as f:
        f.write(spt_geojson)

# Export geological data
if "GEOL" in geodb.InSituTests:
    geol_geojson = geodb.InSituTests["GEOL"].to_json()
    with open("geological_data.geojson", "w") as f:
        f.write(geol_geojson)

print("GeoJSON files exported successfully!")
```

## Step 4: Create HTML Structure

Create an HTML file for your web map:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Geotechnical Data Viewer</title>
    <script src="https://unpkg.com/maplibre-gl@4.5.2/dist/maplibre-gl.js"></script>
    <link href="https://unpkg.com/maplibre-gl@4.5.2/dist/maplibre-gl.css" rel="stylesheet" />
    <style>
        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
        .legend {
            background: white;
            border-radius: 3px;
            bottom: 30px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
            padding: 10px;
            position: absolute;
            right: 10px;
            z-index: 1;
        }
    </style>
</head>
<body>
    <div id="map"></div>
    <div class="legend">
        <h4>Geotechnical Data</h4>
        <div><span style="background-color: #ff6b6b; width: 10px; height: 10px; display: inline-block; margin-right: 5px;"></span>Boreholes</div>
        <div><span style="background-color: #4ecdc4; width: 10px; height: 10px; display: inline-block; margin-right: 5px;"></span>SPT Tests</div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

## Step 5: Add MapLibre JavaScript

Create a `script.js` file to initialize the map and load your data:

```javascript
// Initialize the map
const map = new maplibregl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {
            'raster-tiles': {
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '© OpenStreetMap contributors'
            }
        },
        layers: [
            {
                id: 'background',
                type: 'raster',
                source: 'raster-tiles'
            }
        ]
    },
    center: [114.2, 22.3], // Hong Kong coordinates
    zoom: 12
});

map.on('load', () => {
    // Add borehole locations
    map.addSource('locations', {
        type: 'geojson',
        data: './locations.geojson'
    });

    map.addLayer({
        id: 'locations-layer',
        type: 'circle',
        source: 'locations',
        paint: {
            'circle-radius': 6,
            'circle-color': '#ff6b6b',
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 2
        }
    });

    // Add SPT data if available
    map.addSource('spt-data', {
        type: 'geojson',
        data: './spt_data.geojson'
    });

    map.addLayer({
        id: 'spt-layer',
        type: 'circle',
        source: 'spt-data',
        paint: {
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['get', 'ISPT_NVAL'],
                0, 3,
                10, 6,
                50, 12
            ],
            'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'ISPT_NVAL'],
                0, '#26a69a',
                10, '#ffa726',
                30, '#ef5350'
            ],
            'circle-opacity': 0.8
        }
    });

    // Add click popup functionality
    map.on('click', 'locations-layer', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;
        
        new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
                <h3>Borehole: ${properties.location_id || 'Unknown'}</h3>
                <p><strong>Ground Level:</strong> ${properties.wgs84_ground_level_height?.toFixed(2) || 'N/A'} m</p>
                <p><strong>Coordinates:</strong> ${coordinates[1].toFixed(6)}, ${coordinates[0].toFixed(6)}</p>
            `)
            .addTo(map);
    });

    map.on('click', 'spt-layer', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;
        
        new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
                <h3>SPT Test</h3>
                <p><strong>N-Value:</strong> ${properties.ISPT_NVAL || 'N/A'}</p>
                <p><strong>Depth:</strong> ${properties.depth_to_top?.toFixed(2) || 'N/A'} m</p>
                <p><strong>Location:</strong> ${properties.location_id || 'Unknown'}</p>
            `)
            .addTo(map);
    });

    // Change cursor on hover
    map.on('mouseenter', 'locations-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'locations-layer', () => {
        map.getCanvas().style.cursor = '';
    });

    map.on('mouseenter', 'spt-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'spt-layer', () => {
        map.getCanvas().style.cursor = '';
    });
});
```

## Step 6: Advanced Styling and Filtering

Add interactive controls for filtering and styling data:

```javascript
// Add layer toggle controls
map.on('load', () => {
    // ... existing code ...

    // Add geological data with depth-based styling
    map.addSource('geological-data', {
        type: 'geojson',
        data: './geological_data.geojson'
    });

    map.addLayer({
        id: 'geological-layer',
        type: 'line',
        source: 'geological-data',
        paint: {
            'line-color': [
                'match',
                ['get', 'GEOL_GEOL'],
                'SAND', '#f4a261',
                'CLAY', '#e76f51',
                'ROCK', '#264653',
                '#2a9d8f' // default color
            ],
            'line-width': 3,
            'line-opacity': 0.8
        }
    });

    // Add filter controls
    const filterGroup = document.createElement('div');
    filterGroup.className = 'filter-group';
    filterGroup.style.cssText = `
        position: absolute;
        top: 10px;
        left: 10px;
        background: white;
        padding: 10px;
        border-radius: 3px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        z-index: 1;
    `;

    filterGroup.innerHTML = `
        <h4>Layer Controls</h4>
        <label><input type="checkbox" id="locations-toggle" checked> Borehole Locations</label><br>
        <label><input type="checkbox" id="spt-toggle" checked> SPT Data</label><br>
        <label><input type="checkbox" id="geological-toggle" checked> Geological Data</label><br>
        <hr>
        <label>SPT N-Value Filter:</label><br>
        <input type="range" id="spt-filter" min="0" max="50" value="50" style="width: 100%;">
        <span id="spt-value">50</span>
    `;

    document.body.appendChild(filterGroup);

    // Add event listeners for controls
    document.getElementById('locations-toggle').addEventListener('change', (e) => {
        map.setLayoutProperty('locations-layer', 'visibility', 
            e.target.checked ? 'visible' : 'none');
    });

    document.getElementById('spt-toggle').addEventListener('change', (e) => {
        map.setLayoutProperty('spt-layer', 'visibility', 
            e.target.checked ? 'visible' : 'none');
    });

    document.getElementById('geological-toggle').addEventListener('change', (e) => {
        map.setLayoutProperty('geological-layer', 'visibility', 
            e.target.checked ? 'visible' : 'none');
    });

    document.getElementById('spt-filter').addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        document.getElementById('spt-value').textContent = value;
        
        map.setFilter('spt-layer', ['<=', ['get', 'ISPT_NVAL'], value]);
    });
});
```

## Step 7: Optimize for Performance

For large datasets, consider these optimization strategies:

```python
# Filter data before export to reduce file size
import geopandas as gpd

# Only export locations within a specific area
bounds = [114.0, 22.2, 114.4, 22.4]  # [min_lon, min_lat, max_lon, max_lat]
filtered_locations = geodb.LonLatHeight.cx[bounds[0]:bounds[2], bounds[1]:bounds[3]]

# Simplify geometries for web display
simplified_locations = filtered_locations.copy()
simplified_locations['geometry'] = simplified_locations['geometry'].simplify(0.0001)

# Export optimized data
with open("locations_optimized.geojson", "w") as f:
    f.write(simplified_locations.to_json())
```

## Step 8: Deploy Your Web Map

1. **Local testing**: Use Python's built-in server:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

2. **Static hosting**: Upload your files to:
   - GitHub Pages
   - Netlify
   - Vercel
   - AWS S3 with static website hosting

3. **Content Delivery Network**: For better performance, consider using a CDN for your GeoJSON files.

## Understanding Web Map Data

When converting from AGS to web display:

- **LonLatHeight table**: Best for point locations on web maps (WGS84 coordinates)
- **InSituTests tables**: Point data with test results, ideal for interactive popups
- **Location table**: 3D line geometries may not display well in 2D web maps
- **File sizes**: Large datasets should be filtered or paginated for web performance

## Troubleshooting

**Map not loading**: Check browser console for errors and ensure all file paths are correct.

**No data visible**: Verify GeoJSON files are valid and contain features with geometry. [geojson.io](https://www.geojson.io) is a simple web app for viewing geoJSON files.

**Performance issues**: Reduce dataset size, use data clustering, or implement level-of-detail loading.

**Coordinate system problems**: Ensure all data is exported in WGS84 (EPSG:4326) for web compatibility.

**CORS errors**: Serve files from a web server, not directly from the file system.
