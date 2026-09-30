---
title: NodeLens
prev: false
next: false
editUrl: false
---

# Interface: NodeLens

Defined in: [src/core/producer.ts:65](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L65)

The narrow, relative-only surface a `CustomProducer` receives.

A custom producer never sees the raw [XMLAdapter](/docs/bro-xml-parser/reference/api/general/xmladapter/) or escapes its subtree —
it reads text and child nodes relative to the node it was mounted on.

## Methods

### name()

```ts
name(): string | null;
```

Defined in: [src/core/producer.ts:67](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L67)

Local (namespace-stripped) name of this lens' own node (`null` if none).

#### Returns

`string` \| `null`

***

### text()

```ts
text(): string | null;
```

Defined in: [src/core/producer.ts:69](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L69)

Trimmed text content of this lens' own node (`null` if empty).

#### Returns

`string` \| `null`

***

### textAt()

```ts
textAt(xpath): string | null;
```

Defined in: [src/core/producer.ts:71](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L71)

Trimmed text at a relative XPath (`null` if the node is absent/empty).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `xpath` | `string` |

#### Returns

`string` \| `null`

***

### attr()

```ts
attr(xpath): string | null;
```

Defined in: [src/core/producer.ts:73](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L73)

Value of an attribute reached by a relative XPath ending in `/@name`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `xpath` | `string` |

#### Returns

`string` \| `null`

***

### all()

```ts
all(xpath): NodeLens[];
```

Defined in: [src/core/producer.ts:75](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L75)

A lens per node matching a relative XPath.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `xpath` | `string` |

#### Returns

`NodeLens`[]
