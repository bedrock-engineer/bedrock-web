---
title: boolean
prev: false
next: false
editUrl: false
---

# Function: boolean()

```ts
function boolean<P>(at?, opts?): ScalarProducer<boolean | null, P>;
```

Defined in: [src/core/producer.ts:277](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L277)

Boolean (`boolean | null`), understanding BRO's `ja`/`nee`.

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

`ScalarProducer`\<`boolean` \| `null`, `P`\>
