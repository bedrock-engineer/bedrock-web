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

Defined in: [src/core/producer.ts:208](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L208)

The output type of an object built from a fields map. A field whose producer
has `presence: "omit"` becomes an **optional** key (`key?:`); every other
field is a required key. Optional object/oneOf fields are `T | null` (see
FieldValue). Under `exactOptionalPropertyTypes` this exactly mirrors
the runtime absence model.

## Type Parameters

| Type Parameter |
| ------ |
| `F` |
