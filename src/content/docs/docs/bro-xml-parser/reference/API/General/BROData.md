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

Defined in: [src/types/index.ts:1813](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1813)

Union type for all BRO data types

Use the `meta.dataType` field to discriminate between types:
```typescript
const data = parser.parse(xmlText);
if (data.meta.dataType === 'CPT') {
  // data is CPTData
}
```
