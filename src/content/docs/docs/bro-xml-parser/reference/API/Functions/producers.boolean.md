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

Defined in: [src/core/producer.ts:279](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L279)

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
