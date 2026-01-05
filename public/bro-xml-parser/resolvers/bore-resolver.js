/**
 * Bore data resolver for parsing layer information from BRO/XML
 */
import { BROParseError } from '../types/index.js';
import { parseBoolean } from './type-resolvers.js';
/**
 * Clean string by removing non-word characters
 */
function cleanString(value) {
    if (!value || typeof value !== 'string') {
        return 'unknown';
    }
    return value.replace(/\W+/g, '');
}
/**
 * Parse bore layer data from descriptiveBoreholeLog
 *
 * The bore XML contains layer information with:
 * - upperBoundary/lowerBoundary: depth in meters
 * - soil: geotechnical soil classification and properties
 */
export function processBoreResult(_value, context) {
    const { element, adapter, namespaces } = context;
    // Find all layers
    const layerNodes = adapter.evaluateXPathAll(element, './/bhrgtcom:layer', (prefix) => (prefix ? namespaces[prefix] ?? null : null));
    if (layerNodes.length === 0) {
        throw new BROParseError('No bore layers found', {
            code: 'NO_LAYERS',
            xpath: './/bhrgtcom:layer'
        });
    }
    const layers = [];
    for (const layerNode of layerNodes) {
        try {
            const nsResolver = (prefix) => (prefix ? namespaces[prefix] ?? null : null);
            // Get upper and lower boundaries (required)
            const upperBoundaryNode = adapter.evaluateXPath(layerNode, './bhrgtcom:upperBoundary', nsResolver);
            const lowerBoundaryNode = adapter.evaluateXPath(layerNode, './bhrgtcom:lowerBoundary', nsResolver);
            if (!upperBoundaryNode || !lowerBoundaryNode) {
                continue;
            }
            const upperBoundary = parseFloat(upperBoundaryNode.textContent ?? '');
            const lowerBoundary = parseFloat(lowerBoundaryNode.textContent ?? '');
            if (Number.isNaN(upperBoundary) || Number.isNaN(lowerBoundary)) {
                continue;
            }
            // Get soil information
            const soilNode = adapter.evaluateXPath(layerNode, './bhrgtcom:soil', nsResolver);
            let geotechnicalSoilName = 'niet gedefinieerd';
            let color;
            let dispersedInhomogeneity = null;
            let organicMatterContentClass = null;
            let sandMedianClass = null;
            if (soilNode) {
                // Try to get ISO soil name first
                const geotechnicalSoilNameNode = adapter.evaluateXPath(soilNode, './bhrgtcom:geotechnicalSoilName', nsResolver);
                if (geotechnicalSoilNameNode?.textContent) {
                    const cleanedName = cleanString(geotechnicalSoilNameNode.textContent);
                    if (cleanedName !== 'unknown') {
                        geotechnicalSoilName = cleanedName;
                    }
                }
                // If ISO name not found, try NEN 5104 name
                if (geotechnicalSoilName === 'niet gedefinieerd') {
                    const soilNameNENNode = adapter.evaluateXPath(soilNode, './bhrgtcom:soilNameNEN5104', nsResolver);
                    if (soilNameNENNode?.textContent) {
                        const cleanedName = cleanString(soilNameNENNode.textContent);
                        if (cleanedName !== 'unknown') {
                            geotechnicalSoilName = cleanedName;
                        }
                    }
                }
                const colorNode = adapter.evaluateXPath(soilNode, './bhrgtcom:colour', nsResolver);
                if (colorNode?.textContent) {
                    color = cleanString(colorNode.textContent);
                }
                // Get dispersed inhomogeneity
                const dispersedInhomogeneityNode = adapter.evaluateXPath(soilNode, './bhrgtcom:dispersedInhomogeneity', nsResolver);
                if (dispersedInhomogeneityNode?.textContent) {
                    dispersedInhomogeneity = parseBoolean(dispersedInhomogeneityNode.textContent);
                }
                // Get organic matter content class
                const organicMatterNode = adapter.evaluateXPath(soilNode, './bhrgtcom:organicMatterContentClass', nsResolver);
                if (organicMatterNode?.textContent) {
                    organicMatterContentClass = cleanString(organicMatterNode.textContent);
                }
                // Get sand median class
                const sandMedianNode = adapter.evaluateXPath(soilNode, './bhrgtcom:sandMedianClass', nsResolver);
                if (sandMedianNode?.textContent) {
                    sandMedianClass = cleanString(sandMedianNode.textContent);
                }
            }
            // Create layer object
            const layer = {
                upperBoundary,
                lowerBoundary,
                geotechnicalSoilName
            };
            // Add optional properties only if they exist
            if (color !== undefined) {
                layer.color = color;
            }
            if (dispersedInhomogeneity !== null) {
                layer.dispersedInhomogeneity = dispersedInhomogeneity;
            }
            if (organicMatterContentClass !== null) {
                layer.organicMatterContentClass = organicMatterContentClass;
            }
            if (sandMedianClass !== null) {
                layer.sandMedianClass = sandMedianClass;
            }
            layers.push(layer);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            const layerIndex = layers.length + 1;
            console.warn(`Failed to parse bore layer ${layerIndex}:`, message, error);
            // Continue parsing other layers, but will throw if ALL layers fail
            continue;
        }
    }
    if (layers.length === 0) {
        throw new BROParseError('No valid bore layers could be parsed', {
            code: 'NO_VALID_LAYERS',
            layerCount: layerNodes.length
        });
    }
    // Sort layers by upper boundary
    return layers.sort((a, b) => a.upperBoundary - b.upperBoundary);
}
/**
 * Parse bored interval data from boring element
 *
 * Extracts information about drilling techniques and diameters used at different depths
 */
