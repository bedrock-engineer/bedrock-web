---
title: ParseMeta
prev: false
next: false
editUrl: false
---

# Interface: ParseMeta\<T\>

Defined in: [src/types/index.ts:26](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L26)

Metadata about the parsed document

Contains schema version information and any warnings
encountered during parsing.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* [`BROFileType`](/docs/bro-xml-parser/reference/api/general/brofiletype/) | [`BROFileType`](/docs/bro-xml-parser/reference/api/general/brofiletype/) |

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="schemaversion"></a> `schemaVersion` | `string` | Schema version detected in the document (e.g., "1.1", "2.0") | [src/types/index.ts:30](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L30) |
| <a id="schemanamespace"></a> `schemaNamespace` | `string` | Full namespace URI of the schema | [src/types/index.ts:35](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L35) |
| <a id="datatype"></a> `dataType` | `T` | Data type detected. Fixed to its own literal per `*Data` type (e.g. `CPTData` → `"CPT"`). To narrow a [BROData](/docs/bro-xml-parser/reference/api/general/brodata/), switch on the top-level `data.dataType` (TypeScript does not narrow on a nested discriminant). | [src/types/index.ts:42](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L42) |
| <a id="warnings"></a> `warnings` | `string`[] | Warnings encountered during parsing Non-fatal issues like: - Parsing with older/newer minor version than supported - Optional fields with unexpected formats | [src/types/index.ts:51](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L51) |
