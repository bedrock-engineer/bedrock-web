---
title: SelectableProducer
prev: false
next: false
editUrl: false
---

# Type Alias: SelectableProducer\<P\>

```ts
type SelectableProducer<P> = P extends object ? ArraySel<I> : P extends object ? { [K in keyof F]-?: SelectableProducer<F[K]> } : P extends object ? { [K in keyof (B & BranchFields<Br>)]-?: SelectableProducer<(B & BranchFields<Br>)[K]> } : P extends object ? Leaf<V> : never;
```

Defined in: [src/core/select.ts:54](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/select.ts#L54)

Mirror a producer as a navigable path tree. Array producers → [ArraySel](/docs/bro-xml-parser/reference/api/general/arraysel/);
object producers → descend by field; `oneOf` → descend the merged base + branch
fields (selecting one flattens the union); every leaf (`text`/`number`/`date`/
`boolean`/`code`) and atomic `custom`/`columns` → a whole-value [Leaf](/docs/bro-xml-parser/reference/api/general/leaf/).

## Type Parameters

| Type Parameter |
| ------ |
| `P` |