export function processBoredIntervals(_value, context) {
    const { element, adapter, namespaces } = context;
    const intervalNodes = adapter.evaluateXPathAll(element, './/bhrgtcom:boredInterval', (prefix) => (prefix ? namespaces[prefix] ?? null : null));
    const intervals = [];
    for (const intervalNode of intervalNodes) {
        const nsResolver = (prefix) => (prefix ? namespaces[prefix] ?? null : null);
        const beginDepthNode = adapter.evaluateXPath(intervalNode, './bhrgtcom:beginDepth', nsResolver);
        const endDepthNode = adapter.evaluateXPath(intervalNode, './bhrgtcom:endDepth', nsResolver);
        const techniqueNode = adapter.evaluateXPath(intervalNode, './bhrgtcom:boringTechnique', nsResolver);
        const diameterNode = adapter.evaluateXPath(intervalNode, './bhrgtcom:boredDiameter', nsResolver);
        const interval = {};
        if (beginDepthNode?.textContent) {
            interval['beginDepth'] = parseFloat(beginDepthNode.textContent);
        }
        if (endDepthNode?.textContent) {
            interval['endDepth'] = parseFloat(endDepthNode.textContent);
        }
        if (techniqueNode?.textContent) {
            interval['boringTechnique'] = cleanString(techniqueNode.textContent);
        }
        if (diameterNode?.textContent) {
            interval['boredDiameter'] = parseFloat(diameterNode.textContent);
        }
        if (Object.keys(interval).length > 0) {
            intervals.push(interval);
        }
    }
    return intervals;
}
/**
 * Parse sampled interval data from boring element
 *
 * Extracts information about sampling methods, quality, and equipment used
 */
export function processSampledIntervals(_value, context) {
    const { element, adapter, namespaces } = context;
    const intervalNodes = adapter.evaluateXPathAll(element, './/bhrgtcom:sampledInterval', (prefix) => (prefix ? namespaces[prefix] ?? null : null));
    const intervals = [];
    for (const intervalNode of intervalNodes) {
        const nsResolver = (prefix) => (prefix ? namespaces[prefix] ?? null : null);
        const interval = {};
        // Depth information
        const beginDepthNode = adapter.evaluateXPath(intervalNode, './bhrgtcom:beginDepth', nsResolver);
        const endDepthNode = adapter.evaluateXPath(intervalNode, './bhrgtcom:endDepth', nsResolver);
        if (beginDepthNode?.textContent) {
            interval['beginDepth'] = parseFloat(beginDepthNode.textContent);
        }
        if (endDepthNode?.textContent) {
            interval['endDepth'] = parseFloat(endDepthNode.textContent);
        }
        // Sampling method and quality
        const preTreatmentNode = adapter.evaluateXPath(intervalNode, './bhrgtcom:preTreatment', nsResolver);
        const methodNode = adapter.evaluateXPath(intervalNode, './bhrgtcom:samplingMethod', nsResolver);
        const qualityNode = adapter.evaluateXPath(intervalNode, './bhrgtcom:samplingQuality', nsResolver);
        const orientatedNode = adapter.evaluateXPath(intervalNode, './bhrgtcom:orientatedSampled', nsResolver);
        if (preTreatmentNode?.textContent) {
            interval['preTreatment'] = cleanString(preTreatmentNode.textContent);
        }
        if (methodNode?.textContent) {
            interval['samplingMethod'] = cleanString(methodNode.textContent);
        }
        if (qualityNode?.textContent) {
            interval['samplingQuality'] = cleanString(qualityNode.textContent);
        }
        if (orientatedNode?.textContent) {
            interval['orientatedSampled'] = parseBoolean(orientatedNode.textContent);
        }
        // Sampler equipment details
        const samplerNode = adapter.evaluateXPath(intervalNode, './bhrgtcom:sampler', nsResolver);
        if (samplerNode) {
            const samplerInfo = {};
            const samplerTypeNode = adapter.evaluateXPath(samplerNode, './bhrgtcom:samplerType', nsResolver);
            const containerDiameterNode = adapter.evaluateXPath(samplerNode, './bhrgtcom:sampleContainerDiameter', nsResolver);
            const containerLengthNode = adapter.evaluateXPath(samplerNode, './bhrgtcom:sampleContainerLength', nsResolver);
            if (samplerTypeNode?.textContent) {
                samplerInfo['samplerType'] = cleanString(samplerTypeNode.textContent);
            }
            if (containerDiameterNode?.textContent) {
                samplerInfo['containerDiameter'] = parseFloat(containerDiameterNode.textContent);
            }
            if (containerLengthNode?.textContent) {
                samplerInfo['containerLength'] = parseFloat(containerLengthNode.textContent);
            }
            if (Object.keys(samplerInfo).length > 0) {
                interval['sampler'] = samplerInfo;
            }
        }
        if (Object.keys(interval).length > 0) {
            intervals.push(interval);
        }
    }
    return intervals;
}
//# sourceMappingURL=bore-resolver.js.map