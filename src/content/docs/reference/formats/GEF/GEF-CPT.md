---
title: GEF-CPT
description: Description of the Geotechnical Exchange Format (GEF) CPT Report
---

The GEF-CPT format is a legacy text-based standard for Cone Penetration Test (CPT) data, primarily used in the Netherlands and Belgium.
It was created in 1999 to solve interoperability problems in Dutch geotechnical practice, it replaced a proliferation of proprietary formats.
The format is no longer maintained and is technically outdated, but it remains in use due to extensive legacy data and support for it in engineering software.

## Technical Obsolescence

Though GEF-CPT was an important step forward at the time of its creation, it is architecturally primitive by modern data exchange standards.

**Structural limitations**

- One file can only represent a single cone penetration test.
- Text-based, single-file structure with no data typing, schema validation, or extensibility.
- Fragile comma-separated value format prone to parsing errors.

**Metadata and reference handling**

- No timezone information for timestamps
- Coordinate systems defined via lookup tables instead of common spatial reference definitions.
- Column definitions tie metadata directly to fixed column positions in the data block, tightly coupling description with layout

**Extensibility and modern use**

- Cannot represent hierarchical relationships or complex data structures from modern multi-sensor CPT equipment.
- Workarounds like separate dissipation test files linked by filenames replace proper relational modeling.

### Outdated Standards

The GEF-CPT spec references standards superseded by modern ISO equivalents.

