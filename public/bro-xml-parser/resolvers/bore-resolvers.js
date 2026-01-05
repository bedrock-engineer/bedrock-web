/**
 * Resolvers for BHR-GT (Geotechnical Borehole) data
 *
 * Functions to parse and convert bore-specific data structures
 */
// Import shared utilities
import { createXPathTextGetter, createNamespaceResolver, getTextContent, findChildElement, extractArray, parseCSVPairs } from './bore-resolver-utils.js';
// Import type resolvers
import { parseBoolean as parseBoole, parseFloat as parseFloatValue } from './type-resolvers.js';
/**
 * Process bore layer data from descriptiveBoreholeLog element
 *
 * Extracts all layer elements and converts them to BoreLayer objects.
 * Each layer contains depth boundaries and soil classification information.
 *
 * @param value - Not used (we work with the node directly)
 * @param context - Resolver context containing the XML node and adapter
 * @returns Array of BoreLayer objects
 */
export function processBoreLayerData(_value, context) {
    const { node, adapter, namespaces } = context;
    // Find all layer elements
    const layerNodes = adapter.evaluateXPathAll(node, './/bhrgtcom:layer', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
    const layers = [];
    for (const layerNode of layerNodes) {
        // Extract required fields
        const upperBoundaryNode = adapter.evaluateXPath(layerNode, './bhrgtcom:upperBoundary', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const lowerBoundaryNode = adapter.evaluateXPath(layerNode, './bhrgtcom:lowerBoundary', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const soilNameNode = adapter.evaluateXPath(layerNode, './bhrgtcom:soil/bhrgtcom:geotechnicalSoilName', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        // Skip layer if required fields are missing
        if (!upperBoundaryNode || !lowerBoundaryNode || !soilNameNode) {
            continue;
        }
        const upperBoundary = Number.parseFloat(upperBoundaryNode.textContent || '0');
        const lowerBoundary = Number.parseFloat(lowerBoundaryNode.textContent || '0');
        const geotechnicalSoilName = (soilNameNode.textContent || '').trim();
        // Extract optional fields
        const colorNode = adapter.evaluateXPath(layerNode, './bhrgtcom:soil/bhrgtcom:colour', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const dispersedInhomogeneityNode = adapter.evaluateXPath(layerNode, './bhrgtcom:soil/bhrgtcom:dispersedInhomogeneity', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const organicMatterNode = adapter.evaluateXPath(layerNode, './bhrgtcom:soil/bhrgtcom:organicMatterContentClass', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const sandMedianNode = adapter.evaluateXPath(layerNode, './bhrgtcom:soil/bhrgtcom:sandMedianClass', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const layer = {
            upperBoundary,
            lowerBoundary,
            geotechnicalSoilName,
            ...(colorNode?.textContent && { color: colorNode.textContent.trim() }),
            dispersedInhomogeneity: dispersedInhomogeneityNode ?
                (dispersedInhomogeneityNode.textContent?.trim().toLowerCase() === 'ja' ||
                    dispersedInhomogeneityNode.textContent?.trim().toLowerCase() === 'yes') :
                null,
            organicMatterContentClass: organicMatterNode?.textContent?.trim() || null,
            sandMedianClass: sandMedianNode?.textContent?.trim() || null,
        };
        layers.push(layer);
    }
    return layers;
}
/**
 * Adapter for parseBoolean to handle our specific needs
 */
function parseBoolean(text) {
    return parseBoole(text || null);
}
/**
 * Adapter for parseFloat to handle our specific needs
 */
function parseFloat(text) {
    return parseFloatValue(text || null);
}
/**
 * Empty structure constants for determinations
 */
const EMPTY_CONSISTENCY_LIMITS = {
    determinationProcedure: null,
    determinationMethod: null,
    fractionLarger500um: null,
    usedMedium: null,
    performanceIrregularity: null,
    liquidLimit: null,
    plasticLimit: null,
    plasticityIndex: null,
    plasticityAtSpecificWaterContent: []
};
const EMPTY_SETTLEMENT_CHARACTERISTICS = {
    determinationProcedure: null,
    determinationMethod: null,
    ringDiameter: null,
    sampleMoistness: null,
    filterPaperUsed: null,
    temperature: null,
    wallFrictionCorrectionMethod: null,
    apparatusDeformationApplied: null,
    bearingFrictionCorrectionApplied: null,
    irregularResult: null,
    determinationSteps: []
};
const EMPTY_SATURATED_PERMEABILITY = {
    determinationProcedure: null,
    determinationMethod: null,
    specimenMade: null,
    saturatedWithCO2: null,
    verticallyDetermined: null,
    currentDownwards: null,
    usedMedium: null,
    waterDegassed: null,
    temperature: null,
    maximumGradient: null,
    saturatedPermeabilityAtSpecificDensity: []
};
/**
 * Parse water content determination from XML node
 */
function parseWaterContentDetermination(node, adapter, namespaces) {
    const getText = createXPathTextGetter(node, adapter, namespaces);
    const resultNode = findChildElement(node, './bhrgtcom:determinationResult', adapter, namespaces);
    return {
        determinationProcedure: getText('./bhrgtcom:determinationProcedure'),
        determinationMethod: getText('./bhrgtcom:determinationMethod'),
        sampleMoistness: getText('./bhrgtcom:sampleMoistness'),
        removedMaterial: getText('./bhrgtcom:removedMaterial'),
        waterContent: resultNode ? parseFloat(getText('./bhrgtcom:determinationResult/bhrgtcom:waterContent')) : null,
        dryingTemperature: resultNode ? getText('./bhrgtcom:determinationResult/bhrgtcom:dryingTemperature') : null,
        dryingPeriod: resultNode ? getText('./bhrgtcom:determinationResult/bhrgtcom:dryingPeriod') : null,
        saltCorrectionMethod: resultNode ? getText('./bhrgtcom:determinationResult/bhrgtcom:saltCorrectionMethod') : null
    };
}
/**
 * Parse volumetric mass density determination from XML node
 */
function parseVolumetricMassDensityDetermination(node, adapter, namespaces) {
    const getText = createXPathTextGetter(node, adapter, namespaces);
    return {
        determinationProcedure: getText('./bhrgtcom:determinationProcedure'),
        determinationMethod: getText('./bhrgtcom:determinationMethod'),
        sampleMoistness: getText('./bhrgtcom:sampleMoistness'),
        volumetricMassDensity: parseFloat(getText('./bhrgtcom:volumetricMassDensity'))
    };
}
/**
 * Parse organic matter content determination from XML node
 */
function parseOrganicMatterContentDetermination(node, adapter, namespaces) {
    const getText = createXPathTextGetter(node, adapter, namespaces);
    return {
        determinationProcedure: getText('./bhrgtcom:determinationProcedure'),
        determinationMethod: getText('./bhrgtcom:determinationMethod'),
        removedMaterial: getText('./bhrgtcom:removedMaterial'),
        organicMatterContent: parseFloat(getText('./bhrgtcom:organicMatterContent'))
    };
}
/**
 * Parse carbonate content determination from XML node
 */
function parseCarbonateContentDetermination(node, adapter, namespaces) {
    const getText = createXPathTextGetter(node, adapter, namespaces);
    return {
        determinationProcedure: getText('./bhrgtcom:determinationProcedure'),
        determinationMethod: getText('./bhrgtcom:determinationMethod'),
        removedMaterial: getText('./bhrgtcom:removedMaterial'),
        carbonateContent: parseFloat(getText('./bhrgtcom:carbonateContent'))
    };
}
/**
 * Parse volumetric mass density of solids determination from XML node
 */
function parseVolumetricMassDensityOfSolidsDetermination(node, adapter, namespaces) {
    const getText = createXPathTextGetter(node, adapter, namespaces);
    return {
        determinationProcedure: getText('./bhrgtcom:determinationProcedure'),
        determinationMethod: getText('./bhrgtcom:determinationMethod'),
        liquidUsed: getText('./bhrgtcom:liquidUsed'),
        volumetricMassDensityOfSolids: parseFloat(getText('./bhrgtcom:volumetricMassDensityOfSolids'))
    };
}
/**
 * Parse particle size distribution determination from XML node
 */
function parseParticleSizeDistributionDetermination(node, adapter, namespaces) {
    const getText = createXPathTextGetter(node, adapter, namespaces);
    const basicDistNode = findChildElement(node, './bhrgtcom:basicParticleSizeDistribution', adapter, namespaces);
    const detailedNode = basicDistNode ? findChildElement(basicDistNode, './bhrgtcom:detailedDistributionFractionSmaller63um', adapter, namespaces) : null;
    const standardNode = basicDistNode ? findChildElement(basicDistNode, './bhrgtcom:standardDistributionFractionLarger63um', adapter, namespaces) : null;
    return {
        determinationProcedure: getText('./bhrgtcom:determinationProcedure'),
        determinationMethod: getText('./bhrgtcom:determinationMethod'),
        fractionDistribution: getText('./bhrgtcom:fractionDistribution'),
        dispersionMethod: getText('./bhrgtcom:dispersionMethod'),
        removedMaterial: getText('./bhrgtcom:removedMaterial'),
        equivalentMassDeterminationMethod: getText('./bhrgtcom:equivalentMassDeterminationMethod'),
        equivalentMass: parseFloat(getText('./bhrgtcom:equivalentMass')),
        // Basic distribution
        fractionSmaller63um: basicDistNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:fractionSmaller63um')) : null,
        fractionLarger63um: basicDistNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:fractionLarger63um')) : null,
        // Detailed distribution < 63μm
        fraction0to2um: detailedNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:detailedDistributionFractionSmaller63um/bhrgtcom:fraction0to2um')) : null,
        fraction2to4um: detailedNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:detailedDistributionFractionSmaller63um/bhrgtcom:fraction2to4um')) : null,
        fraction4to8um: detailedNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:detailedDistributionFractionSmaller63um/bhrgtcom:fraction4to8um')) : null,
        fraction8to16um: detailedNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:detailedDistributionFractionSmaller63um/bhrgtcom:fraction8to16um')) : null,
        fraction16to32um: detailedNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:detailedDistributionFractionSmaller63um/bhrgtcom:fraction16to32um')) : null,
        fraction32to50um: detailedNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:detailedDistributionFractionSmaller63um/bhrgtcom:fraction32to50um')) : null,
        fraction50to63um: detailedNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:detailedDistributionFractionSmaller63um/bhrgtcom:fraction50to63um')) : null,
        // Standard distribution > 63μm
        fraction63to90um: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction63to90um')) : null,
        fraction90to125um: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction90to125um')) : null,
        fraction125to180um: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction125to180um')) : null,
        fraction180to250um: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction180to250um')) : null,
        fraction250to355um: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction250to355um')) : null,
        fraction355to500um: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction355to500um')) : null,
        fraction500to710um: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction500to710um')) : null,
        fraction710to1000um: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction710to1000um')) : null,
        fraction1000to1400um: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction1000to1400um')) : null,
        fraction1400umto2mm: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction1400umto2mm')) : null,
        fraction2to4mm: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction2to4mm')) : null,
        fraction4to8mm: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction4to8mm')) : null,
        fraction8to16mm: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction8to16mm')) : null,
        fraction16to31_5mm: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction16to31_5mm')) : null,
        fraction31_5to63mm: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction31_5to63mm')) : null,
        fractionLarger63mm: standardNode ? parseFloat(getText('./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fractionLarger63mm')) : null
    };
}
/**
 * Parse consistency limits determination (Atterberg limits) from XML node
 */
function parseConsistencyLimitsDetermination(node, adapter, namespaces) {
    const detNode = findChildElement(node, './bhrgtcom:ConsistencyLimitsDetermination', adapter, namespaces);
    if (!detNode) {
        return EMPTY_CONSISTENCY_LIMITS;
    }
    const getText = createXPathTextGetter(detNode, adapter, namespaces);
    const plasticityAtSpecificWaterContent = extractArray(detNode, './bhrgtcom:plasticityAtSpecificWaterContent', (_pNode, getPlasticityText) => {
        const waterContent = parseFloat(getPlasticityText('./bhrgtcom:waterContent'));
        const numberOfFalls = parseInt(getPlasticityText('./bhrgtcom:numberOfFalls') || '0', 10);
        return waterContent !== null && !isNaN(numberOfFalls)
            ? { waterContent, numberOfFalls }
            : null;
    }, adapter, namespaces);
    return {
        determinationProcedure: getText('./bhrgtcom:determinationProcedure'),
        determinationMethod: getText('./bhrgtcom:determinationMethod'),
        fractionLarger500um: parseFloat(getText('./bhrgtcom:fractionLarger500um')),
        usedMedium: getText('./bhrgtcom:usedMedium'),
        performanceIrregularity: getText('./bhrgtcom:performanceIrregularity'),
        liquidLimit: parseFloat(getText('./bhrgtcom:liquidLimit')),
        plasticLimit: parseFloat(getText('./bhrgtcom:plasticLimit')),
        plasticityIndex: parseFloat(getText('./bhrgtcom:plasticityIndex')),
        plasticityAtSpecificWaterContent
    };
}
/**
 * Parse settlement characteristics determination (Oedometer/Consolidation test) from XML node
 */
function parseSettlementCharacteristicsDetermination(node, adapter, namespaces) {
    const detNode = findChildElement(node, './bhrgtcom:SettlementCharacteristicsDetermination', adapter, namespaces);
    if (!detNode) {
        return EMPTY_SETTLEMENT_CHARACTERISTICS;
    }
    const getText = createXPathTextGetter(detNode, adapter, namespaces);
    const determinationSteps = extractArray(detNode, './bhrgtcom:determinationStep', (stepNode, getStepText) => {
        const stepNumber = parseInt(getStepText('./bhrgtcom:stepNumber') || '0', 10);
        const heightChangeNode = findChildElement(stepNode, './bhrgtcom:heightChangeDuringSettlement/bhrgtcom:values', adapter, namespaces);
        const heightChangeDuringSettlement = parseCSVPairs(heightChangeNode?.textContent, (timeStr, heightStr) => {
            const time = parseFloat(timeStr);
            const height = parseFloat(heightStr);
            return time !== null && height !== null && !isNaN(time) && !isNaN(height)
                ? { time, height }
                : null;
        });
        return {
            stepNumber,
            wetPerformed: parseBoolean(getStepText('./bhrgtcom:wetPerformed')),
            swellObserved: parseBoolean(getStepText('./bhrgtcom:swellObserved')),
            strainPoint24hours: parseFloat(getStepText('./bhrgtcom:strainPoint24hours')),
            stepType: getStepText('./bhrgtcom:stepType'),
            verticalStress: parseFloat(getStepText('./bhrgtcom:verticalStress')),
            heightChangeDuringSettlement
        };
    }, adapter, namespaces);
    return {
        determinationProcedure: getText('./bhrgtcom:determinationProcedure'),
        determinationMethod: getText('./bhrgtcom:determinationMethod'),
        ringDiameter: parseFloat(getText('./bhrgtcom:ringDiameter')),
        sampleMoistness: getText('./bhrgtcom:sampleMoistness'),
        filterPaperUsed: parseBoolean(getText('./bhrgtcom:filterPaperUsed')),
        temperature: parseFloat(getText('./bhrgtcom:temperature')),
        wallFrictionCorrectionMethod: getText('./bhrgtcom:wallFrictionCorrectionMethod'),
        apparatusDeformationApplied: parseBoolean(getText('./bhrgtcom:apparatusDeformationApplied')),
        bearingFrictionCorrectionApplied: parseBoolean(getText('./bhrgtcom:bearingFrictionCorrectionApplied')),
        irregularResult: parseBoolean(getText('./bhrgtcom:irregularResult')),
        determinationSteps
    };
}
/**
 * Parse saturated permeability determination (Hydraulic conductivity test) from XML node
 */
function parseSaturatedPermeabilityDetermination(node, adapter, namespaces) {
    const detNode = findChildElement(node, './bhrgtcom:SaturatedPermeabilityDetermination', adapter, namespaces);
    if (!detNode) {
        return EMPTY_SATURATED_PERMEABILITY;
    }
    const getText = createXPathTextGetter(detNode, adapter, namespaces);
    const saturatedPermeabilityAtSpecificDensity = extractArray(detNode, './bhrgtcom:saturatedPermeabilityAtSpecificDensity', (_densityNode, getDensityText) => {
        const dryVolumetricMassDensity = parseFloat(getDensityText('./bhrgtcom:dryVolumetricMassDensity'));
        const saturatedPermeability = parseFloat(getDensityText('./bhrgtcom:saturatedPermeability'));
        return dryVolumetricMassDensity !== null || saturatedPermeability !== null
            ? { dryVolumetricMassDensity, saturatedPermeability }
            : null;
    }, adapter, namespaces);
    return {
        determinationProcedure: getText('./bhrgtcom:determinationProcedure'),
        determinationMethod: getText('./bhrgtcom:determinationMethod'),
        specimenMade: parseBoolean(getText('./bhrgtcom:specimenMade')),
        saturatedWithCO2: parseBoolean(getText('./bhrgtcom:saturatedWithCO2')),
        verticallyDetermined: parseBoolean(getText('./bhrgtcom:verticallyDetermined')),
        currentDownwards: parseBoolean(getText('./bhrgtcom:currentDownwards')),
        usedMedium: getText('./bhrgtcom:usedMedium'),
        waterDegassed: parseBoolean(getText('./bhrgtcom:waterDegassed')),
        temperature: parseFloat(getText('./bhrgtcom:temperature')),
        maximumGradient: parseFloat(getText('./bhrgtcom:maximumGradient')),
        saturatedPermeabilityAtSpecificDensity
    };
}
/**
 * Registry of all determination types to parse
 *
 * This configuration-driven approach eliminates the 94-line repetitive if-block
 * dispatch pattern. Each entry specifies the XPath to find the determination node,
 * the property name to set on the interval, and the parser function to call.
 */
const DETERMINATION_CONFIGS = [
    {
        xpath: './bhrgtcom:waterContentDetermination',
        propertyName: 'waterContentDetermination',
        parser: parseWaterContentDetermination
    },
    {
        xpath: './bhrgtcom:organicMatterContentDetermination',
        propertyName: 'organicMatterContentDetermination',
        parser: parseOrganicMatterContentDetermination
    },
    {
        xpath: './bhrgtcom:carbonateContentDetermination',
        propertyName: 'carbonateContentDetermination',
        parser: parseCarbonateContentDetermination
    },
    {
        xpath: './bhrgtcom:volumetricMassDensityDetermination',
        propertyName: 'volumetricMassDensityDetermination',
        parser: parseVolumetricMassDensityDetermination
    },
    {
        xpath: './bhrgtcom:volumetricMassDensityOfSolidsDetermination',
        propertyName: 'volumetricMassDensityOfSolidsDetermination',
        parser: parseVolumetricMassDensityOfSolidsDetermination
    },
    {
        xpath: './bhrgtcom:particleSizeDistributionDetermination',
        propertyName: 'particleSizeDistributionDetermination',
        parser: parseParticleSizeDistributionDetermination
    },
    {
        xpath: './bhrgtcom:consistencyLimitsDetermination',
        propertyName: 'consistencyLimitsDetermination',
        parser: parseConsistencyLimitsDetermination
    },
    {
        xpath: './bhrgtcom:settlementCharacteristicsDetermination',
        propertyName: 'settlementCharacteristicsDetermination',
        parser: parseSettlementCharacteristicsDetermination
    },
    {
        xpath: './bhrgtcom:saturatedPermeabilityDetermination',
        propertyName: 'saturatedPermeabilityDetermination',
        parser: parseSaturatedPermeabilityDetermination
    }
];
/**
 * Process borehole sample analysis data from boreholeSampleAnalysis element
 *
 * Extracts laboratory analysis data including all investigated intervals
 * and their determination results.
 *
 * @param value - Not used (we work with the node directly)
 * @param context - Resolver context containing the XML node and adapter
 * @returns BoreholeSampleAnalysis object or undefined if not present
 */
export function processBoreholeSampleAnalysis(_value, context) {
    const { element, adapter, namespaces } = context;
    // Find the boreholeSampleAnalysis element
    const analysisNode = adapter.evaluateXPath(element, './dsbhrgt:boreholeSampleAnalysis', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
    if (!analysisNode) {
        return undefined;
    }
    // Extract analysis metadata
    const analysisReportDateNode = adapter.evaluateXPath(analysisNode, './bhrgtcom:analysisReportDate', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
    const analysisProcedureNode = adapter.evaluateXPath(analysisNode, './bhrgtcom:analysisProcedure', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
    let analysisReportDate = null;
    if (analysisReportDateNode?.textContent) {
        const dateStr = analysisReportDateNode.textContent.trim();
        try {
            analysisReportDate = new Date(dateStr);
        }
        catch {
            analysisReportDate = null;
        }
    }
    const analysisProcedure = analysisProcedureNode?.textContent?.trim() || null;
    // Find all investigated intervals
    const intervalNodes = adapter.evaluateXPathAll(analysisNode, './bhrgtcom:investigatedInterval', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
    const investigatedIntervals = [];
    for (const intervalNode of intervalNodes) {
        const getText = (xpath) => {
            const n = adapter.evaluateXPath(intervalNode, xpath, (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
            return getTextContent(n);
        };
        // Extract depth boundaries
        const beginDepth = parseFloat(getText('./bhrgtcom:beginDepth')) ?? 0;
        const endDepth = parseFloat(getText('./bhrgtcom:endDepth')) ?? 0;
        // Extract metadata
        const sampleQuality = getText('./bhrgtcom:sampleQuality');
        const analysisType = getText('./bhrgtcom:analysisType');
        // Extract determination flags
        const waterContentDetermined = parseBoolean(getText('./bhrgtcom:waterContentDetermined'));
        const organicMatterContentDetermined = parseBoolean(getText('./bhrgtcom:organicMatterContentDetermined'));
        const carbonateContentDetermined = parseBoolean(getText('./bhrgtcom:carbonateContentDetermined'));
        const volumetricMassDensityDetermined = parseBoolean(getText('./bhrgtcom:volumetricMassDensityDetermined'));
        const volumetricMassDensitySolidsDetermined = parseBoolean(getText('./bhrgtcom:volumetricMassDensitySolidsDetermined'));
        const described = parseBoolean(getText('./bhrgtcom:described'));
        const interval = {
            beginDepth,
            endDepth,
            sampleQuality,
            analysisType,
            waterContentDetermined,
            organicMatterContentDetermined,
            carbonateContentDetermined,
            volumetricMassDensityDetermined,
            volumetricMassDensitySolidsDetermined,
            described
        };
        // Parse all determinations using registry pattern
        // This replaces 94 lines of repetitive if-blocks with a simple loop
        const nsResolver = createNamespaceResolver(namespaces);
        for (const config of DETERMINATION_CONFIGS) {
            const detNode = adapter.evaluateXPath(intervalNode, config.xpath, nsResolver);
            if (detNode) {
                interval[config.propertyName] = config.parser(detNode, adapter, namespaces);
            }
        }
        investigatedIntervals.push(interval);
    }
    return {
        analysisReportDate,
        analysisProcedure,
        investigatedIntervals
    };
}
//# sourceMappingURL=bore-resolvers.js.map