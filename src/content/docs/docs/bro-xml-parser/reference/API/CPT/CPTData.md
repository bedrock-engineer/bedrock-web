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

Defined in: [src/types/index.ts:149](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L149)

Complete CPT data (metadata + measurements).

Inferred from `CPT_PRODUCER`; `meta` (parse metadata) and the optional
user-set `alias` are the only fields not produced from the XML.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `dataType` | `"CPT"` | [src/types/index.ts:149](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L149) |
| `meta` | [`ParseMeta`](/docs/bro-xml-parser/reference/api/general/parsemeta/)\<`"CPT"`\> | [src/types/index.ts:149](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L149) |
| `alias?` | `string` | [src/types/index.ts:149](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L149) |
