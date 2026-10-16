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

Defined in: [src/types/index.ts:169](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/types/index.ts#L169)

Complete Bore data (metadata + layers).

Represents BHR-GT-BMB (Boormonsterbeschrijving — visual/textural description);
laboratory analysis (BHR-GT-BMA) is the optional `analysis` field.

Inferred from `BORE_PRODUCER`; `meta` (parse metadata) and the optional
user-set `alias` are the only fields not produced from the XML.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `dataType` | `"BHR-GT"` | [src/types/index.ts:169](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/types/index.ts#L169) |
| `meta` | [`ParseMeta`](/docs/bro-xml-parser/reference/api/general/parsemeta/)\<`"BHR-GT"`\> | [src/types/index.ts:169](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/types/index.ts#L169) |
| `alias?` | `string` | [src/types/index.ts:169](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/types/index.ts#L169) |
