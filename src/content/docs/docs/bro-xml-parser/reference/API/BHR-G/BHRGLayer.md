---
title: BHRGLayer
prev: false
next: false
editUrl: false
---

# Interface: BHRGLayer

Defined in: [src/types/index.ts:902](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L902)

BHR-G (Geological Borehole) layer data

Contains all fields from the BRO BHR-G schema for a single soil layer.
Soil-level fields are flattened directly onto the layer (matching the parser's
existing style); genuinely nested sub-structures (fractions, mottles, chunks,
thin strata) are modelled as nested objects/arrays.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="upperboundary"></a> `upperBoundary` | `number` | - | [src/types/index.ts:904](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L904) |
| <a id="lowerboundary"></a> `lowerBoundary` | `number` | - | [src/types/index.ts:905](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L905) |
| <a id="upperboundarydetermination"></a> `upperBoundaryDetermination?` | `string` \| `null` | - | [src/types/index.ts:908](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L908) |
| <a id="lowerboundarydetermination"></a> `lowerBoundaryDetermination?` | `string` \| `null` | - | [src/types/index.ts:909](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L909) |
| <a id="soilnamenen5104"></a> `soilNameNEN5104` | `string` | - | [src/types/index.ts:912](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L912) |
| <a id="color"></a> `color?` | `string` | - | [src/types/index.ts:915](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L915) |
| <a id="anthropogenic"></a> `anthropogenic?` | `string` \| `null` | Whether the layer is anthropogenic (man-made) - uses string codes in BHR-G (ja/nee/onbekend) | [src/types/index.ts:917](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L917) |
| <a id="rooted"></a> `rooted?` | `string` \| `null` | Whether the layer is rooted - uses string codes in BHR-G (ja/nee/onbekend) | [src/types/index.ts:919](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L919) |
| <a id="organicmattercontentclassnen5104"></a> `organicMatterContentClassNEN5104?` | `string` \| `null` | - | [src/types/index.ts:920](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L920) |
| <a id="gravelcontentclass"></a> `gravelContentClass?` | `string` \| `null` | - | [src/types/index.ts:921](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L921) |
| <a id="carbonatecontentclass"></a> `carbonateContentClass?` | `string` \| `null` | - | [src/types/index.ts:922](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L922) |
| <a id="sandmedianclass"></a> `sandMedianClass?` | `string` \| `null` | - | [src/types/index.ts:923](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L923) |
| <a id="postsedimentary"></a> `postSedimentary?` | `string` \| `null` | Whether a post-sedimentary change is present (raw code) | [src/types/index.ts:927](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L927) |
| <a id="horizoncode"></a> `horizonCode?` | `string` \| `null` | - | [src/types/index.ts:928](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L928) |
| <a id="humantrace"></a> `humanTrace?` | `string` \| `null` | - | [src/types/index.ts:929](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L929) |
| <a id="geologicalorigin"></a> `geologicalOrigin?` | `string` \| `null` | - | [src/types/index.ts:930](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L930) |
| <a id="bioturbated"></a> `bioturbated?` | `string` \| `null` | - | [src/types/index.ts:931](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L931) |
| <a id="structure"></a> `structure?` | `string`[] | Sedimentary structures (0-3) | [src/types/index.ts:933](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L933) |
| <a id="verticaltrend"></a> `verticalTrend?` | `string`[] | Vertical trends (0-3) | [src/types/index.ts:935](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L935) |
| <a id="archeologicalconstituents"></a> `archeologicalConstituents?` | `string`[] | Archeological constituent types (0-5) | [src/types/index.ts:937](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L937) |
| <a id="geologicalsoilname"></a> `geologicalSoilName?` | `string` \| `null` | Geological soil name (lithostratigraphic) | [src/types/index.ts:941](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L941) |
| <a id="shellmattercontentclass"></a> `shellMatterContentClass?` | `string` \| `null` | Shell matter content classification | [src/types/index.ts:943](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L943) |
| <a id="micacontentclass"></a> `micaContentClass?` | `string` \| `null` | - | [src/types/index.ts:944](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L944) |
| <a id="micacontentclassarchive"></a> `micaContentClassArchive?` | `string` \| `null` | - | [src/types/index.ts:945](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L945) |
| <a id="shellmattercontentclassarchive"></a> `shellMatterContentClassArchive?` | `string` \| `null` | - | [src/types/index.ts:946](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L946) |
| <a id="verycoarsefractioncontentclass"></a> `veryCoarseFractionContentClass?` | `string`[] | Very coarse fraction content classes (0-2) | [src/types/index.ts:948](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L948) |
| <a id="verycoarsefractioncontentclassarchive"></a> `veryCoarseFractionContentClassArchive?` | `string`[] | Very coarse fraction content classes, archive coding (0-2) | [src/types/index.ts:950](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L950) |
| <a id="glauconitecontentclass"></a> `glauconiteContentClass?` | `string` \| `null` | - | [src/types/index.ts:951](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L951) |
| <a id="glauconitecontentclassarchive"></a> `glauconiteContentClassArchive?` | `string` \| `null` | - | [src/types/index.ts:952](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L952) |
| <a id="sedimentaryphenomenon"></a> `sedimentaryPhenomenon?` | `string` \| `null` | - | [src/types/index.ts:953](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L953) |
| <a id="animalfossils"></a> `animalFossils?` | `string`[] | Animal fossil types found in the soil (0+) | [src/types/index.ts:955](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L955) |
| <a id="munsellcolour"></a> `munsellColour?` | [`MunsellColour`](/docs/bro-xml-parser/reference/api/bhr-g/munsellcolour/) | - | [src/types/index.ts:958](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L958) |
| <a id="sandfraction"></a> `sandFraction?` | [`SandFraction`](/docs/bro-xml-parser/reference/api/bhr-g/sandfraction/) | - | [src/types/index.ts:959](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L959) |
| <a id="shellfraction"></a> `shellFraction?` | [`ShellFraction`](/docs/bro-xml-parser/reference/api/bhr-g/shellfraction/) | - | [src/types/index.ts:960](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L960) |
| <a id="gravelfraction"></a> `gravelFraction?` | [`GravelFraction`](/docs/bro-xml-parser/reference/api/bhr-g/gravelfraction/) | - | [src/types/index.ts:961](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L961) |
| <a id="peatfraction"></a> `peatFraction?` | [`PeatFraction`](/docs/bro-xml-parser/reference/api/bhr-g/peatfraction/) | - | [src/types/index.ts:962](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L962) |
| <a id="fractiondistribution"></a> `fractionDistribution?` | [`FractionDistribution`](/docs/bro-xml-parser/reference/api/bhr-g/fractiondistribution/) | - | [src/types/index.ts:963](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L963) |
| <a id="chunks"></a> `chunks?` | [`Chunk`](/docs/bro-xml-parser/reference/api/bhr-g/chunk/)[] | Chunks of differing material (0-3) | [src/types/index.ts:965](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L965) |
| <a id="mottles"></a> `mottles?` | [`Mottle`](/docs/bro-xml-parser/reference/api/bhr-g/mottle/)[] | Mottles (0-3) | [src/types/index.ts:967](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L967) |
| <a id="thinstrata"></a> `thinStrata?` | [`ThinStratum`](/docs/bro-xml-parser/reference/api/bhr-g/thinstratum/)[] | Thin interbedded strata (0-4) | [src/types/index.ts:969](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L969) |
