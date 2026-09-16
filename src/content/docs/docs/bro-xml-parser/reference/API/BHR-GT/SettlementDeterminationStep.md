---
title: SettlementDeterminationStep
prev: false
next: false
editUrl: false
---

# Interface: SettlementDeterminationStep

Defined in: [src/types/index.ts:1002](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1002)

Single loading step in settlement characteristics test
Represents one stress increment in oedometer/consolidation test

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="stepnumber"></a> `stepNumber` | `number` | - | [src/types/index.ts:1003](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1003) |
| <a id="wetperformed"></a> `wetPerformed` | `boolean` \| `null` | - | [src/types/index.ts:1004](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1004) |
| <a id="swellobserved"></a> `swellObserved` | `boolean` \| `null` | - | [src/types/index.ts:1005](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1005) |
| <a id="strainpoint24hours"></a> `strainPoint24hours` | `number` \| `null` | - | [src/types/index.ts:1006](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1006) |
| <a id="steptype"></a> `stepType` | `string` \| `null` | - | [src/types/index.ts:1007](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1007) |
| <a id="verticalstress"></a> `verticalStress` | `number` \| `null` | - | [src/types/index.ts:1008](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1008) |
| <a id="heightchangeduringsettlement"></a> `heightChangeDuringSettlement` | [`HeightAtSpecificTime`](/docs/bro-xml-parser/reference/api/bhr-gt/heightatspecifictime/)[] | - | [src/types/index.ts:1009](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1009) |
| <a id="stresschangeduringsettlement"></a> `stressChangeDuringSettlement?` | [`StressAtSpecificSettlement`](/docs/bro-xml-parser/reference/api/bhr-gt/stressatspecificsettlement/)[] | Stress/strain time-series for the step (alternative to heightChangeDuringSettlement) | [src/types/index.ts:1011](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1011) |
