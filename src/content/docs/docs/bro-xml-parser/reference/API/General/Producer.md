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
  | ObjectProducer<T, P>
  | ArrayProducer<T, P>
  | CustomProducer<T, P>
| OneOfProducer<T, P>;
```

Defined in: [src/core/producer.ts:166](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L166)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `P` *extends* `Presence` | `"optional"` |
