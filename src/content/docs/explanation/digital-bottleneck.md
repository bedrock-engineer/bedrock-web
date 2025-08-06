---
title: The digital bottleneck in geotechnical engineering
description: Why most geotechnical data isn't truly digital, and how this limits automation, analysis, and machine learning.
sidebar:
  order: 1
---

If you've ever worked with Ground Investigation (GI) data, you've probably encountered it in Excel spreadsheets, PDF reports, or specialized file formats like [AGS](https://duckduckgo.com/?q=ags+file+format&ia=web) or [GEF](https://publicwiki.deltares.nl/spaces/STREAM/pages/102204333/GEF-CPT).
These formats are not easily accessible for modern (geospatial) analysis and visualization workflows.
Bedrock lets you transform this GI data into structured objects in Python.
This enables you to analyze it, and export it to geospatial databases or other geospatial formats, which enables integration of GI data with other software and workflows used in the AEC industry.

<!-- While these formats work for sharing data, they often make it frustrating to actually analyze and combine information from multiple sources.
You're not alone, it might be the industry's biggest bottleneck. -->

## The pseudodigital problem

Geoscientist/software developer [Matt Hall](https://github.com/kwinkunks) describes a distinction: most data that looks digital is actually "[pseudodigital](https://agilescientific.com/blog/2019/7/19/is-your-data-digital-or-just-pseudodigital)", it exists as computer files but isn't structured enough for modern analysis. This captures the sorry state of a lot of geotechnical data today.

Consider these common formats in geotechnical engineering:

**Scanned documents**: PDF borehole logs, photographed field sheets, and laboratory certificates might be stored digitally, but to a computer, they're just pixels. The valuable data is trapped inside images.

**Basic digital files**: Excel spreadsheets with inconsistent column names, AutoCAD drawings of borehole locations with ambiguous labels, and CSV files with test data. While created on computers, they lack the structure needed for automated analysis.

**Legacy formats**: Even industry-standard formats like AGS files often contain minimal metadata, inconsistent geological descriptions, and lack of spatial referencing, making them difficult to view, combine across projects, or integrate with modern tools.

## The bottleneck effect

This pseudodigital state creates a bottleneck. GI Data remains trapped. Engineers spend their time manually transferring data between formats, introducing errors, and consuming time that could be spent on analysis and engineering judgment.

## What truly digital looks like

Truly digital geotechnical data is:

- **Structured**: Hierarchical relationships between projects, locations, samples, and tests preserved
- **Spatial**: Coordinates linked to proper reference systems and vertical datums
- **Machine-readable**: Stored in formats like GeoPackage or GeoParquet that analysis tools can directly consume

## Removing the bottleneck

The transition from pseudodigital to structured 3D geospatial data unlocks:

- **Spatial analysis**: Direct integration with GIS tools for mapping and spatial queries
- **Automated workflows**: Scripts can process, validate, and visualize data without manual intervention
- **Machine learning**: Clean, structured datasets ready for predictive modeling
- **Real-time integration**: Connection with monitoring systems and digital twins

The bottleneck isn't computational power or analysis techniques, it's data structure. Structured geotechnical data enables automation, machine learning, and integrated workflows that aren't feasible with traditional formats.

Organizations that successfully move beyond pseudodigital formats gain significant competitive advantages: faster project delivery, better risk management, and the ability to offer clients richer analysis and insights that were previously impossible with traditional data formats.
