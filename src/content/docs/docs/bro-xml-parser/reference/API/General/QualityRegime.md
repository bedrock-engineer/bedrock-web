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

Defined in: [src/types/index.ts:75](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L75)

BRO quality regime

IMBRO: Strict regime for new data (all mandatory fields required)
IMBRO/A: Relaxed regime for historical/legacy data (allows missing fields)
