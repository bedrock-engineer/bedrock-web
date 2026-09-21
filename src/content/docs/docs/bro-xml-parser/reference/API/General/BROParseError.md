---
title: BROParseError
prev: false
next: false
editUrl: false
---

# Class: BROParseError

Defined in: [src/types/index.ts:215](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L215)

Parse error with context

## Extends

- `Error`

## Constructors

### Constructor

```ts
new BROParseError(message, details): BROParseError;
```

Defined in: [src/types/index.ts:219](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L219)

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
| <a id="code"></a> `code` | `readonly` | `string` | - | [src/types/index.ts:216](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L216) |
| <a id="details"></a> `details` | `readonly` | `Record`\<`string`, `unknown`\> | - | [src/types/index.ts:217](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/types/index.ts#L217) |
| <a id="cause"></a> `cause?` | `public` | `unknown` | `Error.cause` | node\_modules/typescript/lib/lib.es2022.error.d.ts:24 |
| <a id="name"></a> `name` | `public` | `string` | `Error.name` | node\_modules/typescript/lib/lib.es5.d.ts:1074 |
| <a id="message"></a> `message` | `public` | `string` | `Error.message` | node\_modules/typescript/lib/lib.es5.d.ts:1075 |
| <a id="stack"></a> `stack?` | `public` | `string` | `Error.stack` | node\_modules/typescript/lib/lib.es5.d.ts:1076 |
