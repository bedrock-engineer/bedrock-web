---
title: ShearStressChangeDuringLoadingDetermination
prev: false
next: false
editUrl: false
---

# Interface: ShearStressChangeDuringLoadingDetermination

Defined in: [src/types/index.ts:1173](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1173)

Shear stress change during loading determination (triaxial/direct shear test)
ISO 17892-9 (triaxial) or ISO 17892-10 (direct shear)

Measures soil shear strength and stress-strain behavior under controlled loading.
Common test types:
- CU: Consolidated Undrained (belastenGeconsolideerdOngedraineerd)
- CD: Consolidated Drained (belastenGeconsolideerdGedraineerd)
- UU: Unconsolidated Undrained (belastenOngeconsolideerdOngedraineerd)

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="determinationprocedure"></a> `determinationProcedure` | `string` \| `null` | [src/types/index.ts:1174](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1174) |
| <a id="determinationmethod"></a> `determinationMethod` | `string` \| `null` | [src/types/index.ts:1175](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1175) |
| <a id="specimendisturbed"></a> `specimenDisturbed` | `boolean` \| `null` | [src/types/index.ts:1178](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1178) |
| <a id="specimentrimmed"></a> `specimenTrimmed` | `boolean` \| `null` | [src/types/index.ts:1179](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1179) |
| <a id="samplemoistness"></a> `sampleMoistness` | `string` \| `null` | [src/types/index.ts:1180](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1180) |
| <a id="begindiameter"></a> `beginDiameter` | `number` \| `null` | [src/types/index.ts:1181](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1181) |
| <a id="beginheight"></a> `beginHeight` | `number` \| `null` | [src/types/index.ts:1182](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1182) |
| <a id="topcaptiltable"></a> `topCapTiltable` | `boolean` \| `null` | [src/types/index.ts:1185](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1185) |
| <a id="filterpaperused"></a> `filterPaperUsed` | `boolean` \| `null` | [src/types/index.ts:1186](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1186) |
| <a id="drainagestripsused"></a> `drainageStripsUsed` | `boolean` \| `null` | [src/types/index.ts:1187](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1187) |
| <a id="membranesaturatedbefore"></a> `membraneSaturatedBefore` | `boolean` \| `null` | [src/types/index.ts:1188](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1188) |
| <a id="apparatusdeformationapplied"></a> `apparatusDeformationApplied` | `boolean` \| `null` | [src/types/index.ts:1189](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1189) |
| <a id="celldeformationapplied"></a> `cellDeformationApplied` | `boolean` \| `null` | [src/types/index.ts:1190](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1190) |
| <a id="stopcriterion"></a> `stopCriterion` | `string` \| `null` | [src/types/index.ts:1191](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1191) |
| <a id="membranecorrection"></a> `membraneCorrection?` | [`MembraneCorrection`](/docs/bro-xml-parser/reference/api/bhr-gt/membranecorrection/) | [src/types/index.ts:1194](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1194) |
| <a id="drainagestripcorrection"></a> `drainageStripCorrection?` | [`DrainageStripCorrection`](/docs/bro-xml-parser/reference/api/bhr-gt/drainagestripcorrection/) | [src/types/index.ts:1195](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1195) |
| <a id="madespecimenforloading"></a> `madeSpecimenForLoading?` | [`SpecimenMadeForLoading`](/docs/bro-xml-parser/reference/api/bhr-gt/specimenmadeforloading/) | [src/types/index.ts:1198](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1198) |
| <a id="saturationstageatloading"></a> `saturationStageAtLoading?` | [`SaturationStageAtLoading`](/docs/bro-xml-parser/reference/api/bhr-gt/saturationstageatloading/) | [src/types/index.ts:1201](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1201) |
| <a id="consolidationstageatloading"></a> `consolidationStageAtLoading?` | [`ConsolidationStageAtLoading`](/docs/bro-xml-parser/reference/api/bhr-gt/consolidationstageatloading/) | [src/types/index.ts:1202](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1202) |
| <a id="loadstage"></a> `loadStage?` | [`LoadStage`](/docs/bro-xml-parser/reference/api/bhr-gt/loadstage/) | [src/types/index.ts:1203](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1203) |
