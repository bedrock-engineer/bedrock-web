---
title: integer
prev: false
next: false
editUrl: false
---

# Function: integer()

```ts
function integer<P>(at?, opts?): ScalarProducer<number | null, P>;
```

Defined in: [src/core/producer.ts:269](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L269)

Integer (`number | null`).

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
