---
title: GMWData
prev: false
next: false
editUrl: false
---

# Type Alias: GMWData

```ts
type GMWData = object & Produced<typeof GMW_PRODUCER>;
```

Defined in: [src/types/index.ts:210](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L210)

Complete GMW (groundwater monitoring well) data.

The registration object carries well-level metadata plus one or more
monitoring tubes. Inferred from `GMW_PRODUCER`; `meta` (parse
metadata) and the optional user-set `alias` are the only fields not produced
from the XML.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `meta` | [`ParseMeta`](/docs/bro-xml-parser/reference/api/general/parsemeta/) | [src/types/index.ts:210](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L210) |
| `alias?` | `string` | [src/types/index.ts:210](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L210) |
