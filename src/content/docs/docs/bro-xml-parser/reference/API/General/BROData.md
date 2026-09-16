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
  | BHRGData;
```

Defined in: [src/types/index.ts:1354](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1354)

Union type for all BRO data types

Use the `meta.dataType` field to discriminate between types:
```typescript
const data = parser.parse(xmlText);
if (data.meta.dataType === 'CPT') {
  // data is CPTData
}
```
