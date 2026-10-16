---
title: getSoilColor
prev: false
next: false
editUrl: false
---

# Function: getSoilColor()

## Call Signature

```ts
function getSoilColor(colour): string | null;
```

Defined in: [src/colors.ts:110](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/colors.ts#L110)

Get the hex color for a BRO soil colour code.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `colour` | [`Coded`](/docs/bro-xml-parser/reference/api/general/coded/) \| `null` \| `undefined` | A coded colour value (e.g. `layer.colour`), or `null`/`undefined` |

### Returns

`string` \| `null`

Hex color string, or `null` if the code is absent or not recognised

### Example

```typescript
getSoilColor(layer.colour);                       // '#b79a77'
getSoilColor({ code: 'lichtBruin', codeSpace }); // '#b79a77'
getSoilColor(null);                               // null
```

## Call Signature

```ts
function getSoilColor(colour, defaultColor): string;
```

Defined in: [src/colors.ts:123](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/colors.ts#L123)

Get the hex color for a BRO soil colour code, falling back to a default.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `colour` | [`Coded`](/docs/bro-xml-parser/reference/api/general/coded/) \| `null` \| `undefined` | A coded colour value, or `null`/`undefined` |
| `defaultColor` | `string` | Fallback color returned when the code is absent or unknown |

### Returns

`string`

Hex color string, or `defaultColor` if the code is absent or unknown

### Example

```typescript
getSoilColor(null, '#808080'); // '#808080'
```
