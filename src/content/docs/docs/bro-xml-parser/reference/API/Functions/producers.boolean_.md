---
title: boolean_
prev: false
next: false
editUrl: false
---

# Function: boolean\_()

```ts
function boolean_<P>(at?, opts?): ScalarProducer<boolean | null, P>;
```

Defined in: [src/core/producer.ts:226](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L226)

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
