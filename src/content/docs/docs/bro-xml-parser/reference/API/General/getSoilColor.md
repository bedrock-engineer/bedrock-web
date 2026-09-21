---
title: getSoilColor
prev: false
next: false
editUrl: false
---

# Function: getSoilColor()

## Call Signature

```ts
function getSoilColor(colorName): string | null;
```

Defined in: [src/colors.ts:108](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/colors.ts#L108)

Get the hex color for a BRO soil color name.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `colorName` | `string` | BRO color name (e.g., "lichtBruin", "donkerGrijs") |

### Returns

`string` \| `null`

Hex color string, or `null` if the name is not found

### Example

```typescript
getSoilColor('lichtBruin'); // '#b79a77'
getSoilColor('LICHTBRUIN'); // '#b79a77' (case-insensitive)
getSoilColor('unknown');    // null
```

## Call Signature

```ts
function getSoilColor(colorName, defaultColor): string;
```

Defined in: [src/colors.ts:121](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/colors.ts#L121)

Get the hex color for a BRO soil color name, falling back to a default.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `colorName` | `string` | BRO color name (e.g., "lichtBruin", "donkerGrijs") |
| `defaultColor` | `string` | Fallback color returned when the name is not found |

### Returns

`string`

Hex color string, or `defaultColor` if the name is not found

### Example

```typescript
getSoilColor('unknown', '#808080'); // '#808080'
```
