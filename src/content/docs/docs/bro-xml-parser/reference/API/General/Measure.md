---
title: Measure
prev: false
next: false
editUrl: false
---

# Interface: Measure

Defined in: [src/core/producer.ts:52](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L52)

A BRO measured value: the numeric `value` plus the `uom` unit of measure that
the XML carries as a `uom` attribute (e.g. `m`, `kPa`, `g/cm3`).

First-class data, so the unit travels with the number instead of being
silently dropped. An absent or missing-sentinel measure element parses to
`null`; a present one is always a full `{ value, uom }`.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="value"></a> `value` | `number` | [src/core/producer.ts:53](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L53) |
| <a id="uom"></a> `uom` | `string` | [src/core/producer.ts:54](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L54) |
