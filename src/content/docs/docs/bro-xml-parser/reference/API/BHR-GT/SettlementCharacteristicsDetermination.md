---
title: SettlementCharacteristicsDetermination
prev: false
next: false
editUrl: false
---

# Interface: SettlementCharacteristicsDetermination

Defined in: [src/types/index.ts:1469](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1469)

Settlement characteristics determination (oedometer/consolidation test)
Used to determine soil compressibility and consolidation behavior

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="determinationprocedure"></a> `determinationProcedure` | `string` \| `null` | - | [src/types/index.ts:1470](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1470) |
| <a id="determinationmethod"></a> `determinationMethod` | `string` \| `null` | - | [src/types/index.ts:1471](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1471) |
| <a id="ringdiameter"></a> `ringDiameter` | `number` \| `null` | - | [src/types/index.ts:1472](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1472) |
| <a id="samplemoistness"></a> `sampleMoistness` | `string` \| `null` | - | [src/types/index.ts:1473](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1473) |
| <a id="filterpaperused"></a> `filterPaperUsed` | `boolean` \| `null` | - | [src/types/index.ts:1474](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1474) |
| <a id="temperature"></a> `temperature` | `number` \| `null` | - | [src/types/index.ts:1475](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1475) |
| <a id="wallfrictioncorrectionmethod"></a> `wallFrictionCorrectionMethod` | `string` \| `null` | - | [src/types/index.ts:1476](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1476) |
| <a id="apparatusdeformationapplied"></a> `apparatusDeformationApplied` | `boolean` \| `null` | - | [src/types/index.ts:1477](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1477) |
| <a id="bearingfrictioncorrectionapplied"></a> `bearingFrictionCorrectionApplied` | `boolean` \| `null` | - | [src/types/index.ts:1478](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1478) |
| <a id="irregularresult"></a> `irregularResult` | `boolean` \| `null` | - | [src/types/index.ts:1479](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1479) |
| <a id="saturationstageatcompression"></a> `saturationStageAtCompression?` | [`SaturationStageAtCompression`](/docs/bro-xml-parser/reference/api/bhr-gt/saturationstageatcompression/) | Saturation stage performed before compression (optional) | [src/types/index.ts:1481](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1481) |
| <a id="determinationsteps"></a> `determinationSteps` | [`SettlementDeterminationStep`](/docs/bro-xml-parser/reference/api/bhr-gt/settlementdeterminationstep/)[] | - | [src/types/index.ts:1482](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1482) |
