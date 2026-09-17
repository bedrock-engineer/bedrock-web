---
title: ShearStressChangeDuringLoadingDetermination
prev: false
next: false
editUrl: false
---

# Interface: ShearStressChangeDuringLoadingDetermination

Defined in: [src/types/index.ts:1628](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1628)

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
| <a id="determinationprocedure"></a> `determinationProcedure` | `string` \| `null` | [src/types/index.ts:1629](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1629) |
| <a id="determinationmethod"></a> `determinationMethod` | `string` \| `null` | [src/types/index.ts:1630](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1630) |
| <a id="specimendisturbed"></a> `specimenDisturbed` | `boolean` \| `null` | [src/types/index.ts:1633](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1633) |
| <a id="specimentrimmed"></a> `specimenTrimmed` | `boolean` \| `null` | [src/types/index.ts:1634](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1634) |
| <a id="samplemoistness"></a> `sampleMoistness` | `string` \| `null` | [src/types/index.ts:1635](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1635) |
| <a id="begindiameter"></a> `beginDiameter` | `number` \| `null` | [src/types/index.ts:1636](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1636) |
| <a id="beginheight"></a> `beginHeight` | `number` \| `null` | [src/types/index.ts:1637](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1637) |
| <a id="topcaptiltable"></a> `topCapTiltable` | `boolean` \| `null` | [src/types/index.ts:1640](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1640) |
| <a id="filterpaperused"></a> `filterPaperUsed` | `boolean` \| `null` | [src/types/index.ts:1641](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1641) |
| <a id="drainagestripsused"></a> `drainageStripsUsed` | `boolean` \| `null` | [src/types/index.ts:1642](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1642) |
| <a id="membranesaturatedbefore"></a> `membraneSaturatedBefore` | `boolean` \| `null` | [src/types/index.ts:1643](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1643) |
| <a id="apparatusdeformationapplied"></a> `apparatusDeformationApplied` | `boolean` \| `null` | [src/types/index.ts:1644](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1644) |
| <a id="celldeformationapplied"></a> `cellDeformationApplied` | `boolean` \| `null` | [src/types/index.ts:1645](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1645) |
| <a id="stopcriterion"></a> `stopCriterion` | `string` \| `null` | [src/types/index.ts:1646](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1646) |
| <a id="membranecorrection"></a> `membraneCorrection?` | [`MembraneCorrection`](/docs/bro-xml-parser/reference/api/bhr-gt/membranecorrection/) | [src/types/index.ts:1649](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1649) |
| <a id="drainagestripcorrection"></a> `drainageStripCorrection?` | [`DrainageStripCorrection`](/docs/bro-xml-parser/reference/api/bhr-gt/drainagestripcorrection/) | [src/types/index.ts:1650](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1650) |
| <a id="madespecimenforloading"></a> `madeSpecimenForLoading?` | [`SpecimenMadeForLoading`](/docs/bro-xml-parser/reference/api/bhr-gt/specimenmadeforloading/) | [src/types/index.ts:1653](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1653) |
| <a id="saturationstageatloading"></a> `saturationStageAtLoading?` | [`SaturationStageAtLoading`](/docs/bro-xml-parser/reference/api/bhr-gt/saturationstageatloading/) | [src/types/index.ts:1656](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1656) |
| <a id="consolidationstageatloading"></a> `consolidationStageAtLoading?` | [`ConsolidationStageAtLoading`](/docs/bro-xml-parser/reference/api/bhr-gt/consolidationstageatloading/) | [src/types/index.ts:1657](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1657) |
| <a id="loadstage"></a> `loadStage?` | [`LoadStage`](/docs/bro-xml-parser/reference/api/bhr-gt/loadstage/) | [src/types/index.ts:1658](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1658) |
