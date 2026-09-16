---
title: parseBoolean
prev: false
next: false
editUrl: false
---

# Function: parseBoolean()

```ts
function parseBoolean(value): boolean | null;
```

Defined in: [src/resolvers/type-resolvers.ts:48](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/resolvers/type-resolvers.ts#L48)

Public resolver functions for custom schema definitions

These functions can be used in custom schemas to transform
XML values into appropriate JavaScript types.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` \| `null` \| `undefined` |

## Returns

`boolean` \| `null`

## Example

```typescript
import { BROParser, resolvers } from '@bedrock-engineer/bro-xml';

const mySchema = {
  depth: {
    xpath: './/cptcommon:finalDepth',
    resolver: resolvers.parseFloat
  },
  date: {
    xpath: './dscpt:researchReportDate',
    resolver: resolvers.parseDate
  },
  completed: {
    xpath: './dsbhrgt:boring/bhrgtcom:boreholeCompleted',
    resolver: resolvers.parseBoolean
  }
};
```