- Soil classification references [NEN 5104](https://duckduckgo.com/?q=NEN+5104&ia=web) (1989), replaced by [ISO 14688-2](https://www.nen.nl/en/nen-en-iso-14688-2-2004-en-94323) (2004)
- CPT procedures reference [NEN 5140](https://www.nen.nl/en/nen-5140-1996-nl-19464) (1996), replaced by [ISO 22476-1](https://www.nen.nl/en/iso-22476-1-2022-en-305240) (2012)

This creates a significant gap between current industry capabilities and the format's design assumptions.

## Regulatory Transition and Industry Reality

The Dutch [Basis Registratie Ondergrond](https://basisregistratieondergrond.nl/) (BRO) program mandates a transition to XML-based data formats to ensure interoperability and modern regulatory compliance:

Since 2018, data submission in IMBRO/XML format is required. By July 1, 2025, governmental data holders must convert historical GEF-CPT data to IMBRO/XML.
A grace period extends until 2030 for full historical migration.

The new BRO laws make geotechnical data in GEF-CPT a "compliance liability".

### The Forces Shaping Formats

Different institutional needs drive different format preferences. This quote summarizes the situation

> The results of soundings, drillings and samples are processed the day after the investigation, after which the customer receives the report in an XML or GEF file. ‘The XML file is suitable for national databases such as BRO,’ says Van der Burg. ‘The GEF file is compatible with the calculation programmes.’

<!-- > De resultaten van sonderingen, boringen en monsters worden op de dag na het onderzoek uitgewerkt, waarna de klant de rapportage ontvangt in een xml- of gef-file. “De xml-file is geschikt voor landelijke databases zoals BRO”, vertelt Van der Burg. “De gef-file sluit aan op de rekenprogramma’s.” -->

> [Geotechnisch onderzoek in steden, op velden en wegen](https://gww-bouw.nl/specials/jaarboek/geotechnisch-onderzoek-in-steden-op-velden-en-wegen/)

BRO requires XML because regulatory databases need structured data adhering to current standards for archival integrity and legal compliance.
GEF persists because engineering calculation software, like [D-Foundations](https://www.deltares.nl/en/software-and-data/products/d-foundations), support it.
As far as I know, no engineering software can read BRO's complex XML structure. For most engineers, the priority is cone resistance data for calculation, not metadata for compliance

IMBRO/XML serves institutional governance; GEF remains established in workflows because it enjoys wider support, thus creating 'legacy format lock-in'.

## Structure

A GEF-CPT file consists of a **Header** and a **Datablock**.

The **Header** contains structured metadata using keywords that start with `#`, defining properties from file format version (`#GEFID`) to equipment specifications (`#MEASUREMENTVAR`) and coordinate systems (`#XYID`, `#ZID`). The header ends with `#EOH` (End of Header)

After it comes the **Datablock**, plain tabular data with penetration depth and cone resistance as mandatory columns 1 and 2, followed by optional measurements like friction, pore pressure, or inclination.

This text-based structure makes GEF files _human-readable_<sup>1</sup> while ensuring machine parsing compatibility across different software platforms.

<small>1. 'Human-readable' is rather generous. I'd call it human-openable-a-in-a-text-editor at most</small>

<svg width="928" height="784" style="height:784px" viewBox="-8,-24,928,784" style="max-width: 100%; height: auto; font: 11.428571428571429px sans-serif; overflow: visible;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="none" stroke="#999"><path d="&#10;M0,0&#10;V16&#10;h16&#10;"/><path d="&#10;M0,0&#10;V592&#10;h16&#10;"/><path d="&#10;M16,16&#10;V48&#10;h16&#10;"/><path d="&#10;M16,16&#10;V64&#10;h16&#10;"/><path d="&#10;M16,16&#10;V80&#10;h16&#10;"/><path d="&#10;M16,16&#10;V112&#10;h16&#10;"/><path d="&#10;M16,16&#10;V128&#10;h16&#10;"/><path d="&#10;M16,16&#10;V144&#10;h16&#10;"/><path d="&#10;M16,16&#10;V176&#10;h16&#10;"/><path d="&#10;M16,16&#10;V192&#10;h16&#10;"/><path d="&#10;M16,16&#10;V224&#10;h16&#10;"/><path d="&#10;M16,16&#10;V240&#10;h16&#10;"/><path d="&#10;M16,16&#10;V272&#10;h16&#10;"/><path d="&#10;M16,16&#10;V288&#10;h16&#10;"/><path d="&#10;M16,16&#10;V320&#10;h16&#10;"/><path d="&#10;M16,16&#10;V336&#10;h16&#10;"/><path d="&#10;M16,16&#10;V352&#10;h16&#10;"/><path d="&#10;M16,16&#10;V384&#10;h16&#10;"/><path d="&#10;M16,16&#10;V400&#10;h16&#10;"/><path d="&#10;M16,16&#10;V416&#10;h16&#10;"/><path d="&#10;M16,16&#10;V432&#10;h16&#10;"/><path d="&#10;M16,16&#10;V464&#10;h16&#10;"/><path d="&#10;M16,16&#10;V480&#10;h16&#10;"/><path d="&#10;M16,16&#10;V512&#10;h16&#10;"/><path d="&#10;M16,16&#10;V528&#10;h16&#10;"/><path d="&#10;M16,16&#10;V560&#10;h16&#10;"/><path d="&#10;M16,16&#10;V576&#10;h16&#10;"/><path d="&#10;M16,592&#10;V608&#10;h16&#10;"/><path d="&#10;M16,592&#10;V656&#10;h16&#10;"/><path d="&#10;M32,608&#10;V624&#10;h16&#10;"/><path d="&#10;M32,608&#10;V640&#10;h16&#10;"/><path d="&#10;M32,656&#10;V672&#10;h16&#10;"/><path d="&#10;M32,656&#10;V688&#10;h16&#10;"/><path d="&#10;M32,656&#10;V704&#10;h16&#10;"/><path d="&#10;M32,656&#10;V720&#10;h16&#10;"/><path d="&#10;M32,656&#10;V736&#10;h16&#10;"/><path d="&#10;M32,656&#10;V752&#10;h16&#10;"/></g><g><g transform="translate(0,0)"><circle cx="0" r="2"/><text dy="0.32em" x="6"><tspan font-weight="600" font-family="monospace" text-decoration="none">GEF-CPT-Report File</tspan><tspan dx="3.2">Complete GEF cone penetration test report file</tspan></text><title>GEF-CPT-Report File</title></g><g transform="translate(0,16)"><circle cx="16" r="2"/><text dy="0.32em" x="22"><tspan font-weight="600" font-family="monospace" text-decoration="none">Header Block</tspan><tspan dx="3.2">File metadata and test parameters</tspan></text><title>GEF-CPT-Report File/Header Block</title></g><g transform="translate(0,592)"><circle cx="16" r="2"/><text dy="0.32em" x="22"><tspan font-weight="600" font-family="monospace" text-decoration="none">Data Block</tspan><tspan dx="3.2">Tabular measurement data organized in scans</tspan></text><title>GEF-CPT-Report File/Data Block</title></g><g transform="translate(0,32)"><text dy="0.32em" x="38"><tspan font-weight="500" font-family="sans-serif" text-decoration="underline">GEF Identification</tspan></text><title>GEF-CPT-Report File/Header Block/GEF Identification</title></g><g transform="translate(0,48)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#GEFID</tspan><tspan dx="3.2">GEF version and format identification</tspan></text><title>GEF-CPT-Report File/Header Block/#GEFID</title></g><g transform="translate(0,64)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#REPORTCODE</tspan><tspan dx="3.2">Report format type and version</tspan></text><title>GEF-CPT-Report File/Header Block/#REPORTCODE</title></g><g transform="translate(0,80)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#DATAFORMAT</tspan><tspan dx="3.2">Data format specification</tspan></text><title>GEF-CPT-Report File/Header Block/#DATAFORMAT</title></g><g transform="translate(0,96)"><text dy="0.32em" x="38"><tspan font-weight="500" font-family="sans-serif" text-decoration="underline">File Metadata</tspan></text><title>GEF-CPT-Report File/Header Block/File Metadata</title></g><g transform="translate(0,112)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#FILEOWNER</tspan><tspan dx="3.2">File creator/owner name</tspan></text><title>GEF-CPT-Report File/Header Block/#FILEOWNER</title></g><g transform="translate(0,128)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#FILEDATE</tspan><tspan dx="3.2">File creation date</tspan></text><title>GEF-CPT-Report File/Header Block/#FILEDATE</title></g><g transform="translate(0,144)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#COMPANYID</tspan><tspan dx="3.2">Executing company information</tspan></text><title>GEF-CPT-Report File/Header Block/#COMPANYID</title></g><g transform="translate(0,160)"><text dy="0.32em" x="38"><tspan font-weight="500" font-family="sans-serif" text-decoration="underline">Project Information</tspan></text><title>GEF-CPT-Report File/Header Block/Project Information</title></g><g transform="translate(0,176)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#PROJECTID</tspan><tspan dx="3.2">Project identification</tspan></text><title>GEF-CPT-Report File/Header Block/#PROJECTID</title></g><g transform="translate(0,192)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#TESTID</tspan><tspan dx="3.2">CPT test identification number</tspan></text><title>GEF-CPT-Report File/Header Block/#TESTID</title></g><g transform="translate(0,208)"><text dy="0.32em" x="38"><tspan font-weight="500" font-family="sans-serif" text-decoration="underline">Coordinate &amp; Reference Systems</tspan></text><title>GEF-CPT-Report File/Header Block/Coordinate &amp; Reference Systems</title></g><g transform="translate(0,224)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#XYID</tspan><tspan dx="3.2">Horizontal coordinates and coordinate system</tspan></text><title>GEF-CPT-Report File/Header Block/#XYID</title></g><g transform="translate(0,240)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#ZID</tspan><tspan dx="3.2">Surface elevation and height reference system</tspan></text><title>GEF-CPT-Report File/Header Block/#ZID</title></g><g transform="translate(0,256)"><text dy="0.32em" x="38"><tspan font-weight="500" font-family="sans-serif" text-decoration="underline">Test Execution</tspan></text><title>GEF-CPT-Report File/Header Block/Test Execution</title></g><g transform="translate(0,272)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#STARTDATE</tspan><tspan dx="3.2">Test execution date</tspan></text><title>GEF-CPT-Report File/Header Block/#STARTDATE</title></g><g transform="translate(0,288)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#STARTTIME</tspan><tspan dx="3.2">Test execution time</tspan></text><title>GEF-CPT-Report File/Header Block/#STARTTIME</title></g><g transform="translate(0,304)"><text dy="0.32em" x="38"><tspan font-weight="500" font-family="sans-serif" text-decoration="underline">Data Structure Definition</tspan></text><title>GEF-CPT-Report File/Header Block/Data Structure Definition</title></g><g transform="translate(0,320)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#COLUMN</tspan><tspan dx="3.2">Number of numerical data columns</tspan></text><title>GEF-CPT-Report File/Header Block/#COLUMN</title></g><g transform="translate(0,336)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#COLUMNINFO</tspan><tspan dx="3.2">Column definitions, units, and quantity numbers</tspan></text><title>GEF-CPT-Report File/Header Block/#COLUMNINFO</title></g><g transform="translate(0,352)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#LASTSCAN</tspan><tspan dx="3.2">Number of data records (measurement scans)</tspan></text><title>GEF-CPT-Report File/Header Block/#LASTSCAN</title></g><g transform="translate(0,368)"><text dy="0.32em" x="38"><tspan font-weight="500" font-family="sans-serif" text-decoration="underline">Data Formatting</tspan></text><title>GEF-CPT-Report File/Header Block/Data Formatting</title></g><g transform="translate(0,384)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#COLUMNSEPARATOR</tspan><tspan dx="3.2">Character dividing columns in data block</tspan></text><title>GEF-CPT-Report File/Header Block/#COLUMNSEPARATOR</title></g><g transform="translate(0,400)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#RECORDSEPARATOR</tspan><tspan dx="3.2">Symbol at end of each measurement scan</tspan></text><title>GEF-CPT-Report File/Header Block/#RECORDSEPARATOR</title></g><g transform="translate(0,416)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#COLUMNTEXT</tspan><tspan dx="3.2">Text column on/off setting per column</tspan></text><title>GEF-CPT-Report File/Header Block/#COLUMNTEXT</title></g><g transform="translate(0,432)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#REPORTDATAFORMAT</tspan><tspan dx="3.2">Print format per column (FORTRAN style)</tspan></text><title>GEF-CPT-Report File/Header Block/#REPORTDATAFORMAT</title></g><g transform="translate(0,448)"><text dy="0.32em" x="38"><tspan font-weight="500" font-family="sans-serif" text-decoration="underline">Data Validation</tspan></text><title>GEF-CPT-Report File/Header Block/Data Validation</title></g><g transform="translate(0,464)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#COLUMNMINMAX</tspan><tspan dx="3.2">Min/max values per column</tspan></text><title>GEF-CPT-Report File/Header Block/#COLUMNMINMAX</title></g><g transform="translate(0,480)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#COLUMNVOID</tspan><tspan dx="3.2">No-data value definition per column</tspan></text><title>GEF-CPT-Report File/Header Block/#COLUMNVOID</title></g><g transform="translate(0,496)"><text dy="0.32em" x="38"><tspan font-weight="500" font-family="sans-serif" text-decoration="underline">Measurement Parameters</tspan></text><title>GEF-CPT-Report File/Header Block/Measurement Parameters</title></g><g transform="translate(0,512)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#MEASUREMENTVAR</tspan><tspan dx="3.2">Numerical measurement parameters with indexed IDs</tspan></text><title>GEF-CPT-Report File/Header Block/#MEASUREMENTVAR</title></g><g transform="translate(0,528)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#MEASUREMENTTEXT</tspan><tspan dx="3.2">Descriptive text information with indexed IDs</tspan></text><title>GEF-CPT-Report File/Header Block/#MEASUREMENTTEXT</title></g><g transform="translate(0,544)"><text dy="0.32em" x="38"><tspan font-weight="500" font-family="sans-serif" text-decoration="underline">Specimen Data</tspan></text><title>GEF-CPT-Report File/Header Block/Specimen Data</title></g><g transform="translate(0,560)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#SPECIMENVAR</tspan><tspan dx="3.2">Numerical specimen parameters</tspan></text><title>GEF-CPT-Report File/Header Block/#SPECIMENVAR</title></g><g transform="translate(0,576)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">#EOH</tspan><tspan dx="3.2">End of header marker - separates header from data</tspan></text><title>GEF-CPT-Report File/Header Block/#EOH</title></g><g transform="translate(0,608)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">Required Columns</tspan><tspan dx="3.2">Mandatory data columns that must be present</tspan></text><title>GEF-CPT-Report File/Data Block/Required Columns</title></g><g transform="translate(0,656)"><circle cx="32" r="2"/><text dy="0.32em" x="38"><tspan font-weight="600" font-family="monospace" text-decoration="none">Optional Columns</tspan><tspan dx="3.2">Additional measurement data columns</tspan></text><title>GEF-CPT-Report File/Data Block/Optional Columns</title></g><g transform="translate(0,624)"><circle cx="48" r="2"/><text dy="0.32em" x="54"><tspan font-weight="600" font-family="monospace" text-decoration="none">Column 1: Penetration Length (m)</tspan><tspan dx="3.2">Depth of cone tip below reference level</tspan></text><title>GEF-CPT-Report File/Data Block/Required Columns/Column 1: Penetration Length (m)</title></g><g transform="translate(0,640)"><circle cx="48" r="2"/><text dy="0.32em" x="54"><tspan font-weight="600" font-family="monospace" text-decoration="none">Column 2: Cone Resistance (MPa)</tspan><tspan dx="3.2">Measured cone tip resistance</tspan></text><title>GEF-CPT-Report File/Data Block/Required Columns/Column 2: Cone Resistance (MPa)</title></g><g transform="translate(0,672)"><circle cx="48" r="2"/><text dy="0.32em" x="54"><tspan font-weight="600" font-family="monospace" text-decoration="none">Friction Measurements</tspan><tspan dx="3.2">Sleeve friction and friction ratio data</tspan></text><title>GEF-CPT-Report File/Data Block/Optional Columns/Friction Measurements</title></g><g transform="translate(0,688)"><circle cx="48" r="2"/><text dy="0.32em" x="54"><tspan font-weight="600" font-family="monospace" text-decoration="none">Pore Pressure Measurements</tspan><tspan dx="3.2">Pore water pressure measurements (u1, u2, u3)</tspan></text><title>GEF-CPT-Report File/Data Block/Optional Columns/Pore Pressure Measurements</title></g><g transform="translate(0,704)"><circle cx="48" r="2"/><text dy="0.32em" x="54"><tspan font-weight="600" font-family="monospace" text-decoration="none">Inclination Measurements</tspan><tspan dx="3.2">Cone inclination from vertical</tspan></text><title>GEF-CPT-Report File/Data Block/Optional Columns/Inclination Measurements</title></g><g transform="translate(0,720)"><circle cx="48" r="2"/><text dy="0.32em" x="54"><tspan font-weight="600" font-family="monospace" text-decoration="none">Calculated Values</tspan><tspan dx="3.2">Derived parameters and soil properties</tspan></text><title>GEF-CPT-Report File/Data Block/Optional Columns/Calculated Values</title></g><g transform="translate(0,736)"><circle cx="48" r="2"/><text dy="0.32em" x="54"><tspan font-weight="600" font-family="monospace" text-decoration="none">Additional Measurements</tspan><tspan dx="3.2">Electric conductivity, magnetic field, etc.</tspan></text><title>GEF-CPT-Report File/Data Block/Optional Columns/Additional Measurements</title></g><g transform="translate(0,752)"><circle cx="48" r="2"/><text dy="0.32em" x="54"><tspan font-weight="600" font-family="monospace" text-decoration="none">Text Comments</tspan><tspan dx="3.2">Optional last column for comments on measurement scans</tspan></text><title>GEF-CPT-Report File/Data Block/Optional Columns/Text Comments</title></g></g></svg>

## Header Keywords

### Required

<iframe width="100%" height="260" style="height:260px" frameborder="0"
  src="https://observablehq.com/embed/@julesblm/geotechnical-exchange-format-gef-cpt@678?cells=requiredKeywords"></iframe>

<!--
| keyword     | description                                             | example                                   | category | dataType    | multiplicity | indexPattern  |
| ----------- | ------------------------------------------------------- | ----------------------------------------- | -------- | ----------- | ------------ | ------------- |
| #GEFID      | GEF release number                                      | #GEFID = 1,1,0                            | file     | version     | single       |               |
| #REPORTCODE | Report type and version                                 | #REPORTCODE = GEF-CPT-Report,1,1,0        | file     | text        | single       |               |
| #COLUMN     | Number of columns in data block                         | #COLUMN = 5                               | data     | number      | single       |               |
| #COLUMNINFO | Column definition (number, unit, description, quantity) | #COLUMNINFO = 1, m, penetration length, 1 | data     | multi_value | multiple     | column_number |
| #DATAFORMAT | Data format specification                               | #DATAFORMAT = ASCII                       | data     | text        | single       |               |
| #LASTSCAN   | Number of data rows                                     | #LASTSCAN = 1500                          | data     | number      | single       |               |
| #EOH        | End of header marker                                    | #EOH                                      | file     | marker      | single       |               |
 -->

### Optional

<iframe width="100%" height="489" style="height:489px" frameborder="0"
  src="https://observablehq.com/embed/@julesblm/geotechnical-exchange-format-gef-cpt@678?cells=optionalKeywords"></iframe>

<!-- | keyword           | description                             | example                                         | category        | dataType      | multiplicity | multiplicityType | indexPattern      |
| ----------------- | --------------------------------------- | ----------------------------------------------- | --------------- | ------------- | ------------ | ---------------- | ----------------- |
| #COMPANYID        | Executing company information           | `#COMPANYID = ABC Geo, NL, 12345`               | metadata        | multi_value   | single       | file_level       |                   |
| #STARTDATE        | Test execution date                     | `#STARTDATE = 2024, 3, 10`                      | test info       | date          | single       | file_level       |                   |
| #STARTTIME        | Test start time                         | `#STARTTIME = 9, 30, 0`                         | test info       | time          | single       | file_level       |                   |
| #PROJECTID        | Project order number                    | `#PROJECTID = PRJ-2024-001`                     | project         | text          | single       | file_level       |                   |
| #TESTID           | Test identification number              | `#TESTID = CPT-001`                             | test info       | text          | single       | file_level       |                   |
| #XYID             | Coordinate system and position          | `#XYID = 31000, 125000, 450000, 0.1, 0.1`       | coordinates     | coordinate    | single       | file_level       |                   |
| #ZID              | Height system and elevation             | `#ZID = 31000, 5.25, 0.02`                      | coordinates     | coordinate    | single       | file_level       |                   |
| #COLUMNMINMAX     | Min/max values per column               | `#COLUMNMINMAX = 1, 0.0, 15.5`                  | data validation | range         | multiple     | column_related   | column_number     |
| #COLUMNVOID       | No-data value definition                | `#COLUMNVOID = 1, -999.99`                      | data validation | number        | multiple     | column_related   | column_number     |
| #COLUMNSEPARATOR  | Character dividing columns              | `#COLUMNSEPARATOR = ,`                          | data structure  | character     | single       | file_level       |                   |
| #RECORDSEPARATOR  | Symbol at end of measurement scan       | `#RECORDSEPARATOR = ;`                          | data structure  | character     | single       | file_level       |                   |
| #COLUMNTEXT       | Text column on/off setting              | `#COLUMNTEXT = 1, 1`                            | data structure  | multi_value   | multiple     | column_related   | column_number     |
| #REPORTDATAFORMAT | Print format per column (FORTRAN style) | `#REPORTDATAFORMAT = F8.2F8.2F6.1`              | data structure  | format_string | single       | file_level       |                   |
| #MEASUREMENTTEXT  | Indexed text information                | `#MEASUREMENTTEXT = 1, ABC Engineering`         | descriptive     | text          | multiple     | indexed_keywords | predefined_id     |
| #MEASUREMENTVAR   | Indexed numeric measurements            | `#MEASUREMENTVAR = 1, 1000, mm2, Cone tip area` | descriptive     | multi_value   | multiple     | indexed_keywords | predefined_id     |
| #SPECIMENVAR      | Specimen/sample information             | `#SPECIMENVAR = 1, 2.5, m, Clay sample`         | samples         | multi_value   | multiple     | list_like_data   | sequential_number |
| #FILEDATE         | File creation date                      | `#FILEDATE = 2024, 3, 15`                       | metadata        | date          | single       | file_level       |                   |
 -->

### Measurement Variables

Measurement Variables (`#MEASUREMENTVAR`) are numerical parameters that define the physical characteristics and configuration of the CPT equipment and test setup. They use a standardized numbering system where each ID has a specific, predefined meaning.

Each measurement variable follows this format:

`#MEASUREMENTVAR = [ID], [value], [unit], [description]`.

The GEF specification reserves IDs 1-128 for standardized measurement variables. Users can define custom measurement variables using IDs outside this range.

Here follow the reserved IDs:

<iframe width="100%" height="418" style="height:418px" frameborder="0"
  src="https://observablehq.com/embed/@julesblm/geotechnical-exchange-format-gef-cpt@670?cells=viewof+measurementVariablesTable%2CmeasurementTextVariableOptions"></iframe>

## Measurement Text Variables

Measurement Text Variables (`#MEASUREMENTTEXT`) store descriptive information using a standardized ID numbering system. Unlike measurement variables (which are numerical), these contain human-readable text describing the project, equipment, and procedures.

`#MEASUREMENTTEXT = [ID], [text description]`

The following are `#MEASUREMENTTEXT` IDs are standardized:

<iframe width="100%" height="418px" style="height:418px" frameborder="0"
  src="https://observablehq.com/embed/@julesblm/geotechnical-exchange-format-gef-cpt@678?cells=viewof+measurementTextVariablesTable%2CmeasurementTextCodes"></iframe>

## Horizontal Reference System

The `#XYID` keyword defines the horizontal coordinate reference system in GEF-CPT files, specifying the positioning datum and location coordinates.

The format is `#XYID = code, X, Y, deltaX, deltaY`

- `code` identifies the coordinate system.
- `X` and `Y` provide the CPT location coordinates.
- `deltaX, deltaY` indicate positioning accuracy.

For example, `#XYID = 31000, 79578.38, 424838.97, 0.02, 0.02` places the test at Dutch RD coordinates (79578.38, 424838.97) with ±2cm accuracy.

This keyword enables places the test in real-world coordinates, which enables integration with GIS systems. This in turn enables integration of geotechnical data alongside structural or building models in spatial context.

<iframe width="100%" height="305" style="height:305px" frameborder="0"
  src="https://observablehq.com/embed/@julesblm/geotechnical-exchange-format-gef-cpt@675?cells=horizontalCoordsTable"></iframe>

### Local Coordinate Systems

Code `00000` allows a local coordinate system with its description in `#MEASUREMENTTEXT = 7`:
For example:

```
#XYID = 00000, 125000, 450000, 0.1, 0.1
#MEASUREMENTTEXT = 7, Local site grid, origin at main building corner
```

## Vertical Reference System

The `#ZID` keyword defines the vertical reference system and surface elevation.
It takes the format `#ZID = code, elevation, accuracy`.

- The code identifies the height reference system
- Elevation gives the surface level in meters relative to that datum
- Accuracy specifies measurement precision.

For example, `#ZID = 31000, +2.45, 0.02` means the CPT surface is 2.45 meters above [NAP](https://www.rijkswaterstaat.nl/zakelijk/open-data/normaal-amsterdams-peil) with ±2cm accuracy.

All penetration depths are measured relative to this surface level.
Proper height referencing enables integration with other geotechnical data, topographic surveys, and other construction models like BIM.

<iframe width="100%" height="237" style="height:237px" frameborder="0"
  src="https://observablehq.com/embed/@julesblm/geotechnical-exchange-format-gef-cpt@676?cells=verticalCoordsTable"></iframe>

## Column Quantities

Column Quantities are the standardized physical measurements that can appear in GEF-CPT data columns (`#COLUMNINFO`). Each has a unique ID number (1-36) that defines what the column contains.

For example `#COLUMNINFO = 3, MPa, pore pressure u2, 6` tells parsers: "Column 3 contains quantity 6 (u2 pore pressure) in MPa".

The quantity system ensures a column labeled "6" always means "u2 pore pressure", regardless of which software created the file.

<iframe width="100%" height="350" style="height:350px" frameborder="0"
  src="https://observablehq.com/embed/@julesblm/geotechnical-exchange-format-gef-cpt@678?cells=columnQuantitiesTable"></iframe>

## GEF 1.1.3 (Retrofit for BRO compatibility)

Version 1.1.3 was developed specifically for BRO compatibility by extending version 1.1.2 with additional `#MEASUREMENTTEXT` fields (101-128) to bridge legacy data formats with modern regulatory requirements. This extension was developed independently of Deltares and represents the final evolution of the GEF-CPT format before IMBRO/XML superseded it.

Information on GEF 1.1.3 is rather hard to find and I have yet to find a full 'official' spec for it. The best I've found so far is [CPTdata.nl GEF1.1.3 Release notes](https://www.cptdata.nl/downloads/gef113Releasenotes.pdf).
[This official standard](https://www.nen.nl/media/PDFjes/Background_report_NPR-9998_for_liquefaction_in_webtool_2018-08.pdf) refers to the VOTB website for the GEF1.1.3 reference but I can't find it there.

[De Vereniging Ondernemers Technisch Bodemonderzoek](https://votb.nl/) (VOTB)

> Vanuit de VOTB is geïnventariseerd welke extra informatie (velden) nodig zijn voor de BRO.
> Tevens zijn vanuit de leden van de VOTB extra velden gedefinieerd ten opzichte van GEF 1.1.2.
> GEF 1.1.2 is uitgebreid met deze extra velden en heeft de naam GEF 1.1.3 gekregen.
> De Excel-lijst met extra velden en dataformaat van deze extra velden, wordt beschikbaar
> via de VOTB website aan haar leden.

[*VOTB - GEF 1.1.3 – BRO –converter beschikbaar!*](https://votb.nl/wp-content/uploads/2016/02/180712-tekst-GEF-1.1.3-BRO-converter.pdf)

### BRO Measurement Text Additions

<iframe width="100%" height="350" frameborder="0"
  src="https://observablehq.com/embed/@julesblm/geotechnical-exchange-format-gef-cpt@682?cells=broMeasurmentTextAdditionsTable"></iframe>

### BRO Measurement Variables Additions

<iframe width="100%" height="350" frameborder="0"
  src="https://observablehq.com/embed/@julesblm/geotechnical-exchange-format-gef-cpt@679?cells=broMeasurmentVarAdditionsTable"></iframe>

### VOTB Measurement Variables Additions

<iframe width="100%" height="213" frameborder="0"
  src="https://observablehq.com/embed/@julesblm/geotechnical-exchange-format-gef-cpt@681?cells=votbMeasurmentVarAdditionsTable"></iframe>

## Sources

- [GEF-CPT report 1.1.2](https://publicwiki.deltares.nl/download/attachments/102204318/GEF-CPT.pdf?version=1&modificationDate=1409732008000&api=v2)
- [Power of Python by Rob van Putten](https://www.linkedin.com/pulse/power-python-rob-van-putten/)
- [CPTData.nl GEF-CPT 1.1.3 Release Notes](https://www.cptdata.nl/downloads/gef113Releasenotes.pdf)
- [BRO - Amsterdam deelt tools om slimmer, sneller en beter te werken met grondonderzoek](https://basisregistratieondergrond.nl/actueel/nieuws/nieuws/2023/juni/amsterdam-deelt-tools-slimmer-sneller-beter-werken/)
- [BRO - Nieuwe verplichting: leveren van archiefgegevens aan de BRO](https://basisregistratieondergrond.nl/actueel/nieuws/nieuws/2025/april/nieuwe-verplichting-leveren-archiefgegevens-bro/)
- [DINOLoket - Standardised cone penetration testing methods](https://www.dinoloket.nl/en/standardised-cone-penetration-testing-methods)
- [Fout in locatieaanduiding in GEF bestanden van het BRO Loket](https://geoforum.nl/t/fout-in-locatieaanduiding-in-gef-bestanden-van-het-bro-loket/9361/2)
- [Ben u bekend met de BRO en de NEN-EN-ISO 14688 voor grondonderzoek?](https://www.linkedin.com/pulse/ben-u-bekend-met-de-bro-en-nen-en-iso-14688-voor-ren%C3%A9-barth)
