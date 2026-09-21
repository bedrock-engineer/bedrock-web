---
title: ParseMeta
prev: false
next: false
editUrl: false
---

# Interface: ParseMeta

Defined in: [src/types/index.ts:26](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L26)

Metadata about the parsed document

Contains schema version information and any warnings
encountered during parsing.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="schemaversion"></a> `schemaVersion` | `string` | Schema version detected in the document (e.g., "1.1", "2.0") | [src/types/index.ts:30](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L30) |
| <a id="schemanamespace"></a> `schemaNamespace` | `string` | Full namespace URI of the schema | [src/types/index.ts:35](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L35) |
| <a id="datatype"></a> `dataType` | `"CPT"` \| `"BHR-GT"` \| `"BHR-G"` \| `"GMW"` \| `"GLD"` | Data type detected (CPT, BHR-GT, BHR-G, GMW, GLD) | [src/types/index.ts:40](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L40) |
| <a id="warnings"></a> `warnings` | `string`[] | Warnings encountered during parsing Non-fatal issues like: - Parsing with older/newer minor version than supported - Optional fields with unexpected formats | [src/types/index.ts:49](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L49) |
