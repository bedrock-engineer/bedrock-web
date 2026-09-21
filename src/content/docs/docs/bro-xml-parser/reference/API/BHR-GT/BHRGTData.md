---
title: BHRGTData
prev: false
next: false
editUrl: false
---

# Type Alias: BHRGTData

```ts
type BHRGTData = object & Produced<typeof BORE_PRODUCER>;
```

Defined in: [src/types/index.ts:158](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L158)

Complete Bore data (metadata + layers).

Represents BHR-GT-BMB (Boormonsterbeschrijving — visual/textural description);
laboratory analysis (BHR-GT-BMA) is the optional `analysis` field.

Inferred from `BORE_PRODUCER`; `meta` (parse metadata) and the optional
user-set `alias` are the only fields not produced from the XML.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `meta` | [`ParseMeta`](/docs/bro-xml-parser/reference/api/general/parsemeta/) | [src/types/index.ts:158](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L158) |
| `alias?` | `string` | [src/types/index.ts:158](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L158) |
