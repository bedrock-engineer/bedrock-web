---
title: SettlementCharacteristicsDetermination
prev: false
next: false
editUrl: false
---

# Interface: SettlementCharacteristicsDetermination

Defined in: [src/types/index.ts:1031](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1031)

Settlement characteristics determination (oedometer/consolidation test)
Used to determine soil compressibility and consolidation behavior

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="determinationprocedure"></a> `determinationProcedure` | `string` \| `null` | - | [src/types/index.ts:1032](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1032) |
| <a id="determinationmethod"></a> `determinationMethod` | `string` \| `null` | - | [src/types/index.ts:1033](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1033) |
| <a id="ringdiameter"></a> `ringDiameter` | `number` \| `null` | - | [src/types/index.ts:1034](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1034) |
| <a id="samplemoistness"></a> `sampleMoistness` | `string` \| `null` | - | [src/types/index.ts:1035](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1035) |
| <a id="filterpaperused"></a> `filterPaperUsed` | `boolean` \| `null` | - | [src/types/index.ts:1036](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1036) |
| <a id="temperature"></a> `temperature` | `number` \| `null` | - | [src/types/index.ts:1037](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1037) |
| <a id="wallfrictioncorrectionmethod"></a> `wallFrictionCorrectionMethod` | `string` \| `null` | - | [src/types/index.ts:1038](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1038) |
| <a id="apparatusdeformationapplied"></a> `apparatusDeformationApplied` | `boolean` \| `null` | - | [src/types/index.ts:1039](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1039) |
| <a id="bearingfrictioncorrectionapplied"></a> `bearingFrictionCorrectionApplied` | `boolean` \| `null` | - | [src/types/index.ts:1040](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1040) |
| <a id="irregularresult"></a> `irregularResult` | `boolean` \| `null` | - | [src/types/index.ts:1041](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1041) |
| <a id="saturationstageatcompression"></a> `saturationStageAtCompression?` | [`SaturationStageAtCompression`](/docs/bro-xml-parser/reference/api/bhr-gt/saturationstageatcompression/) | Saturation stage performed before compression (optional) | [src/types/index.ts:1043](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1043) |
| <a id="determinationsteps"></a> `determinationSteps` | [`SettlementDeterminationStep`](/docs/bro-xml-parser/reference/api/bhr-gt/settlementdeterminationstep/)[] | - | [src/types/index.ts:1044](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1044) |
