---
title: parseInt
prev: false
next: false
editUrl: false
---

# Function: parseInt()

```ts
function parseInt(value): number | null;
```

Defined in: [src/resolvers/type-resolvers.ts:42](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/resolvers/type-resolvers.ts#L42)

Public resolver functions for custom schema definitions

These functions can be used in custom schemas to transform
XML values into appropriate JavaScript types.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` \| `null` \| `undefined` |

## Returns

`number` \| `null`

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
