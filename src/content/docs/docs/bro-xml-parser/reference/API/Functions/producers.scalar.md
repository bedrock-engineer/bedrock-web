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

Defined in: [src/core/producer.ts:175](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L175)

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
