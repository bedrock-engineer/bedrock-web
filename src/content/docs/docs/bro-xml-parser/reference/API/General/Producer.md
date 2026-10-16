---
title: Producer
prev: false
next: false
editUrl: false
---

# Type Alias: Producer\<T, P\>

```ts
type Producer<T, P> = 
  | ScalarProducer<T, P>
  | CodeProducer<T, P>
  | MeasureProducer<T, P>
  | ObjectProducer<T, P>
  | ArrayProducer<T, P>
| CustomProducer<T, P>;
```

Defined in: [src/core/producer.ts:165](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L165)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `P` *extends* `Presence` | `"optional"` |
