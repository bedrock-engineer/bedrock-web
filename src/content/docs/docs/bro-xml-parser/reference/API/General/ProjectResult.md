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

Defined in: [src/core/select.ts:65](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/select.ts#L65)

Resolve a returned selection tree to its parsed output type.

## Type Parameters

| Type Parameter |
| ------ |
| `S` |
