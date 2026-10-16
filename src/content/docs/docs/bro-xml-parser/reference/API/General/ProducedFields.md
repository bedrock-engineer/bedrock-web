---
title: ProducedFields
prev: false
next: false
editUrl: false
---

# Type Alias: ProducedFields\<F\>

```ts
type ProducedFields<F> = Simplify<{ [K in Exclude<keyof F, OmitPresenceKeys<F>>]: FieldValue<F[K]> } & { [K in OmitPresenceKeys<F>]?: FieldValue<F[K]> }>;
```

Defined in: [src/core/producer.ts:207](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L207)

The output type of an object built from a fields map. A field whose producer
has `presence: "omit"` becomes an **optional** key (`key?:`); every other
field is a required key. Optional object fields are `T | null` (see
FieldValue). Under `exactOptionalPropertyTypes` this exactly mirrors
the runtime absence model.

## Type Parameters

| Type Parameter |
| ------ |
| `F` |
