---
title: BROParseError
prev: false
next: false
editUrl: false
---

# Class: BROParseError

Defined in: [src/types/index.ts:1823](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1823)

Parse error with context

## Extends

- `Error`

## Constructors

### Constructor

```ts
new BROParseError(message, details): BROParseError;
```

Defined in: [src/types/index.ts:1827](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1827)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |
| `details` | \{ \[`key`: `string`\]: `unknown`; `code`: `string`; \} |
| `details.code` | `string` |

#### Returns

`BROParseError`

#### Overrides

```ts
Error.constructor
```

## Properties

| Property | Modifier | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="code"></a> `code` | `readonly` | `string` | - | [src/types/index.ts:1824](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1824) |
| <a id="details"></a> `details` | `readonly` | `Record`\<`string`, `unknown`\> | - | [src/types/index.ts:1825](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1825) |
| <a id="cause"></a> `cause?` | `public` | `unknown` | `Error.cause` | node\_modules/typescript/lib/lib.es2022.error.d.ts:24 |
| <a id="name"></a> `name` | `public` | `string` | `Error.name` | node\_modules/typescript/lib/lib.es5.d.ts:1074 |
| <a id="message"></a> `message` | `public` | `string` | `Error.message` | node\_modules/typescript/lib/lib.es5.d.ts:1075 |
| <a id="stack"></a> `stack?` | `public` | `string` | `Error.stack` | node\_modules/typescript/lib/lib.es5.d.ts:1076 |
