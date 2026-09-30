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

Defined in: [src/core/producer.ts:226](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L226)

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
