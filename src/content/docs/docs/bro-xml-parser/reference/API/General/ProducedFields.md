---
title: ProducedFields
prev: false
next: false
editUrl: false
---

# Type Alias: ProducedFields\<F\>

```ts
type ProducedFields<F> = Simplify<{ [K in Exclude<keyof F, OmitPresenceKeys<F>>]: Produced<F[K]> } & { [K in OmitPresenceKeys<F>]?: Produced<F[K]> }>;
```

Defined in: [src/core/producer.ts:157](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L157)

The output type of an object built from a fields map. A field whose producer
has `presence: "omit"` becomes an **optional** key (`key?:`); every other
field is a required key. Under `exactOptionalPropertyTypes` this exactly
mirrors the runtime absence model.

## Type Parameters

| Type Parameter |
| ------ |
| `F` |
