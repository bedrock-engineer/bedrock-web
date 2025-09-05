---
title: "AGS4 Reference"
description: "A brief introduction to the AGS4 geotechnical data format."
author: "Jules Blom"
date: "2025-04-14"
categories: [ags, ags4]
prev: false
next: false
---

[AGS4](https://www.ags.org.uk/data-format/ags4-data-format/) is a standardized text file format designed for exchanging geotechnical information between different software systems used in geotechnical engineering. It organizes borehole logs, laboratory test results, and field measurements into structured data tables with validation rules to ensure consistent data quality across the geotechnical industry.

## Groups

In the AGS4 format, **Groups** are organizational containers that structure geotechnical data. Each Group represents a specific aspect of geotechnical investigation, for example, project information (`PROJ`), location details (`LOCA`), sample information (`SAMP`), or specific test types like Standard Penetration Tests (`ISPT`).

AGS4 Groups are organised in a hierarchical manner.
Each **sample** (`SAMP`) belongs to a **location** (`LOCA`). Each **location** belongs to a **project** (`PROJ`).

Here’s a an indented tree diagram showing the hierarchy of groups commonly found in an AGS4 file.

<svg xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;font:13px sans-serif; max-width: 450px;"  viewBox="-12 -24 402 424">
<g fill="none" stroke="currentColor">
    <path d="M0 0v24h24"/>
    <path d="M0 0v264h24"/>
    <path d="M0 0v288h24"/>
    <path d="M0 0v312h24"/>
    <path d="M0 0v336h24M24 24v24h24"/>
    <path d="M24 24v120h24"/>
    <path d="M24 24v168h24"/>
    <path d="M24 24v192h24"/>
    <path d="M24 24v216h24M48 48v24h24"/>
    <path d="M48 48v72h24M48 144v24h24M72 72v24h24"/>
</g>
<g fill="currentColor">
<g>
<circle r="2.5"/>
<text x="6" dy=".32em">
  <tspan font-weight="600">PROJ</tspan>
  <tspan dx="2">Project information</tspan>
</text>
</g>
<g transform="translate(0 24)"><circle cx="24" r="2.5"/>
<text x="30" dy=".32em">
  <tspan font-weight="600">LOCA</tspan>
  <tspan dx="2">Location details</tspan>
</text>
</g>
<g transform="translate(0 264)">
<circle cx="24" r="2.5" fill="currentColor"/>
<text x="30" dy=".32em">
  <tspan font-weight="600">ABBR</tspan>
  <tspan dx="2">Abbreviation Definitions</tspan>
</text>
</g>
<g transform="translate(0 288)">
<circle cx="24" r="2.5" fill="currentColor"/>
<text x="30" dy=".32em">
  <tspan font-weight="600">TRAN</tspan>
  <tspan dx="2">Data File Transmission Information / Data Status</tspan>
</text>
</g>
<g transform="translate(0 312)">
<circle cx="24" r="2.5" fill="currentColor"/>
<text x="30" dy=".32em">
  <tspan font-weight="600">TYPE</tspan>
  <tspan dx="2">Definition of Data Types</tspan>
</text>
</g>
<g transform="translate(0 336)">
<circle cx="24" r="2.5" fill="currentColor"/>
<text x="30" dy=".32em">
  <tspan font-weight="600">UNIT</tspan>
  <tspan dx="2">Definition of Units</tspan>
</text>
</g>
<g transform="translate(0 48)">
<circle cx="48" r="2.5"/>
<text x="54" dy=".32em">
  <tspan font-weight="600">SAMP</tspan>
  <tspan dx="2">Sample information</tspan>
</text>
</g>
<g transform="translate(0 144)">
<circle cx="48" r="2.5"/>
<text x="54" dy=".32em">
  <tspan font-weight="600">IPRG</tspan>
  <tspan dx="2">In Situ permeability</tspan>
</text>
</g>
<g transform="translate(0 192)">
<circle cx="48" r="2.5" fill="currentColor"/>
<text x="54" dy=".32em">
  <tspan font-weight="600">GEOL</tspan>
  <tspan dx="2">Geological descriptions</tspan>
</text>
</g>
<g transform="translate(0 216)">
<circle cx="48" r="2.5" fill="currentColor"/>
<text x="54" dy=".32em">
  <tspan font-weight="600">BKFL</tspan>
  <tspan dx="2">Backfill details</tspan>
</text>
</g>
<g transform="translate(0 240)">
<circle cx="48" r="2.5" fill="currentColor"/>
<text x="54" dy=".32em">
  <tspan font-weight="600">ISPT</tspan>
  <tspan dx="2">Standard Penetration Test</tspan>
</text>
</g>
<g transform="translate(0 72)">
<circle cx="72" r="2.5"/>
<text x="78" dy=".32em">
  <tspan font-weight="600">GRAG</tspan>
  <tspan dx="2">Particle size distribution analysis</tspan>
</text>
</g>
<g transform="translate(0 120)">
<circle cx="72" r="2.5" fill="currentColor"/>
<text x="78" dy=".32em">
  <tspan font-weight="600">LNMC</tspan>
  <tspan dx="2">Water content</tspan>
</text>
</g>
<g transform="translate(0 168)">
<circle cx="72" r="2.5" fill="currentColor"/>
<text x="78" dy=".32em">
  <tspan font-weight="600">IPRT</tspan>
  <tspan dx="2">In Situ permeability data</tspan>
</text>
</g>
<g transform="translate(0 96)">
<circle cx="96" r="2.5" fill="currentColor"/>
<text x="102" dy=".32em">
  <tspan font-weight="600">GRAT</tspan>
  <tspan dx="2">Particle size distribution analysis data</tspan>
</text></g>
</g>
</svg>

<details>

<summary>All Groups Hierarchy Tree</summary>

While AGS defines a load of groups, not all of them are used in every project.
For reference, here is the full hierarchy tree of all groups.

<svg xmlns="http://www.w3.org/2000/svg" overflow="visible" style="max-width:100%;height:auto;font:10px sans-serif" viewBox="-8 -12 404 1264"><g fill="none" stroke="currentColor"><path d="M0 0v16h16"/><path d="M0 0v1152h16"/><path d="M0 0v1168h16"/><path d="M0 0v1184h16"/><path d="M0 0v1200h16"/><path d="M0 0v1216h16"/><path d="M0 0v1232h16M16 16v16h16M32 32v16h16"/><path d="M32 32v544h16"/><path d="M32 32v560h16"/><path d="M32 32v576h16"/><path d="M32 32v592h16"/><path d="M32 32v608h16"/><path d="M32 32v640h16"/><path d="M32 32v656h16"/><path d="M32 32v672h16"/><path d="M32 32v688h16"/><path d="M32 32v704h16"/><path d="M32 32v736h16"/><path d="M32 32v752h16"/><path d="M32 32v816h16"/><path d="M32 32v832h16"/><path d="M32 32v848h16"/><path d="M32 32v864h16"/><path d="M32 32v880h16"/><path d="M32 32v896h16"/><path d="M32 32v912h16"/><path d="M32 32v928h16"/><path d="M32 32v944h16"/><path d="M32 32v960h16"/><path d="M32 32v976h16"/><path d="M32 32v992h16"/><path d="M32 32v1024h16"/><path d="M32 32v1040h16"/><path d="M32 32v1056h16"/><path d="M32 32v1088h16"/><path d="M32 32v1104h16M48 48v16h16"/><path d="M48 48v32h16"/><path d="M48 48v48h16"/><path d="M48 48v64h16"/><path d="M48 48v80h16"/><path d="M48 48v96h16"/><path d="M48 48v112h16"/><path d="M48 48v128h16"/><path d="M48 48v144h16"/><path d="M48 48v160h16"/><path d="M48 48v176h16"/><path d="M48 48v192h16"/><path d="M48 48v224h16"/><path d="M48 48v240h16"/><path d="M48 48v272h16"/><path d="M48 48v304h16"/><path d="M48 48v384h16"/><path d="M48 48v400h16"/><path d="M48 48v416h16"/><path d="M48 48v432h16"/><path d="M48 48v464h16"/><path d="M48 48v480h16"/><path d="M48 48v496h16M48 640v16h16M48 736v16h16M48 784v16h16"/><path d="M48 784v48h16M48 1024v16h16M48 1088v16h16M64 240v16h16M64 288v16h16M64 320v16h16M64 352v16h16"/><path d="M64 352v64h16M64 480v16h16M64 544v16h16M64 800v16h16M80 368v16h16M96 384v16h16"/></g>
<g fill="currentColor">
<g><circle r="2"/>
<text x="6" dy=".32em">
<tspan font-weight="600">AGS4 file</tspan>
</text></g>
<g transform="translate(0 16)"><circle cx="16" r="2"/>
<text x="22" dy=".32em">
<tspan font-weight="600">PROJ</tspan>
<tspan dx="2">Project Information</tspan>
</text></g>
<g transform="translate(0 1152)"><circle cx="16" r="2"/>
<text x="22" dy=".32em">
<tspan font-weight="600">ABBR</tspan>
<tspan dx="2">Abbreviation Definitions</tspan>
</text></g>
<g transform="translate(0 1168)"><circle cx="16" r="2"/>
<text x="22" dy=".32em">
<tspan font-weight="600">DICT</tspan>
<tspan dx="2">User Defined Groups and Headings</tspan>
</text></g>
<g transform="translate(0 1184)"><circle cx="16" r="2"/>
<text x="22" dy=".32em">
<tspan font-weight="600">FILE</tspan>
<tspan dx="2">Associated Files</tspan>
</text></g>
<g transform="translate(0 1200)"><circle cx="16" r="2"/>
<text x="22" dy=".32em">
<tspan font-weight="600">TRAN</tspan>
<tspan dx="2">Data File Transmission Information / Data Status</tspan>
</text></g>
<g transform="translate(0 1216)"><circle cx="16" r="2"/>
<text x="22" dy=".32em">
<tspan font-weight="600">TYPE</tspan>
<tspan dx="2">Definition of Data Types</tspan>
</text></g>
<g transform="translate(0 1232)"><circle cx="16" r="2"/>
<text x="22" dy=".32em">
<tspan font-weight="600">UNIT</tspan>
<tspan dx="2">Definition of Units</tspan>
</text></g>
<g transform="translate(0 32)"><circle cx="32" r="2"/>
<text x="38" dy=".32em">
<tspan font-weight="600">LOCA</tspan>
<tspan dx="2">Location Details</tspan>
</text></g>
<g transform="translate(0 48)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">SAMP</tspan>
<tspan dx="2">Sample Information</tspan>
</text></g>
<g transform="translate(0 576)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">BKFL</tspan>
<tspan dx="2">Exploratory Hole Backfill Details</tspan>
</text></g>
<g transform="translate(0 592)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">CDIA</tspan>
<tspan dx="2">Casing Diameter by Depth</tspan>
</text></g>
<g transform="translate(0 608)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">CHIS</tspan>
<tspan dx="2">Chiselling Details</tspan>
</text></g>
<g transform="translate(0 624)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">CORE</tspan>
<tspan dx="2">Coring Information</tspan>
</text></g>
<g transform="translate(0 640)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">DCPG</tspan>
<tspan dx="2">Dynamic Cone Penetrometer Tests - General</tspan>
</text></g>
<g transform="translate(0 672)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">DETL</tspan>
<tspan dx="2">Stratum Detail Descriptions</tspan>
</text></g>
<g transform="translate(0 688)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">DISC</tspan>
<tspan dx="2">Discontinuity Data</tspan>
</text></g>
<g transform="translate(0 704)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">DLOG</tspan>
<tspan dx="2">Driller Geological Description</tspan>
</text></g>
<g transform="translate(0 720)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">DOBS</tspan>
<tspan dx="2">Drilling/Advancement Observations &amp; Parameters</tspan>
</text></g>
<g transform="translate(0 736)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">DPRG</tspan>
<tspan dx="2">Dynamic Probe Tests - General</tspan>
</text></g>
<g transform="translate(0 768)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">DREM</tspan>
<tspan dx="2">Depth Related Remarks</tspan>
</text></g>
<g transform="translate(0 784)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">FGHG</tspan>
<tspan dx="2">Field Geohydraulic Testing - General</tspan>
</text></g>
<g transform="translate(0 848)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">FLSH</tspan>
<tspan dx="2">Drilling Flush Details</tspan>
</text></g>
<g transform="translate(0 864)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">FRAC</tspan>
<tspan dx="2">Fracture Spacing</tspan>
</text></g>
<g transform="translate(0 880)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">GEOL</tspan>
<tspan dx="2">Field Geological Descriptions</tspan>
</text></g>
<g transform="translate(0 896)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">HDIA</tspan>
<tspan dx="2">Hole Diameter by Depth</tspan>
</text></g>
<g transform="translate(0 912)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">HDPH</tspan>
<tspan dx="2">Depth Related Exploratory Hole Information</tspan>
</text></g>
<g transform="translate(0 928)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">HORN</tspan>
<tspan dx="2">Exploratory Hole Orientation and Inclination</tspan>
</text></g>
<g transform="translate(0 944)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">ICBR</tspan>
<tspan dx="2">In Situ California Bearing Ratio Tests</tspan>
</text></g>
<g transform="translate(0 960)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">IDEN</tspan>
<tspan dx="2">In Situ Density Tests</tspan>
</text></g>
<g transform="translate(0 976)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">IFID</tspan>
<tspan dx="2">On Site Volatile Headspace Testing Using Flame Ionisation Detector</tspan>
</text></g>
<g transform="translate(0 992)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">IPEN</tspan>
<tspan dx="2">In Situ Hand Penetrometer Tests</tspan>
</text></g>
<g transform="translate(0 1008)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">IPID</tspan>
<tspan dx="2">On Site Volatile Headspace Testing by Photo Ionisation Detector</tspan>
</text></g>
<g transform="translate(0 1024)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">IPRG</tspan>
<tspan dx="2">In Situ Permeability Tests - General</tspan>
</text></g>
<g transform="translate(0 1056)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">IRDX</tspan>
<tspan dx="2">In Situ Redox Tests</tspan>
</text></g>
<g transform="translate(0 1072)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">IRES</tspan>
<tspan dx="2">In Situ Resistivity Tests</tspan>
</text></g>
<g transform="translate(0 1088)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">ISAG</tspan>
<tspan dx="2">Soakaway Tests - General</tspan>
</text></g>
<g transform="translate(0 1120)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">ISPT</tspan>
<tspan dx="2">Standard Penetration Test Results</tspan>
</text></g>
<g transform="translate(0 1136)"><circle cx="48" r="2"/>
<text x="54" dy=".32em">
<tspan font-weight="600">IVAN</tspan>
<tspan dx="2">In Situ Vane Tests</tspan>
</text></g>
<g transform="translate(0 64)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">AAVT</tspan>
<tspan dx="2">Aggregate Abrasion Tests</tspan>
</text></g>
<g transform="translate(0 80)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">ACVT</tspan>
<tspan dx="2">Aggregate Crushing Value Tests</tspan>
</text></g>
<g transform="translate(0 96)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">AELO</tspan>
<tspan dx="2">Aggregate Elongation Index Tests</tspan>
</text></g>
<g transform="translate(0 112)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">AFLK</tspan>
<tspan dx="2">Aggregate Flakiness Tests</tspan>
</text></g>
<g transform="translate(0 128)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">AIVT</tspan>
<tspan dx="2">Aggregate Impact Value Tests</tspan>
</text></g>
<g transform="translate(0 144)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">ALOS</tspan>
<tspan dx="2">Los Angeles Abrasion Tests</tspan>
</text></g>
<g transform="translate(0 160)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">APSV</tspan>
<tspan dx="2">Aggregate Polished Stone Tests</tspan>
</text></g>
<g transform="translate(0 176)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">ARTW</tspan>
<tspan dx="2">Aggregate Determination of the Resistance to Wear (micro-Deval)</tspan>
</text></g>
<g transform="translate(0 192)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">ASDI</tspan>
<tspan dx="2">Slake Durability Index Tests</tspan>
</text></g>
<g transform="translate(0 208)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">ASNS</tspan>
<tspan dx="2">Aggregate Soundness Tests</tspan>
</text></g>
<g transform="translate(0 224)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">AWAD</tspan>
<tspan dx="2">Aggregate Water Absorption Tests</tspan>
</text></g>
<g transform="translate(0 240)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">CBRG</tspan>
<tspan dx="2">California Bearing Ratio Tests - General</tspan>
</text></g>
<g transform="translate(0 272)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">CHOC</tspan>
<tspan dx="2">Chain of Custody Information</tspan>
</text></g>
<g transform="translate(0 288)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">CMPG</tspan>
<tspan dx="2">Compaction Tests - General</tspan>
</text></g>
<g transform="translate(0 320)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">CONG</tspan>
<tspan dx="2">Consolidation Tests - General</tspan>
</text></g>
<g transform="translate(0 352)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">CTRG</tspan>
<tspan dx="2">Cyclic Triaxial Test - General</tspan>
</text></g>
<g transform="translate(0 432)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">ECTN</tspan>
<tspan dx="2">Sample Container Details</tspan>
</text></g>
<g transform="translate(0 448)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">ELRG</tspan>
<tspan dx="2">Environmental Laboratory Reporting</tspan>
</text></g>
<g transform="translate(0 464)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">ERES</tspan>
<tspan dx="2">Environmental Contaminant Testing</tspan>
</text></g>
<g transform="translate(0 480)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">ESCG</tspan>
<tspan dx="2">Effective Stress Consolidation Tests - General</tspan>
</text></g>
<g transform="translate(0 512)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">FRST</tspan>
<tspan dx="2">Frost Susceptibility Tests</tspan>
</text></g>
<g transform="translate(0 528)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">GCHM</tspan>
<tspan dx="2">Geotechnical Chemistry Testing</tspan>
</text></g>
<g transform="translate(0 544)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">GRAG</tspan>
<tspan dx="2">Particle Size Distribution Analysis - General</tspan>
</text></g>
<g transform="translate(0 656)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">DCPT</tspan>
<tspan dx="2">Dynamic Cone Penetrometer Tests - Data</tspan>
</text></g>
<g transform="translate(0 752)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">DPRB</tspan>
<tspan dx="2">Dynamic Probe Tests - Data</tspan>
</text></g>
<g transform="translate(0 800)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">FGHI</tspan>
<tspan dx="2">Field Geohydraulic Testing - Instrumentation Details</tspan>
</text></g>
<g transform="translate(0 832)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">FGHS</tspan>
<tspan dx="2">Field Geohydraulic Testing - Test Results (per stage)</tspan>
</text></g>
<g transform="translate(0 1040)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">IPRT</tspan>
<tspan dx="2">In Situ Permeability Tests - Data</tspan>
</text></g>
<g transform="translate(0 1104)"><circle cx="64" r="2"/>
<text x="70" dy=".32em">
<tspan font-weight="600">ISAT</tspan>
<tspan dx="2">Soakaway Tests - Data</tspan>
</text></g>
<g transform="translate(0 256)"><circle cx="80" r="2"/>
<text x="86" dy=".32em">
<tspan font-weight="600">CBRT</tspan>
<tspan dx="2">California Bearing Ratio Tests - Data</tspan>
</text></g>
<g transform="translate(0 304)"><circle cx="80" r="2"/>
<text x="86" dy=".32em">
<tspan font-weight="600">CMPT</tspan>
<tspan dx="2">Compaction Tests - Data</tspan>
</text></g>
<g transform="translate(0 336)"><circle cx="80" r="2"/>
<text x="86" dy=".32em">
<tspan font-weight="600">CONS</tspan>
<tspan dx="2">Consolidation Tests - Data</tspan>
</text></g>
<g transform="translate(0 368)"><circle cx="80" r="2"/>
<text x="86" dy=".32em">
<tspan font-weight="600">CTRC</tspan>
<tspan dx="2">Cyclic Triaxial Tests - Consolidation</tspan>
</text></g>
<g transform="translate(0 416)"><circle cx="80" r="2"/>
<text x="86" dy=".32em">
<tspan font-weight="600">CTRS</tspan>
<tspan dx="2">Cyclic Triaxial Test - Saturation</tspan>
</text></g>
<g transform="translate(0 496)"><circle cx="80" r="2"/>
<text x="86" dy=".32em">
<tspan font-weight="600">ESCT</tspan>
<tspan dx="2">Effective Stress Consolidation Tests - Data</tspan>
</text></g>
<g transform="translate(0 560)"><circle cx="80" r="2"/>
<text x="86" dy=".32em">
<tspan font-weight="600">GRAT</tspan>
<tspan dx="2">Particle Size Distribution Analysis - Data</tspan>
</text></g>
<g transform="translate(0 816)"><circle cx="80" r="2"/>
<text x="86" dy=".32em">
<tspan font-weight="600">FGHT</tspan>
<tspan dx="2">Field Geohydraulic Testing - Data</tspan>
</text></g>
<g transform="translate(0 384)"><circle cx="96" r="2"/>
<text x="102" dy=".32em">
<tspan font-weight="600">CTRP</tspan>
<tspan dx="2">Cyclic Triaxial Test - Derived Parameters</tspan>
</text></g>
<g transform="translate(0 400)"><circle cx="112" r="2"/>
<text x="118" dy=".32em">
<tspan font-weight="600">CTRD</tspan>
<tspan dx="2">Cyclic Triaxial Tests - Data</tspan>
</text>
</g>
</g></svg>

</details>

## Headings

Headings are the specific data fields (i.e. the columns) within each group that define individual data items.
Each heading represents a specific piece of information that can be recorded during geotechnical investigations, such as sample depth, moisture content, or test result values

Headings follow a standardized naming pattern, typically beginning with the group name as a prefix (e.g., "PROJ_ID" for project identifier in the PROJ group).
Some headings are marked as required (\*R or R), indicating that they must be populated in a valid AGS file to maintain data integrity.
Headings include additional information like units of measurement, descriptions, and example values to help users understand their purpose.

<details>
<summary>Heading details</summary>
<dl>
<dt>Data Definition</dt><dd>Each heading represents a specific piece of information that can be recorded during geotechnical investigations, such as sample depth, moisture content, or test result values.<dd>
<dt>Naming Convention</dt><dd>Headings follow a standardized naming pattern, typically beginning with the group name as a prefix (e.g., "PROJ_ID" for project identifier in the PROJ group).</dd>
<dt>Data Typing</dt><dd>Each heading has a defined data type (e.g., "ID" for identifiers, "X" for text, "N" for numeric values) that specifies what kind of information it contains.</dd>
<dt>Required Status</dt><dd>Some headings are marked as required (*R or R), indicating that they must be populated in a valid AGS file to maintain data integrity.</dd>
<dt>Metadata Structure</dt><dd>Headings include additional information like units of measurement, descriptions, and example values to help users understand their purpose.</dd>
</dl>
</details>

<iframe width="100%" height="481" frameborder="0" style="height: 600px;"
  src="https://observablehq.com/embed/@julesblm/ags4-data-format@522?cells=viewof+groupSearch%2Cviewof+groupTable%2CgroupText%2CheadingsTable"></iframe>
