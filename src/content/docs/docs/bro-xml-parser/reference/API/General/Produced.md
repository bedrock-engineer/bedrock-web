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

Defined in: [src/core/producer.ts:181](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L181)

Recover a producer's output type. Recurses in parallel with the runtime.

## Type Parameters

| Type Parameter |
| ------ |
| `P` |
