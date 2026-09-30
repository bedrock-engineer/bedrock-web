---
title: QualityRegime
prev: false
next: false
editUrl: false
---

# Type Alias: QualityRegime

```ts
type QualityRegime = "IMBRO" | "IMBRO/A";
```

Defined in: [src/types/index.ts:77](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L77)

BRO quality regime

IMBRO: Strict regime for new data (all mandatory fields required)
IMBRO/A: Relaxed regime for historical/legacy data (allows missing fields)
