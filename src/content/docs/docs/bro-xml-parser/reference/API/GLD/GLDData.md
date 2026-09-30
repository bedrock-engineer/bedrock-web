---
title: GLDData
prev: false
next: false
editUrl: false
---

# Type Alias: GLDData

```ts
type GLDData = object & Produced<typeof GLD_PRODUCER>;
```

Defined in: [src/types/index.ts:235](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L235)

Complete GLD (groundwater level research) data.

Inferred from `GLD_PRODUCER`; `meta` (parse metadata) and the optional
user-set `alias` are the only fields not produced from the XML.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `dataType` | `"GLD"` | [src/types/index.ts:235](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L235) |
| `meta` | [`ParseMeta`](/docs/bro-xml-parser/reference/api/general/parsemeta/)\<`"GLD"`\> | [src/types/index.ts:235](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L235) |
| `alias?` | `string` | [src/types/index.ts:235](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L235) |
