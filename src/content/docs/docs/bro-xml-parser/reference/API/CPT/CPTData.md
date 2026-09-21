---
title: CPTData
prev: false
next: false
editUrl: false
---

# Type Alias: CPTData

```ts
type CPTData = object & Produced<typeof CPT_PRODUCER>;
```

Defined in: [src/types/index.ts:147](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L147)

Complete CPT data (metadata + measurements).

Inferred from `CPT_PRODUCER`; `meta` (parse metadata) and the optional
user-set `alias` are the only fields not produced from the XML.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `meta` | [`ParseMeta`](/docs/bro-xml-parser/reference/api/general/parsemeta/) | [src/types/index.ts:147](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L147) |
| `alias?` | `string` | [src/types/index.ts:147](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L147) |
