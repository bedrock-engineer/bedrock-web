---
title: date
prev: false
next: false
editUrl: false
---

# Function: date()

```ts
function date<P>(at?, opts?): ScalarProducer<string | null, P>;
```

Defined in: [src/core/producer.ts:255](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L255)

Precision-preserving ISO date/dateTime string (`string | null`).

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

`ScalarProducer`\<`string` \| `null`, `P`\>
