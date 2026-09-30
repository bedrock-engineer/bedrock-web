---
title: BHRGData
prev: false
next: false
editUrl: false
---

# Type Alias: BHRGData

```ts
type BHRGData = object & Produced<typeof BHRG_PRODUCER>;
```

Defined in: [src/types/index.ts:188](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L188)

Complete BHR-G (Geological Borehole) data (metadata + layers).

Inferred from `BHRG_PRODUCER`; `meta` (parse metadata) and the optional
user-set `alias` are the only fields not produced from the XML.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `dataType` | `"BHR-G"` | [src/types/index.ts:188](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L188) |
| `meta` | [`ParseMeta`](/docs/bro-xml-parser/reference/api/general/parsemeta/)\<`"BHR-G"`\> | [src/types/index.ts:188](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L188) |
| `alias?` | `string` | [src/types/index.ts:188](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L188) |
