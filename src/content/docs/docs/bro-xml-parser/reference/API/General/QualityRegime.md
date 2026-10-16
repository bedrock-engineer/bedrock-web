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

Defined in: [src/types/index.ts:77](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/types/index.ts#L77)

BRO quality regime

IMBRO: Strict regime for new data (all mandatory fields required)
IMBRO/A: Relaxed regime for historical/legacy data (allows missing fields)
