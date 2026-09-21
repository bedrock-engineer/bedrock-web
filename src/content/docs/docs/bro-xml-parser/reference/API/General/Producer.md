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
  | ObjectProducer<T, P>
  | ArrayProducer<T, P>
  | CustomProducer<T, P>
| OneOfProducer<T, P>;
```

Defined in: [src/core/producer.ts:133](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L133)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `P` *extends* `Presence` | `"optional"` |
