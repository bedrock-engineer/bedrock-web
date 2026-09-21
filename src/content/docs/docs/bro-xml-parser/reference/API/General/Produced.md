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

Defined in: [src/core/producer.ts:144](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L144)

Recover a producer's output type. Recurses in parallel with the runtime.

## Type Parameters

| Type Parameter |
| ------ |
| `P` |
