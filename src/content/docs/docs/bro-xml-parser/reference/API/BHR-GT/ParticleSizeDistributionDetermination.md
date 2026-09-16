---
title: ParticleSizeDistributionDetermination
prev: false
next: false
editUrl: false
---

# Interface: ParticleSizeDistributionDetermination

Defined in: [src/types/index.ts:899](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L899)

Particle size distribution determination result
Contains detailed grain size fractions

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="determinationprocedure"></a> `determinationProcedure` | `string` \| `null` | - | [src/types/index.ts:900](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L900) |
| <a id="determinationmethod"></a> `determinationMethod` | `string` \| `null` | - | [src/types/index.ts:901](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L901) |
| <a id="fractiondistribution"></a> `fractionDistribution` | `string` \| `null` | - | [src/types/index.ts:902](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L902) |
| <a id="dispersionmethod"></a> `dispersionMethod` | `string` \| `null` | - | [src/types/index.ts:903](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L903) |
| <a id="removedmaterial"></a> `removedMaterial` | `string` \| `null` | - | [src/types/index.ts:904](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L904) |
| <a id="equivalentmassdeterminationmethod"></a> `equivalentMassDeterminationMethod` | `string` \| `null` | - | [src/types/index.ts:905](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L905) |
| <a id="equivalentmass"></a> `equivalentMass` | `number` \| `null` | - | [src/types/index.ts:906](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L906) |
| <a id="fractionsmaller63um"></a> `fractionSmaller63um` | `number` \| `null` | - | [src/types/index.ts:909](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L909) |
| <a id="fractionlarger63um"></a> `fractionLarger63um` | `number` \| `null` | - | [src/types/index.ts:910](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L910) |
| <a id="fraction0to2um"></a> `fraction0to2um?` | `number` \| `null` | - | [src/types/index.ts:913](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L913) |
| <a id="fraction2to32um"></a> `fraction2to32um?` | `number` \| `null` | 2–32 µm fraction — only present in the coarser standardDistributionFractionSmaller63um group | [src/types/index.ts:915](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L915) |
| <a id="fraction2to4um"></a> `fraction2to4um?` | `number` \| `null` | - | [src/types/index.ts:916](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L916) |
| <a id="fraction4to8um"></a> `fraction4to8um?` | `number` \| `null` | - | [src/types/index.ts:917](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L917) |
| <a id="fraction8to16um"></a> `fraction8to16um?` | `number` \| `null` | - | [src/types/index.ts:918](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L918) |
| <a id="fraction16to32um"></a> `fraction16to32um?` | `number` \| `null` | - | [src/types/index.ts:919](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L919) |
| <a id="fraction32to50um"></a> `fraction32to50um?` | `number` \| `null` | - | [src/types/index.ts:920](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L920) |
| <a id="fraction50to63um"></a> `fraction50to63um?` | `number` \| `null` | - | [src/types/index.ts:921](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L921) |
| <a id="fraction63to90um"></a> `fraction63to90um?` | `number` \| `null` | - | [src/types/index.ts:924](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L924) |
| <a id="fraction90to125um"></a> `fraction90to125um?` | `number` \| `null` | - | [src/types/index.ts:925](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L925) |
| <a id="fraction125to180um"></a> `fraction125to180um?` | `number` \| `null` | - | [src/types/index.ts:926](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L926) |
| <a id="fraction180to250um"></a> `fraction180to250um?` | `number` \| `null` | - | [src/types/index.ts:927](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L927) |
| <a id="fraction250to355um"></a> `fraction250to355um?` | `number` \| `null` | - | [src/types/index.ts:928](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L928) |
| <a id="fraction355to500um"></a> `fraction355to500um?` | `number` \| `null` | - | [src/types/index.ts:929](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L929) |
| <a id="fraction500to710um"></a> `fraction500to710um?` | `number` \| `null` | - | [src/types/index.ts:930](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L930) |
| <a id="fraction710to1000um"></a> `fraction710to1000um?` | `number` \| `null` | - | [src/types/index.ts:931](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L931) |
| <a id="fraction1000to1400um"></a> `fraction1000to1400um?` | `number` \| `null` | - | [src/types/index.ts:932](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L932) |
| <a id="fraction1400umto2mm"></a> `fraction1400umto2mm?` | `number` \| `null` | - | [src/types/index.ts:933](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L933) |
| <a id="fraction2to4mm"></a> `fraction2to4mm?` | `number` \| `null` | - | [src/types/index.ts:934](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L934) |
| <a id="fraction4to8mm"></a> `fraction4to8mm?` | `number` \| `null` | - | [src/types/index.ts:935](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L935) |
| <a id="fraction8to16mm"></a> `fraction8to16mm?` | `number` \| `null` | - | [src/types/index.ts:936](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L936) |
| <a id="fraction16to31_5mm"></a> `fraction16to31_5mm?` | `number` \| `null` | - | [src/types/index.ts:938](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L938) |
| <a id="fraction31_5to63mm"></a> `fraction31_5to63mm?` | `number` \| `null` | - | [src/types/index.ts:940](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L940) |
| <a id="fractionlarger63mm"></a> `fractionLarger63mm?` | `number` \| `null` | - | [src/types/index.ts:941](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L941) |
