---
title: measure
prev: false
next: false
editUrl: false
---

# Function: measure()

```ts
function measure<P>(at?, opts?): MeasureProducer<Measure | null, P>;
```

Defined in: [src/core/producer.ts:320](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L320)

A BRO measured value (`{ value, uom } | null`). Reads the element's text and
its `uom` attribute; absent/sentinel text or a missing unit → `null`. A
first-class leaf, so presence (`optional`/`required`/`omit`) and array-item
handling apply as they do to [code](/docs/bro-xml-parser/reference/api/functions/producerscode/).

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

`MeasureProducer`\<[`Measure`](/docs/bro-xml-parser/reference/api/general/measure/) \| `null`, `P`\>
