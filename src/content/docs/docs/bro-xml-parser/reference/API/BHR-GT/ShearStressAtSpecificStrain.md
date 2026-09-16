---
title: ShearStressAtSpecificStrain
prev: false
next: false
editUrl: false
---

# Interface: ShearStressAtSpecificStrain

Defined in: [src/types/index.ts:1135](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1135)

Shear stress measurement at specific strain during loading
Used to construct stress-strain curves for soil strength analysis

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="time"></a> `time` | `number` | [src/types/index.ts:1136](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1136) |
| <a id="axialstrain"></a> `axialStrain` | `number` | [src/types/index.ts:1137](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1137) |
| <a id="deviatorstress"></a> `deviatorStress` | `number` | [src/types/index.ts:1138](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1138) |
| <a id="cellpressure"></a> `cellPressure` | `number` | [src/types/index.ts:1139](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1139) |
| <a id="porepressure"></a> `porePressure?` | `number` \| `null` | [src/types/index.ts:1140](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1140) |
| <a id="volumechange"></a> `volumeChange?` | `number` \| `null` | [src/types/index.ts:1141](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1141) |
