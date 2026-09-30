---
title: number
prev: false
next: false
editUrl: false
---

# Function: number()

```ts
function number<P>(at?, opts?): ScalarProducer<number | null, P>;
```

Defined in: [src/core/producer.ts:261](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L261)

Decimal number (`number | null`).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `P` *extends* `Presence` | `"optional"` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `at?` | `string` |
| `opts?` | `LeafOpts`\<`P`\> |

## Returns

`ScalarProducer`\<`number` \| `null`, `P`\>
