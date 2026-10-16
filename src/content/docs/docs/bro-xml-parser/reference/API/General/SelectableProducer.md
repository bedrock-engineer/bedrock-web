---
title: SelectableProducer
prev: false
next: false
editUrl: false
---

# Type Alias: SelectableProducer\<P\>

```ts
type SelectableProducer<P> = P extends object ? ArraySel<I> : P extends object ? { [K in keyof F]-?: SelectableProducer<F[K]> } : P extends object ? Leaf<V> : never;
```

Defined in: [src/core/select.ts:48](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/select.ts#L48)

Mirror a producer as a navigable path tree. Array producers → [ArraySel](/docs/bro-xml-parser/reference/api/general/arraysel/);
object producers → descend by field; every leaf (`text`/`number`/`date`/
`boolean`/`code`/`measure`) and atomic `custom`/`columns` → a whole-value [Leaf](/docs/bro-xml-parser/reference/api/general/leaf/).

## Type Parameters

| Type Parameter |
| ------ |
| `P` |
