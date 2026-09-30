---
title: BHRGTLayerBase
prev: false
next: false
editUrl: false
---

# Type Alias: BHRGTLayerBase

```ts
type BHRGTLayerBase = Omit<BHRGTLayer, "soil" | "rock">;
```

Defined in: [src/schemas/bore-types.ts:28](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/schemas/bore-types.ts#L28)

Fields common to every layer, regardless of soil/rock.
