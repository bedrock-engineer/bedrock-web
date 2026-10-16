---
title: scalar
prev: false
next: false
editUrl: false
---

# Function: scalar()

```ts
function scalar<T, P>(opts): ScalarProducer<T, P>;
```

Defined in: [src/core/producer.ts:223](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L223)

A leaf producer with an explicit decoder.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `P` *extends* `Presence` | `"optional"` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | `ScalarOpts`\<`T`, `P`\> |

## Returns

`ScalarProducer`\<`T`, `P`\>
