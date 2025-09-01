---
title: Relational databases for geotechnical data
author: Jules Blom & Joost Geveart
description: Understanding how relational databases naturally represent the hierarchical structure of geotechnical data.
sidebar:
  order: 2
---

Geotechnical data has a natural hierarchical structure that mirrors how ground investigations are actually performed.
Understanding this structure—and how relational databases represent it, reveals why this approach is more flexible and powerful than traditional file-based formats like AGS.

## The natural hierarchy of ground investigations

Every ground investigation follows the same logical structure, from project level down to individual test results.

These hierarchical relationships can be visualized in a tree diagram like this:

<svg viewBox="-12,-24,300,144" style="height: auto; font: 13px sans-serif; display: block;"
    xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
    <g fill="none" stroke="#999">
        <path d="M0,0V24h24"></path>
        <path d="M24,24V48h24"></path>
        <path d="M24,24V72h24"></path>
        <path d="M48,72V96h24"></path>
    </g>
    <g fill="currentColor">
        <g transform="translate(0,0)">
            <circle cx="0" r="2.5"></circle> <text dy="0.32em" x="6">
                <tspan font-weight="600">Project</tspan>
                <tspan dx="2"></tspan>
            </text>
            <title>
                Project
            </title>
        </g>
        <g transform="translate(0,24)">
            <circle cx="24" r="2.5"></circle> <text dy="0.32em" x="30">
                <tspan font-weight="600">Location</tspan>
                <tspan dx="2"></tspan>
            </text>
            <title>
                Project/Location
            </title>
        </g>
        <g transform="translate(0,48)">
            <circle cx="48" r="2.5"></circle> <text dy="0.32em" x="54">
                <tspan font-weight="600">InSitu</tspan>
                <tspan dx="2"></tspan>
            </text>
            <title>
                Project/Location/InSitu
            </title>
        </g>
        <g transform="translate(0,72)">
            <circle cx="48" r="2.5"></circle> <text dy="0.32em" x="54">
                <tspan font-weight="600">Sample</tspan>
                <tspan dx="2"></tspan>
            </text>
            <title>
                Project/Location/Sample
            </title>
        </g>
        <g transform="translate(0,96)">
            <circle cx="72" r="2.5"></circle> <text dy="0.32em" x="78">
                <tspan font-weight="600">Lab</tspan>
                <tspan dx="2"></tspan>
            </text>
            <title>
                Project/Location/Sample/Lab
            </title>
        </g>
    </g>
</svg>

This tree-like structure emerges naturally because:

- **Projects** contain multiple investigation **locations**
- **Locations** yield multiple **observations/measurements** and **samples**
- **Samples** undergo multiple **laboratory tests**

Each level depends on the level above it, creating clear parent-child relationships throughout the dataset.

## Relational databases represent hierarchical data

[Relational databases](https://observablehq.com/blog/databases-101-basics-data-analysts) are foundational to modern data management, and probably the most common type of database.
They store data in linked tables, making them suitable for representing hierarchical structures. Each table represents one level of the hierarchy:

### Primary keys: Unique identifiers

Every table has a **primary key**: a column that uniquely identifies each row:

- `project_uid` in the Projects table
- `location_uid` in the Locations table
- `sample_uid` in the Samples table
- `test_uid` in laboratory test tables

### Foreign keys: Linking relationships

Tables are linked through **foreign keys**: columns that reference primary keys in parent tables:

- Locations table contains `project_uid` (linking to Projects)
- In-situ test tables contain `location_uid` (linking to Locations)
- Laboratory test tables contain `sample_uid` (linking to Samples)

### Example: One project, multiple relationships

Consider a project with 2 boreholes, where "Borehole 1 (BH001)" has 3 samples:

**Projects table:**
| project_uid | project_name |
|-------------|--------------|
| P001 | Appartment tower  |

**Locations table:**
| location_uid | project_uid  | easting | northing | depth_to_base | ground_level_elevation |
|--------------|--------------|---------|----------|---------------|------------------------|
| BH001 | P001 | 523441 | 181652 | 5.4 | 20.5 |
| BH002 | P001 | 523467 | 181678 | 6.8 | 19.8 |

**Samples table:**
| sample_uid | location_uid | depth_top | depth_base |
|------------|--------------|-----------|------------|
| S001 | BH001 | 1.0 | 1.5 |
| S002 | BH001 | 3.2 | 3.7 |
| S003 | BH001 | 5.8 | 6.3 |

This creates **one-to-many relationships**: one project has many locations, one location has many samples, etc.
<!-- 
## AGS format vs. relational database approach

The AGS (Association of Geotechnical and Geoenvironmental Specialists) format also recognizes the hierarchical nature of geotechnical data, but handles it differently:

### AGS format characteristics

- **File-based**: Data stored in structured text files
- **Table structure**: Uses groups (tables) with standardized column names
- **Linking mechanism**: Uses combination keys across multiple columns
- **Rigid schema**: Predefined structure with specific field requirements
- **Exchange focus**: Designed primarily for data transfer between organizations -->

### Relational database advantages


**Query power**: SQL enables complex queries across multiple tables:

<!-- **Data integrity**: Enforces relationships through foreign key constraints, you can't add a sample without a valid location -->

**Concurrent access**: Multiple users can query and update data simultaneously

**Extensibility**: Easy to add new test types or custom fields without breaking existing structure

**Integration**: Direct connectivity with GIS software, analysis tools, and web applications

<!-- ### When AGS format works well

AGS remains excellent for:

- **Data exchange** between organizations
- **Standardized reporting** to regulatory bodies
- **Archive storage** with guaranteed long-term readability
- **Industry compliance** where AGS is mandated -->

<!-- ## The best of both worlds

Modern workflows often use both approaches:

1. **Receive data** in AGS format from site investigation contractors
2. **Convert to relational database** for analysis and integration
3. **Export back to AGS** when required for submissions or sharing

This approach combines AGS's industry standardization with the power and flexibility of relational databases.

## Working with geospatial databases

When relational databases include geospatial capabilities (like PostGIS or GeoPackage), they can:

- **Store geometries** alongside tabular data
- **Perform spatial queries** (e.g., "find all tests within 100m of this foundation")
- **Handle coordinate transformations** automatically
- **Index spatial data** for fast retrieval
- **Connect directly** to GIS and mapping software

This creates a unified system where the hierarchical structure of geotechnical data meets the spatial analysis capabilities of modern GIS—something that traditional file formats simply cannot match.

## Practical implications

Using relational databases for geotechnical data enables:

- **Complex analysis**: Join soil properties with structural loads across multiple projects
- **Quality control**: Automatically flag inconsistencies or missing data
- **Visualization**: Direct connection to mapping and 3D visualization tools
- **Automation**: Scripted data processing and report generation
- **Scalability**: Handle datasets from small sites to regional databases
- **Integration**: Seamless connection with BIM, CAD, and web applications

The hierarchical nature of geotechnical data isn't just a data management convenience, it's the foundation for more powerful, integrated, and automated geotechnical workflows. -->
