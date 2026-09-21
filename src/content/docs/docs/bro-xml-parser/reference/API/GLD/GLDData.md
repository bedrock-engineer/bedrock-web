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

Defined in: [src/types/index.ts:196](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L196)

Complete GLD (groundwater level research) data.

Inferred from `GLD_PRODUCER`; `meta` (parse metadata) and the optional
user-set `alias` are the only fields not produced from the XML.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `meta` | [`ParseMeta`](/docs/bro-xml-parser/reference/api/general/parsemeta/) | [src/types/index.ts:196](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L196) |
| `alias?` | `string` | [src/types/index.ts:196](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L196) |
