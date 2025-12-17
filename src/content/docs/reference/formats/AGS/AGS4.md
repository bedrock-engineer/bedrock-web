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

<svg xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;font:13px sans-serif; max-width: 450px;"  viewBox="-12 -24 402 358">
    <g fill="none" stroke="currentColor">
        <path d="&#10;M0,0&#10;V24&#10;h24&#10;" />
        <path d="&#10;M0,0&#10;V240&#10;h24&#10;" />
        <path d="&#10;M0,0&#10;V264&#10;h24&#10;" />
        <path d="&#10;M0,0&#10;V288&#10;h24&#10;" />
        <path d="&#10;M0,0&#10;V312&#10;h24&#10;" />
        <path d="&#10;M24,24&#10;V48&#10;h24&#10;" />
        <path d="&#10;M24,24&#10;V144&#10;h24&#10;" />
        <path d="&#10;M24,24&#10;V192&#10;h24&#10;" />
        <path d="&#10;M24,24&#10;V216&#10;h24&#10;" />
        <path d="&#10;M48,48&#10;V72&#10;h24&#10;" />
        <path d="&#10;M48,48&#10;V120&#10;h24&#10;" />
        <path d="&#10;M48,144&#10;V168&#10;h24&#10;" />
        <path d="&#10;M72,72&#10;V96&#10;h24&#10;" />
    </g>
    <g fill="currentColor">
        <g transform="translate(0,0)">
            <circle fill="currentColor" cx="0" r="2" />
            <text dy="0.32em" x="6">
                <tspan font-weight="600" font-family="monospace">PROJ</tspan>
                <tspan dx="4.8">Project Information</tspan>
            </text>
            <title>PROJ</title>
        </g>
        <g transform="translate(0,24)">
            <circle fill="currentColor" cx="24" r="2" />
            <text dy="0.32em" x="30">
                <tspan font-weight="600" font-family="monospace">LOCA</tspan>
                <tspan dx="4.8">Location Details</tspan>
            </text>
            <title>PROJ/LOCA</title>
        </g>
        <g transform="translate(0,240)">
            <circle fill="currentColor" cx="24" r="2" />
            <text dy="0.32em" x="30">
                <tspan font-weight="600" font-family="monospace">ABBR</tspan>
                <tspan dx="4.8">Abbreviation Definitions</tspan>
            </text>
            <title>PROJ/ABBR</title>
        </g>
        <g transform="translate(0,264)">
            <circle fill="currentColor" cx="24" r="2" />
            <text dy="0.32em" x="30">
                <tspan font-weight="600" font-family="monospace">TRAN</tspan>
                <tspan dx="4.8">Data File Transmission Information / Data Status</tspan>
            </text>
            <title>PROJ/TRAN</title>
        </g>
        <g transform="translate(0,288)">
            <circle fill="currentColor" cx="24" r="2" />
            <text dy="0.32em" x="30">
                <tspan font-weight="600" font-family="monospace">TYPE</tspan>
                <tspan dx="4.8">Definition of Data Types</tspan>
            </text>
            <title>PROJ/TYPE</title>
        </g>
        <g transform="translate(0,312)">
            <circle fill="currentColor" cx="24" r="2" />
            <text dy="0.32em" x="30">
                <tspan font-weight="600" font-family="monospace">UNIT</tspan>
                <tspan dx="4.8">Definition of Units</tspan>
            </text>
            <title>PROJ/UNIT</title>
        </g>
        <g transform="translate(0,48)">
            <circle fill="currentColor" cx="48" r="2" />
            <text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace">SAMP</tspan>
                <tspan dx="4.8">Sample Information</tspan>
            </text>
            <title>PROJ/LOCA/SAMP</title>
        </g>
        <g transform="translate(0,144)">
            <circle fill="currentColor" cx="48" r="2" />
            <text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace">SCPG</tspan>
                <tspan dx="4.8">Static Cone Penetration Tests - General</tspan>
            </text>
            <title>PROJ/LOCA/SCPG</title>
        </g>
        <g transform="translate(0,192)">
            <circle fill="currentColor" cx="48" r="2" />
            <text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace">GEOL</tspan>
                <tspan dx="4.8">Field Geological Descriptions</tspan>
            </text>
            <title>PROJ/LOCA/GEOL</title>
        </g>
        <g transform="translate(0,216)">
            <circle fill="currentColor" cx="48" r="2" />
            <text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace">ISPT</tspan>
                <tspan dx="4.8">Standard Penetration Test Results</tspan>
            </text>
            <title>PROJ/LOCA/ISPT</title>
        </g>
        <g transform="translate(0,72)">
            <circle fill="currentColor" cx="72" r="2" />
            <text dy="0.32em" x="78">
                <tspan font-weight="600" font-family="monospace">GRAG</tspan>
                <tspan dx="4.8">Particle Size Distribution Analysis - General</tspan>
            </text>
            <title>PROJ/LOCA/SAMP/GRAG</title>
        </g>
        <g transform="translate(0,120)">
            <circle fill="currentColor" cx="72" r="2" />
            <text dy="0.32em" x="78">
                <tspan font-weight="600" font-family="monospace">LNMC</tspan>
                <tspan dx="4.8">Water/moisture Content Tests</tspan>
            </text>
            <title>PROJ/LOCA/SAMP/LNMC</title>
        </g>
        <g transform="translate(0,168)">
            <circle fill="currentColor" cx="72" r="2" />
            <text dy="0.32em" x="78">
                <tspan font-weight="600" font-family="monospace">SCPT</tspan>
                <tspan dx="4.8">Static Cone Penetration Tests - Data</tspan>
            </text>
            <title>PROJ/LOCA/SCPG/SCPT</title>
        </g>
        <g transform="translate(0,96)">
            <circle fill="currentColor" cx="96" r="2" />
            <text dy="0.32em" x="102">
                <tspan font-weight="600" font-family="monospace">GRAT</tspan>
                <tspan dx="4.8">Particle Size Distribution Analysis - Data</tspan>
            </text>
            <title>PROJ/LOCA/SAMP/GRAG/GRAT</title>
        </g>
    </g>
