---
title: BROData
prev: false
next: false
editUrl: false
---

# Type Alias: BROData

```ts
type BROData = DataByType[BROFileType];
```

Defined in: [src/types/index.ts:223](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/types/index.ts#L223)

Union type for all BRO data types, derived from DataByType.

Discriminated on the top-level `dataType` field:
```typescript
const data = parser.parse(xmlText);
if (data.dataType === 'CPT') {
  // data is narrowed to CPTData
}
```
