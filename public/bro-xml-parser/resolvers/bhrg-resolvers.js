/**
 * Resolvers for BHR-G (Geological Borehole) data
 *
 * Functions to parse and convert BHR-G-specific data structures
 */
/**
 * Process BHR-G layer data from descriptiveBoreholeLog element
 *
 * Extracts all layer elements and converts them to BHRGLayer objects.
 * Each layer contains depth boundaries and soil classification information
 * based on NEN5104 standard (geological classification).
 *
 * @param _value - Not used (we work with the node directly)
 * @param context - Resolver context containing the XML node and adapter
 * @returns Array of BHRGLayer objects
 */
export function processBHRGLayerData(_value, context) {
    const { node, adapter, namespaces } = context;
    // Find all layer elements
    const layerNodes = adapter.evaluateXPathAll(node, './/bhrgcom:layer/bhrgcom:Layer', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
    const layers = [];
    for (const layerNode of layerNodes) {
        // Extract required fields
        const upperBoundaryNode = adapter.evaluateXPath(layerNode, './bhrgcom:upperBoundary', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const lowerBoundaryNode = adapter.evaluateXPath(layerNode, './bhrgcom:lowerBoundary', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const soilNameNode = adapter.evaluateXPath(layerNode, './bhrgcom:soil/bhrgcom:soilNameNEN5104', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        // Skip layer if required fields are missing
        if (!upperBoundaryNode || !lowerBoundaryNode || !soilNameNode) {
            continue;
        }
        const upperBoundary = parseFloat(upperBoundaryNode.textContent || '0');
        const lowerBoundary = parseFloat(lowerBoundaryNode.textContent || '0');
        const soilNameNEN5104 = (soilNameNode.textContent || '').trim();
        // Extract optional fields
        const colorNode = adapter.evaluateXPath(layerNode, './bhrgcom:soil/bhrgcom:colour', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const anthropogenicNode = adapter.evaluateXPath(layerNode, './bhrgcom:anthropogenic', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const rootedNode = adapter.evaluateXPath(layerNode, './bhrgcom:rooted', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const organicMatterNode = adapter.evaluateXPath(layerNode, './bhrgcom:soil/bhrgcom:organicMatterContentClassNEN5104', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const gravelContentNode = adapter.evaluateXPath(layerNode, './bhrgcom:soil/bhrgcom:gravelContentClass', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const carbonateContentNode = adapter.evaluateXPath(layerNode, './bhrgcom:soil/bhrgcom:carbonateContentClass', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const sandMedianNode = adapter.evaluateXPath(layerNode, './bhrgcom:soil/bhrgcom:sandMedianClass', (prefix) => (prefix ? (namespaces[prefix] ?? null) : null));
        const layer = {
            upperBoundary,
            lowerBoundary,
            soilNameNEN5104,
            ...(colorNode?.textContent && { color: colorNode.textContent.trim() }),
            anthropogenic: anthropogenicNode?.textContent?.trim() || null,
            rooted: rootedNode?.textContent?.trim() || null,
            organicMatterContentClassNEN5104: organicMatterNode?.textContent?.trim() || null,
            gravelContentClass: gravelContentNode?.textContent?.trim() || null,
            carbonateContentClass: carbonateContentNode?.textContent?.trim() || null,
            sandMedianClass: sandMedianNode?.textContent?.trim() || null,
        };
        layers.push(layer);
    }
    return layers;
}
//# sourceMappingURL=bhrg-resolvers.js.map