</svg>

<details>

<summary>All Groups Hierarchy Tree</summary>

While AGS defines a load of groups, not all of them are used in every project.
For reference, here is the full hierarchy tree of all groups.

<svg viewBox="-8,-24,628,2384"
    style="max-width: 100%; height: auto; font: 11.43px sans-serif; overflow: visible;"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g fill="none" stroke="currentColor">
        <path d="&#10; M0,0&#10; V16&#10; h16&#10;" />
        <path d="&#10; M0,0&#10; V2208&#10; h16&#10;" />
        <path d="&#10; M0,0&#10; V2224&#10; h16&#10;" />
        <path d="&#10; M0,0&#10; V2240&#10; h16&#10;" />
        <path d="&#10; M0,0&#10; V2256&#10; h16&#10;" />
        <path d="&#10; M0,0&#10; V2272&#10; h16&#10;" />
        <path d="&#10; M0,0&#10; V2288&#10; h16&#10;" />
        <path d="&#10; M0,0&#10; V2320&#10; h16&#10;" />
        <path d="&#10; M0,0&#10; V2336&#10; h16&#10;" />
        <path d="&#10; M0,0&#10; V2352&#10; h16&#10;" />
        <path d="&#10; M16,16&#10; V32&#10; h16&#10;" />
        <path d="&#10; M16,2288&#10; V2304&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V48&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V64&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V80&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V96&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V112&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V144&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V160&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V176&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V192&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V208&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V240&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V256&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V320&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V336&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V352&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V368&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V384&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V400&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V416&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V432&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V448&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V464&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V480&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V496&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V528&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V544&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V560&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V592&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V608&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V624&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V656&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V672&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V704&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V752&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V768&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V800&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V2016&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V2080&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V2096&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V2112&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V2128&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V2160&#10; h16&#10;" />
        <path d="&#10; M32,32&#10; V2176&#10; h16&#10;" />
        <path d="&#10; M48,112&#10; V128&#10; h16&#10;" />
        <path d="&#10; M48,208&#10; V224&#10; h16&#10;" />
        <path d="&#10; M48,256&#10; V272&#10; h16&#10;" />
        <path d="&#10; M48,256&#10; V288&#10; h16&#10;" />
        <path d="&#10; M48,496&#10; V512&#10; h16&#10;" />
        <path d="&#10; M48,560&#10; V576&#10; h16&#10;" />
        <path d="&#10; M48,624&#10; V640&#10; h16&#10;" />
        <path d="&#10; M48,672&#10; V688&#10; h16&#10;" />
        <path d="&#10; M48,704&#10; V720&#10; h16&#10;" />
        <path d="&#10; M48,704&#10; V736&#10; h16&#10;" />
        <path d="&#10; M48,768&#10; V784&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V816&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V832&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V848&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V864&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V880&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V896&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V912&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V928&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V944&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V960&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V976&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V992&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1024&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1040&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1072&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1104&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1184&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1200&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1216&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1232&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1264&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1280&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1296&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1328&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1344&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1360&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1376&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1392&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1408&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1424&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1440&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1456&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1472&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1488&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1520&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1536&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1552&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1568&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1584&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1616&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1632&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1664&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1680&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1696&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1712&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1792&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1808&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1824&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1840&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1856&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1872&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1888&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1920&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1936&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1952&#10; h16&#10;" />
        <path d="&#10; M48,800&#10; V1984&#10; h16&#10;" />
        <path d="&#10; M48,2016&#10; V2032&#10; h16&#10;" />
        <path d="&#10; M48,2016&#10; V2064&#10; h16&#10;" />
        <path d="&#10; M48,2128&#10; V2144&#10; h16&#10;" />
        <path d="&#10; M48,2176&#10; V2192&#10; h16&#10;" />
        <path d="&#10; M64,288&#10; V304&#10; h16&#10;" />
        <path d="&#10; M64,992&#10; V1008&#10; h16&#10;" />
        <path d="&#10; M64,1040&#10; V1056&#10; h16&#10;" />
        <path d="&#10; M64,1072&#10; V1088&#10; h16&#10;" />
        <path d="&#10; M64,1104&#10; V1120&#10; h16&#10;" />
        <path d="&#10; M64,1104&#10; V1168&#10; h16&#10;" />
        <path d="&#10; M64,1232&#10; V1248&#10; h16&#10;" />
        <path d="&#10; M64,1296&#10; V1312&#10; h16&#10;" />
        <path d="&#10; M64,1488&#10; V1504&#10; h16&#10;" />
        <path d="&#10; M64,1584&#10; V1600&#10; h16&#10;" />
        <path d="&#10; M64,1632&#10; V1648&#10; h16&#10;" />
        <path d="&#10; M64,1712&#10; V1728&#10; h16&#10;" />
        <path d="&#10; M64,1712&#10; V1744&#10; h16&#10;" />
        <path d="&#10; M64,1712&#10; V1776&#10; h16&#10;" />
        <path d="&#10; M64,1888&#10; V1904&#10; h16&#10;" />
        <path d="&#10; M64,1952&#10; V1968&#10; h16&#10;" />
        <path d="&#10; M64,1984&#10; V2000&#10; h16&#10;" />
        <path d="&#10; M64,2032&#10; V2048&#10; h16&#10;" />
        <path d="&#10; M80,1120&#10; V1136&#10; h16&#10;" />
        <path d="&#10; M80,1744&#10; V1760&#10; h16&#10;" />
        <path d="&#10; M96,1136&#10; V1152&#10; h16&#10;" />
    </g>
    <g fill="currentColor">
        <g transform="translate(0,0)" >
            <circle cx="0" r="2" /><text dy="0.32em" x="6">
                <tspan font-weight="600" font-family="monospace" fill="inherit">AGS4 File</tspan>
                <tspan dx="3.2">-</tspan>
            </text>
            <title>AGS4 File</title>
        </g>
        <g transform="translate(0,16)">
            <circle cx="16" r="2" /><text dy="0.32em" x="22">
                <tspan font-weight="600" font-family="monospace" fill="inherit">PROJ</tspan>
                <tspan dx="3.2">Project Information</tspan>
            </text>
            <title>AGS4 File/PROJ</title>
        </g>
        <g transform="translate(0,2208)">
            <circle cx="16" r="2" /><text dy="0.32em" x="22">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ABBR</tspan>
                <tspan dx="3.2">Abbreviation Definitions</tspan>
            </text>
            <title>AGS4 File/ABBR</title>
        </g>
        <g transform="translate(0,2224)">
            <circle cx="16" r="2" /><text dy="0.32em" x="22">
                <tspan font-weight="600" font-family="monospace" fill="inherit">DICT</tspan>
                <tspan dx="3.2">User Defined Groups and Headings</tspan>
            </text>
            <title>AGS4 File/DICT</title>
        </g>
        <g transform="translate(0,2240)">
            <circle cx="16" r="2" /><text dy="0.32em" x="22">
                <tspan font-weight="600" font-family="monospace" fill="inherit">FILE</tspan>
                <tspan dx="3.2">Associated Files</tspan>
            </text>
            <title>AGS4 File/FILE</title>
        </g>
        <g transform="translate(0,2256)">
            <circle cx="16" r="2" /><text dy="0.32em" x="22">
                <tspan font-weight="600" font-family="monospace" fill="inherit">TRAN</tspan>
                <tspan dx="3.2">Data File Transmission Information / Data Status</tspan>
            </text>
            <title>AGS4 File/TRAN</title>
        </g>
        <g transform="translate(0,2272)">
            <circle cx="16" r="2" /><text dy="0.32em" x="22">
                <tspan font-weight="600" font-family="monospace" fill="inherit">TYPE</tspan>
                <tspan dx="3.2">Definition of Data Types</tspan>
            </text>
            <title>AGS4 File/TYPE</title>
        </g>
        <g transform="translate(0,2288)">
            <circle cx="16" r="2" /><text dy="0.32em" x="22">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LBSG</tspan>
                <tspan dx="3.2">Testing Schedule</tspan>
            </text>
            <title>AGS4 File/LBSG</title>
        </g>
        <g transform="translate(0,2320)">
            <circle cx="16" r="2" /><text dy="0.32em" x="22">
                <tspan font-weight="600" font-family="monospace" fill="inherit">PREM</tspan>
                <tspan dx="3.2">Project Specific Time Related Remarks</tspan>
            </text>
            <title>AGS4 File/PREM</title>
        </g>
        <g transform="translate(0,2336)">
            <circle cx="16" r="2" /><text dy="0.32em" x="22">
                <tspan font-weight="600" font-family="monospace" fill="inherit">UNIT</tspan>
                <tspan dx="3.2">Definition of Units</tspan>
            </text>
            <title>AGS4 File/UNIT</title>
        </g>
        <g transform="translate(0,2352)">
            <circle cx="16" r="2" /><text dy="0.32em" x="22">
                <tspan font-weight="600" font-family="monospace" fill="inherit">STND</tspan>
                <tspan dx="3.2">Standards / Specifications</tspan>
            </text>
            <title>AGS4 File/STND</title>
        </g>
        <g transform="translate(0,32)">
            <circle cx="32" r="2" /><text dy="0.32em" x="38">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LOCA</tspan>
                <tspan dx="3.2">Location Details</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA</title>
        </g>
        <g transform="translate(0,2304)">
            <circle cx="32" r="2" /><text dy="0.32em" x="38">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LBST</tspan>
                <tspan dx="3.2">Testing Schedule Details</tspan>
            </text>
            <title>AGS4 File/LBSG/LBST</title>
        </g>
        <g transform="translate(0,48)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">BKFL</tspan>
                <tspan dx="3.2">Exploratory Hole Backfill Details</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/BKFL</title>
        </g>
        <g transform="translate(0,64)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CDIA</tspan>
                <tspan dx="3.2">Casing Diameter by Depth</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/CDIA</title>
        </g>
        <g transform="translate(0,80)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CHIS</tspan>
                <tspan dx="3.2">Chiselling Details</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/CHIS</title>
        </g>
        <g transform="translate(0,96)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CORE</tspan>
                <tspan dx="3.2">Coring Information</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/CORE</title>
        </g>
        <g transform="translate(0,112)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">DCPG</tspan>
                <tspan dx="3.2">Dynamic Cone Penetrometer Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/DCPG</title>
        </g>
        <g transform="translate(0,144)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">DETL</tspan>
                <tspan dx="3.2">Stratum Detail Descriptions</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/DETL</title>
        </g>
        <g transform="translate(0,160)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">DISC</tspan>
                <tspan dx="3.2">Discontinuity Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/DISC</title>
        </g>
        <g transform="translate(0,176)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">DLOG</tspan>
                <tspan dx="3.2">Driller Geological Description</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/DLOG</title>
        </g>
        <g transform="translate(0,192)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">DOBS</tspan>
                <tspan dx="3.2">Drilling/Advancement Observations &amp; Parameters</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/DOBS</title>
        </g>
        <g transform="translate(0,208)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">DPRG</tspan>
                <tspan dx="3.2">Dynamic Probe Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/DPRG</title>
        </g>
        <g transform="translate(0,240)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">DREM</tspan>
                <tspan dx="3.2">Depth Related Remarks</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/DREM</title>
        </g>
        <g transform="translate(0,256)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">FGHG</tspan>
                <tspan dx="3.2">Field Geohydraulic Testing - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/FGHG</title>
        </g>
        <g transform="translate(0,320)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">FLSH</tspan>
                <tspan dx="3.2">Drilling Flush Details</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/FLSH</title>
        </g>
        <g transform="translate(0,336)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">FRAC</tspan>
                <tspan dx="3.2">Fracture Spacing</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/FRAC</title>
        </g>
        <g transform="translate(0,352)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">GEOL</tspan>
                <tspan dx="3.2">Field Geological Descriptions</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/GEOL</title>
        </g>
        <g transform="translate(0,368)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">HDIA</tspan>
                <tspan dx="3.2">Hole Diameter by Depth</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/HDIA</title>
        </g>
        <g transform="translate(0,384)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">HDPH</tspan>
                <tspan dx="3.2">Depth Related Exploratory Hole Information</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/HDPH</title>
        </g>
        <g transform="translate(0,400)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">HORN</tspan>
                <tspan dx="3.2">Exploratory Hole Orientation and Inclination</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/HORN</title>
        </g>
        <g transform="translate(0,416)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ICBR</tspan>
                <tspan dx="3.2">In Situ California Bearing Ratio Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/ICBR</title>
        </g>
        <g transform="translate(0,432)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">IDEN</tspan>
                <tspan dx="3.2">In Situ Density Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/IDEN</title>
        </g>
        <g transform="translate(0,448)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">IFID</tspan>
                <tspan dx="3.2">On Site Volatile Headspace Testing Using Flame Ionisation Detector</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/IFID</title>
        </g>
        <g transform="translate(0,464)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">IPEN</tspan>
                <tspan dx="3.2">In Situ Hand Penetrometer Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/IPEN</title>
        </g>
        <g transform="translate(0,480)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">IPID</tspan>
                <tspan dx="3.2">On Site Volatile Headspace Testing by Photo Ionisation Detector</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/IPID</title>
        </g>
        <g transform="translate(0,496)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">IPRG</tspan>
                <tspan dx="3.2">In Situ Permeability Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/IPRG</title>
        </g>
        <g transform="translate(0,528)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">IRDX</tspan>
                <tspan dx="3.2">In Situ Redox Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/IRDX</title>
        </g>
        <g transform="translate(0,544)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">IRES</tspan>
                <tspan dx="3.2">In Situ Resistivity Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/IRES</title>
        </g>
        <g transform="translate(0,560)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ISAG</tspan>
                <tspan dx="3.2">Soakaway Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/ISAG</title>
        </g>
        <g transform="translate(0,592)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ISPT</tspan>
                <tspan dx="3.2">Standard Penetration Test Results</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/ISPT</title>
        </g>
        <g transform="translate(0,608)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">IVAN</tspan>
                <tspan dx="3.2">In Situ Vane Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/IVAN</title>
        </g>
        <g transform="translate(0,624)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">MONG</tspan>
                <tspan dx="3.2">Monitoring Installations and Instruments</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/MONG</title>
        </g>
        <g transform="translate(0,656)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">PIPE</tspan>
                <tspan dx="3.2">Monitoring Installation Pipe Work</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/PIPE</title>
        </g>
        <g transform="translate(0,672)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">PLTG</tspan>
                <tspan dx="3.2">Plate Loading Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/PLTG</title>
        </g>
        <g transform="translate(0,704)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">PMTG</tspan>
                <tspan dx="3.2">Pressuremeter Test Results - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/PMTG</title>
        </g>
        <g transform="translate(0,752)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">PTIM</tspan>
                <tspan dx="3.2">Boring/Drilling Progress by Time</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/PTIM</title>
        </g>
        <g transform="translate(0,768)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">PUMG</tspan>
                <tspan dx="3.2">Pumping Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/PUMG</title>
        </g>
        <g transform="translate(0,800)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">SAMP</tspan>
                <tspan dx="3.2">Sample Information</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP</title>
        </g>
        <g transform="translate(0,2016)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">SCPG</tspan>
                <tspan dx="3.2">Static Cone Penetration Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SCPG</title>
        </g>
        <g transform="translate(0,2080)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">TREM</tspan>
                <tspan dx="3.2">Location Specific Time Related Remarks</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/TREM</title>
        </g>
        <g transform="translate(0,2096)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">WADD</tspan>
                <tspan dx="3.2">Water Added Records</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/WADD</title>
        </g>
        <g transform="translate(0,2112)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">WETH</tspan>
                <tspan dx="3.2">Weathering</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/WETH</title>
        </g>
        <g transform="translate(0,2128)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">WGPG</tspan>
                <tspan dx="3.2">Wireline Geophysics - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/WGPG</title>
        </g>
        <g transform="translate(0,2160)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">WINS</tspan>
                <tspan dx="3.2">Window or Windowless Sampling Run Details</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/WINS</title>
        </g>
        <g transform="translate(0,2176)">
            <circle cx="48" r="2" /><text dy="0.32em" x="54">
                <tspan font-weight="600" font-family="monospace" fill="inherit">WSTG</tspan>
                <tspan dx="3.2">Water Strike - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/WSTG</title>
        </g>
        <g transform="translate(0,128)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">DCPT</tspan>
                <tspan dx="3.2">Dynamic Cone Penetrometer Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/DCPG/DCPT</title>
        </g>
        <g transform="translate(0,224)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">DPRB</tspan>
                <tspan dx="3.2">Dynamic Probe Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/DPRG/DPRB</title>
        </g>
        <g transform="translate(0,272)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">FGHS</tspan>
                <tspan dx="3.2">Field Geohydraulic Testing - Test Results (per stage)</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/FGHG/FGHS</title>
        </g>
        <g transform="translate(0,288)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">FGHI</tspan>
                <tspan dx="3.2">Field Geohydraulic Testing - Instrumentation Details</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/FGHG/FGHI</title>
        </g>
        <g transform="translate(0,512)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">IPRT</tspan>
                <tspan dx="3.2">In Situ Permeability Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/IPRG/IPRT</title>
        </g>
        <g transform="translate(0,576)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ISAT</tspan>
                <tspan dx="3.2">Soakaway Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/ISAG/ISAT</title>
        </g>
        <g transform="translate(0,640)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">MOND</tspan>
                <tspan dx="3.2">Monitoring Readings</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/MONG/MOND</title>
        </g>
        <g transform="translate(0,688)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">PLTT</tspan>
                <tspan dx="3.2">Plate Loading Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/PLTG/PLTT</title>
        </g>
        <g transform="translate(0,720)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">PMTD</tspan>
                <tspan dx="3.2">Pressuremeter Test Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/PMTG/PMTD</title>
        </g>
        <g transform="translate(0,736)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">PMTL</tspan>
                <tspan dx="3.2">Pressuremeter Test Results - Individual Loops</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/PMTG/PMTL</title>
        </g>
        <g transform="translate(0,784)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">PUMT</tspan>
                <tspan dx="3.2">Pumping Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/PUMG/PUMT</title>
        </g>
        <g transform="translate(0,816)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">AAVT</tspan>
                <tspan dx="3.2">Aggregate Abrasion Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/AAVT</title>
        </g>
        <g transform="translate(0,832)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ACVT</tspan>
                <tspan dx="3.2">Aggregate Crushing Value Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/ACVT</title>
        </g>
        <g transform="translate(0,848)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">AELO</tspan>
                <tspan dx="3.2">Aggregate Elongation Index Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/AELO</title>
        </g>
        <g transform="translate(0,864)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">AFLK</tspan>
                <tspan dx="3.2">Aggregate Flakiness Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/AFLK</title>
        </g>
        <g transform="translate(0,880)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">AIVT</tspan>
                <tspan dx="3.2">Aggregate Impact Value Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/AIVT</title>
        </g>
        <g transform="translate(0,896)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ALOS</tspan>
                <tspan dx="3.2">Los Angeles Abrasion Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/ALOS</title>
        </g>
        <g transform="translate(0,912)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">APSV</tspan>
                <tspan dx="3.2">Aggregate Polished Stone Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/APSV</title>
        </g>
        <g transform="translate(0,928)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ARTW</tspan>
                <tspan dx="3.2">Aggregate Determination of the Resistance to Wear (micro-Deval)</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/ARTW</title>
        </g>
        <g transform="translate(0,944)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ASDI</tspan>
                <tspan dx="3.2">Slake Durability Index Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/ASDI</title>
        </g>
        <g transform="translate(0,960)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ASNS</tspan>
                <tspan dx="3.2">Aggregate Soundness Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/ASNS</title>
        </g>
        <g transform="translate(0,976)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">AWAD</tspan>
                <tspan dx="3.2">Aggregate Water Absorption Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/AWAD</title>
        </g>
        <g transform="translate(0,992)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CBRG</tspan>
                <tspan dx="3.2">California Bearing Ratio Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/CBRG</title>
        </g>
        <g transform="translate(0,1024)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CHOC</tspan>
                <tspan dx="3.2">Chain of Custody Information</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/CHOC</title>
        </g>
        <g transform="translate(0,1040)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CMPG</tspan>
                <tspan dx="3.2">Compaction Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/CMPG</title>
        </g>
        <g transform="translate(0,1072)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CONG</tspan>
                <tspan dx="3.2">Consolidation Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/CONG</title>
        </g>
        <g transform="translate(0,1104)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CTRG</tspan>
                <tspan dx="3.2">Cyclic Triaxial Test - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/CTRG</title>
        </g>
        <g transform="translate(0,1184)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ECTN</tspan>
                <tspan dx="3.2">Sample Container Details</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/ECTN</title>
        </g>
        <g transform="translate(0,1200)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ELRG</tspan>
                <tspan dx="3.2">Environmental Laboratory Reporting</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/ELRG</title>
        </g>
        <g transform="translate(0,1216)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ERES</tspan>
                <tspan dx="3.2">Environmental Contaminant Testing</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/ERES</title>
        </g>
        <g transform="translate(0,1232)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ESCG</tspan>
                <tspan dx="3.2">Effective Stress Consolidation Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/ESCG</title>
        </g>
        <g transform="translate(0,1264)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">FRST</tspan>
                <tspan dx="3.2">Frost Susceptibility Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/FRST</title>
        </g>
        <g transform="translate(0,1280)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">GCHM</tspan>
                <tspan dx="3.2">Geotechnical Chemistry Testing</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/GCHM</title>
        </g>
        <g transform="translate(0,1296)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">GRAG</tspan>
                <tspan dx="3.2">Particle Size Distribution Analysis - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/GRAG</title>
        </g>
        <g transform="translate(0,1328)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LDEN</tspan>
                <tspan dx="3.2">Density Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LDEN</title>
        </g>
        <g transform="translate(0,1344)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LDYN</tspan>
                <tspan dx="3.2">Dynamic Testing</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LDYN</title>
        </g>
        <g transform="translate(0,1360)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LFCN</tspan>
                <tspan dx="3.2">Laboratory Fall Cone Test</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LFCN</title>
        </g>
        <g transform="translate(0,1376)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LLIN</tspan>
                <tspan dx="3.2">Linear Shrinkage Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LLIN</title>
        </g>
        <g transform="translate(0,1392)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LLPL</tspan>
                <tspan dx="3.2">Liquid and Plastic Limit Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LLPL</title>
        </g>
        <g transform="translate(0,1408)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LNMC</tspan>
                <tspan dx="3.2">Water/moisture Content Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LNMC</title>
        </g>
        <g transform="translate(0,1424)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LPDN</tspan>
                <tspan dx="3.2">Particle Density Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LPDN</title>
        </g>
        <g transform="translate(0,1440)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LPEN</tspan>
                <tspan dx="3.2">Laboratory Hand Penetrometer Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LPEN</title>
        </g>
        <g transform="translate(0,1456)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LRES</tspan>
                <tspan dx="3.2">Laboratory Resistivity Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LRES</title>
        </g>
        <g transform="translate(0,1472)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LSLT</tspan>
                <tspan dx="3.2">Shrinkage Limit Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LSLT</title>
        </g>
        <g transform="translate(0,1488)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LSTG</tspan>
                <tspan dx="3.2">Initial Consumption of Lime Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LSTG</title>
        </g>
        <g transform="translate(0,1520)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LSWL</tspan>
                <tspan dx="3.2">Swelling Index Testing</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LSWL</title>
        </g>
        <g transform="translate(0,1536)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LTCH</tspan>
                <tspan dx="3.2">Laboratory Thermal Conductivity</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LTCH</title>
        </g>
        <g transform="translate(0,1552)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LUCT</tspan>
                <tspan dx="3.2">Laboratory Unconfined Compression Test</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LUCT</title>
        </g>
        <g transform="translate(0,1568)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LVAN</tspan>
                <tspan dx="3.2">Laboratory Vane Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LVAN</title>
        </g>
        <g transform="translate(0,1584)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">MCVG</tspan>
                <tspan dx="3.2">MCV Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/MCVG</title>
        </g>
        <g transform="translate(0,1616)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">PTST</tspan>
                <tspan dx="3.2">Laboratory Permeability Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/PTST</title>
        </g>
        <g transform="translate(0,1632)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RCAG</tspan>
                <tspan dx="3.2">Rock Abrasiveness Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RCAG</title>
        </g>
        <g transform="translate(0,1664)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RCCV</tspan>
                <tspan dx="3.2">Chalk Crushing Value Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RCCV</title>
        </g>
        <g transform="translate(0,1680)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RDEN</tspan>
                <tspan dx="3.2">Rock Porosity and Density Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RDEN</title>
        </g>
        <g transform="translate(0,1696)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RELD</tspan>
                <tspan dx="3.2">Relative Density Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RELD</title>
        </g>
        <g transform="translate(0,1712)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RESG</tspan>
                <tspan dx="3.2">Resonant Column Test – General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RESG</title>
        </g>
        <g transform="translate(0,1792)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RPLT</tspan>
                <tspan dx="3.2">Point Load Testing</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RPLT</title>
        </g>
        <g transform="translate(0,1808)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RSCH</tspan>
                <tspan dx="3.2">Schmidt Rebound Hardness Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RSCH</title>
        </g>
        <g transform="translate(0,1824)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RSHR</tspan>
                <tspan dx="3.2">Shore Scleroscope Hardness Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RSHR</title>
        </g>
        <g transform="translate(0,1840)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RTEN</tspan>
                <tspan dx="3.2">Tensile Strength Testing</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RTEN</title>
        </g>
        <g transform="translate(0,1856)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RUCS</tspan>
                <tspan dx="3.2">Rock Uniaxial Compressive Strength and Deformability Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RUCS</title>
        </g>
        <g transform="translate(0,1872)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RWCO</tspan>
                <tspan dx="3.2">Water Content of Rock Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RWCO</title>
        </g>
        <g transform="translate(0,1888)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">SHBG</tspan>
                <tspan dx="3.2">Shear Box Testing - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/SHBG</title>
        </g>
        <g transform="translate(0,1920)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">SUCT</tspan>
                <tspan dx="3.2">Suction Tests</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/SUCT</title>
        </g>
        <g transform="translate(0,1936)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">TNPC</tspan>
                <tspan dx="3.2">Ten Per Cent Fines</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/TNPC</title>
        </g>
        <g transform="translate(0,1952)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">TREG</tspan>
                <tspan dx="3.2">Triaxial Tests - Effective Stress - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/TREG</title>
        </g>
        <g transform="translate(0,1984)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">TRIG</tspan>
                <tspan dx="3.2">Triaxial Tests - Total Stress - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/TRIG</title>
        </g>
        <g transform="translate(0,2032)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">SCDG</tspan>
                <tspan dx="3.2">Static Cone Dissipation Tests - General</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SCPG/SCDG</title>
        </g>
        <g transform="translate(0,2064)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">SCPP</tspan>
                <tspan dx="3.2">Static Cone Penetration Tests - Derived Parameters</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SCPG/SCPP</title>
        </g>
        <g transform="translate(0,2144)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">WGPT</tspan>
                <tspan dx="3.2">Wireline Geophysics - Readings</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/WGPG/WGPT</title>
        </g>
        <g transform="translate(0,2192)">
            <circle cx="64" r="2" /><text dy="0.32em" x="70">
                <tspan font-weight="600" font-family="monospace" fill="inherit">WSTD</tspan>
                <tspan dx="3.2">Water Strike - Details</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/WSTG/WSTD</title>
        </g>
        <g transform="translate(0,304)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">FGHT</tspan>
                <tspan dx="3.2">Field Geohydraulic Testing - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/FGHG/FGHI/FGHT</title>
        </g>
        <g transform="translate(0,1008)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CBRT</tspan>
                <tspan dx="3.2">California Bearing Ratio Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/CBRG/CBRT</title>
        </g>
        <g transform="translate(0,1056)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CMPT</tspan>
                <tspan dx="3.2">Compaction Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/CMPG/CMPT</title>
        </g>
        <g transform="translate(0,1088)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CONS</tspan>
                <tspan dx="3.2">Consolidation Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/CONG/CONS</title>
        </g>
        <g transform="translate(0,1120)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CTRC</tspan>
                <tspan dx="3.2">Cyclic Triaxial Tests - Consolidation</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/CTRG/CTRC</title>
        </g>
        <g transform="translate(0,1168)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CTRS</tspan>
                <tspan dx="3.2">Cyclic Triaxial Test - Saturation</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/CTRG/CTRS</title>
        </g>
        <g transform="translate(0,1248)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">ESCT</tspan>
                <tspan dx="3.2">Effective Stress Consolidation Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/ESCG/ESCT</title>
        </g>
        <g transform="translate(0,1312)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">GRAT</tspan>
                <tspan dx="3.2">Particle Size Distribution Analysis - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/GRAG/GRAT</title>
        </g>
        <g transform="translate(0,1504)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">LSTT</tspan>
                <tspan dx="3.2">Initial Consumption of Lime Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/LSTG/LSTT</title>
        </g>
        <g transform="translate(0,1600)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">MCVT</tspan>
                <tspan dx="3.2">MCV Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/MCVG/MCVT</title>
        </g>
        <g transform="translate(0,1648)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RCAT</tspan>
                <tspan dx="3.2">Rock Abrasiveness Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RCAG/RCAT</title>
        </g>
        <g transform="translate(0,1728)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RESC</tspan>
                <tspan dx="3.2">Resonant Column Test - Consolidation</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RESG/RESC</title>
        </g>
        <g transform="translate(0,1744)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RESD</tspan>
                <tspan dx="3.2">Resonant Column Test – Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RESG/RESD</title>
        </g>
        <g transform="translate(0,1776)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RESS</tspan>
                <tspan dx="3.2">Resonant Column Test – Saturation</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RESG/RESS</title>
        </g>
        <g transform="translate(0,1904)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">SHBT</tspan>
                <tspan dx="3.2">Shear Box Testing - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/SHBG/SHBT</title>
        </g>
        <g transform="translate(0,1968)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">TRET</tspan>
                <tspan dx="3.2">Triaxial Tests - Effective Stress - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/TREG/TRET</title>
        </g>
        <g transform="translate(0,2000)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">TRIT</tspan>
                <tspan dx="3.2">Triaxial Tests - Total Stress - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/TRIG/TRIT</title>
        </g>
        <g transform="translate(0,2048)">
            <circle cx="80" r="2" /><text dy="0.32em" x="86">
                <tspan font-weight="600" font-family="monospace" fill="inherit">SCDT</tspan>
                <tspan dx="3.2">Static Cone Dissipation Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SCPG/SCDG/SCDT</title>
        </g>
        <g transform="translate(0,1136)">
            <circle cx="96" r="2" /><text dy="0.32em" x="102">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CTRP</tspan>
                <tspan dx="3.2">Cyclic Triaxial Test - Derived Parameters</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/CTRG/CTRC/CTRP</title>
        </g>
        <g transform="translate(0,1760)">
            <circle cx="96" r="2" /><text dy="0.32em" x="102">
                <tspan font-weight="600" font-family="monospace" fill="inherit">RESP</tspan>
                <tspan dx="3.2">Resonant Column Test - Derived Parameters</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/RESG/RESD/RESP</title>
        </g>
        <g transform="translate(0,1152)">
            <circle cx="112" r="2" /><text dy="0.32em" x="118">
                <tspan font-weight="600" font-family="monospace" fill="inherit">CTRD</tspan>
                <tspan dx="3.2">Cyclic Triaxial Tests - Data</tspan>
            </text>
            <title>AGS4 File/PROJ/LOCA/SAMP/CTRG/CTRC/CTRP/CTRD</title>
        </g>
    </g>
</svg>

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
