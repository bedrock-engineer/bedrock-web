---
title: ProjectResult
prev: false
next: false
editUrl: false
---

# Type Alias: ProjectResult\<S\>

```ts
type ProjectResult<S> = S extends Leaf<infer V> ? V : S extends Record<string, unknown> ? { [K in keyof S]: ProjectResult<S[K]> } : never;
```

Defined in: [src/core/select.ts:57](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/select.ts#L57)

Resolve a returned selection tree to its parsed output type.

## Type Parameters

| Type Parameter |
| ------ |
| `S` |
