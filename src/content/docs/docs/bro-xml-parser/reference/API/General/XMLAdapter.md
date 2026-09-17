---
title: XMLAdapter
prev: false
next: false
editUrl: false
---

# Class: XMLAdapter

Defined in: [src/adapters/browser-adapter.ts:13](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/adapters/browser-adapter.ts#L13)

## Implements

- `XMLAdapter`

## Constructors

### Constructor

```ts
new XMLAdapter(): BrowserXMLAdapter;
```

Defined in: [src/adapters/browser-adapter.ts:16](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/adapters/browser-adapter.ts#L16)

#### Returns

`BrowserXMLAdapter`

## Methods

### parseXML()

```ts
parseXML(xmlText): Document;
```

Defined in: [src/adapters/browser-adapter.ts:20](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/adapters/browser-adapter.ts#L20)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `xmlText` | `string` |

#### Returns

`Document`

#### Implementation of

```ts
XMLAdapter.parseXML
```

***

### evaluateXPath()

```ts
evaluateXPath(
   doc, 
   query, 
   namespaceResolver
): Node | null;
```

Defined in: [src/adapters/browser-adapter.ts:31](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/adapters/browser-adapter.ts#L31)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `doc` | `Document` \| `Node` |
| `query` | `string` |
| `namespaceResolver` | (`prefix`) => `string` \| `null` |

#### Returns

`Node` \| `null`

#### Implementation of

```ts
XMLAdapter.evaluateXPath
```

***

### evaluateXPathAll()

```ts
evaluateXPathAll(
   doc, 
   query, 
   namespaceResolver
): Node[];
```

Defined in: [src/adapters/browser-adapter.ts:76](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/adapters/browser-adapter.ts#L76)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `doc` | `Document` \| `Node` |
| `query` | `string` |
| `namespaceResolver` | (`prefix`) => `string` \| `null` |

#### Returns

`Node`[]

#### Implementation of

```ts
XMLAdapter.evaluateXPathAll
```
