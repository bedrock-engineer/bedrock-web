---
title: BHRGTLayer
prev: false
next: false
editUrl: false
---

# Type Alias: BHRGTLayer

```ts
type BHRGTLayer = 
  | BHRGTSoilLayer
  | BHRGTRockLayer;
```

Defined in: [src/types/index.ts:567](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L567)

A BHR-GT described layer: either soil or rock.

Narrow on the `material` discriminant:
```ts
if (layer.material === "rock") layer.rock.rockType;
else layer.geotechnicalSoilName;
```
