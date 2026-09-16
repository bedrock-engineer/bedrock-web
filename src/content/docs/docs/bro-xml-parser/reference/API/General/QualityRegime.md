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

Defined in: [src/types/index.ts:95](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L95)

BRO quality regime

IMBRO: Strict regime for new data (all mandatory fields required)
IMBRO/A: Relaxed regime for historical/legacy data (allows missing fields)
