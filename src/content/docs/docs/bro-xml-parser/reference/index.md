---
title: Overview
description: API reference for @bedrock-engineer/bro-xml-parser.
sidebar:
  order: 1
---

The pages under **API** are generated from the library's TypeScript source and
TSDoc comments. This page summarises the main entry points.

## BROParser

`BROParser` is the entry class. Construct it with an `XMLAdapter` for your
environment, then call one of the parse methods.

| Method                            | Returns     | Description                     |
| --------------------------------- | ----------- | ------------------------------- |
| `parse(xml)`                      | `BROData`   | Detect the type and parse       |
| `parseCPT(xml)`                   | `CPTData`   | Parse a CPT file                |
| `parseBHRGT(xml)`                 | `BHRGTData` | Parse a BHR-GT file             |
| `parseBHRG(xml)`                  | `BHRGData`  | Parse a BHR-G file              |
| `parseCustom(xml, schema, type?)` | `T`         | Parse with a [custom schema](/docs/bro-xml-parser/guides/custom-schemas/) |

## Namespaces

- `resolvers` holds the built-in field converters used in custom schemas.
- `presets` holds ready-made schemas for common extractions.

## Supported schemas

| Type   | Schema version |
| ------ | -------------- |
| CPT    | `dscpt/1.1`    |
| BHR-GT | `dsbhr-gt/2.1` |
| BHR-G  | `dsbhrg/3.1`   |
