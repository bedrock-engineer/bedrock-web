---
title: ParseMeta
prev: false
next: false
editUrl: false
---

# Interface: ParseMeta

Defined in: [src/types/index.ts:16](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L16)

Metadata about the parsed document

Contains schema version information and any warnings
encountered during parsing.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="schemaversion"></a> `schemaVersion` | `string` | Schema version detected in the document (e.g., "1.1", "2.0") | [src/types/index.ts:20](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L20) |
| <a id="schemanamespace"></a> `schemaNamespace` | `string` | Full namespace URI of the schema | [src/types/index.ts:25](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L25) |
| <a id="datatype"></a> `dataType` | `"CPT"` \| `"BHR-GT"` \| `"BHR-G"` | Data type detected (CPT, BHR-GT, BHR-G) | [src/types/index.ts:30](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L30) |
| <a id="warnings"></a> `warnings` | `string`[] | Warnings encountered during parsing Non-fatal issues like: - Parsing with older/newer minor version than supported - Optional fields with unexpected formats | [src/types/index.ts:39](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L39) |
