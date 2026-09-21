---
title: qualityClass
prev: false
next: false
editUrl: false
---

# Function: qualityClass()

```ts
function qualityClass<P>(at?, opts?): ScalarProducer<number | null, P>;
```

Defined in: [src/core/producer.ts:234](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L234)

BRO quality class (`number | null`), understanding `"klasse2"` and `"2"`.

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
