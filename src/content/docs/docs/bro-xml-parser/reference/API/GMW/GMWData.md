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

Defined in: [src/types/index.ts:251](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/types/index.ts#L251)

Complete GMW (groundwater monitoring well) data.

The registration object carries well-level metadata plus one or more
monitoring tubes. Inferred from `GMW_PRODUCER`; `meta` (parse
metadata) and the optional user-set `alias` are the only fields not produced
from the XML.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `dataType` | `"GMW"` | [src/types/index.ts:251](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/types/index.ts#L251) |
| `meta` | [`ParseMeta`](/docs/bro-xml-parser/reference/api/general/parsemeta/)\<`"GMW"`\> | [src/types/index.ts:251](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/types/index.ts#L251) |
| `alias?` | `string` | [src/types/index.ts:251](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/types/index.ts#L251) |
