---
title: Produced
prev: false
next: false
editUrl: false
---

# Type Alias: Produced\<P\>

```ts
type Produced<P> = P extends object ? T : never;
```

Defined in: [src/core/producer.ts:180](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L180)

Recover a producer's output type. Recurses in parallel with the runtime.

## Type Parameters

| Type Parameter |
| ------ |
| `P` |
