---
title: BROData
prev: false
next: false
editUrl: false
---

# Type Alias: BROData

```ts
type BROData = 
  | CPTData
  | BHRGTData
  | BHRGData
  | GMWData
  | GLDData;
```

Defined in: [src/types/index.ts:179](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L179)

Union type for all BRO data types

Use the `meta.dataType` field to discriminate between types:
```typescript
const data = parser.parse(xmlText);
if (data.meta.dataType === 'CPT') {
  // data is CPTData
}
```
