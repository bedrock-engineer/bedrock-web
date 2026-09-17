---
title: SettlementDeterminationStep
prev: false
next: false
editUrl: false
---

# Interface: SettlementDeterminationStep

Defined in: [src/types/index.ts:1436](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1436)

Single loading step in settlement characteristics test
Represents one stress increment in oedometer/consolidation test

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="stepnumber"></a> `stepNumber` | `number` | - | [src/types/index.ts:1437](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1437) |
| <a id="wetperformed"></a> `wetPerformed` | `boolean` \| `null` | - | [src/types/index.ts:1438](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1438) |
| <a id="swellobserved"></a> `swellObserved` | `boolean` \| `null` | - | [src/types/index.ts:1439](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1439) |
| <a id="strainpoint24hours"></a> `strainPoint24hours` | `number` \| `null` | - | [src/types/index.ts:1440](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1440) |
| <a id="steptype"></a> `stepType` | `string` \| `null` | - | [src/types/index.ts:1441](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1441) |
| <a id="verticalstress"></a> `verticalStress` | `number` \| `null` | - | [src/types/index.ts:1442](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1442) |
| <a id="heightchangeduringsettlement"></a> `heightChangeDuringSettlement` | [`HeightAtSpecificTime`](/docs/bro-xml-parser/reference/api/bhr-gt/heightatspecifictime/)[] | - | [src/types/index.ts:1443](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1443) |
| <a id="stresschangeduringsettlement"></a> `stressChangeDuringSettlement?` | [`StressAtSpecificSettlement`](/docs/bro-xml-parser/reference/api/bhr-gt/stressatspecificsettlement/)[] | Stress/strain time-series for the step (alternative to heightChangeDuringSettlement) | [src/types/index.ts:1445](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1445) |
