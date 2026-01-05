/**
 * GML (Geography Markup Language) resolver functions
 */
/**
 * Parse GML Point location with coordinates and EPSG code
 *
 * Handles location elements like:
 * <location srsName="urn:ogc:def:crs:EPSG::28992">
 *   <gml:Point>
 *     <gml:pos>155000.0 463000.0</gml:pos>
 *   </gml:Point>
 * </location>
 */
export function parseGMLLocation(_value, context) {
    const { node, adapter, namespaces } = context;
    // Get EPSG code from srsName attribute
    // Type guard: ensure we have an Element with getAttribute
    if (!('getAttribute' in node) || typeof node.getAttribute !== 'function') {
        return null; // Not an element, can't have srsName
    }
    const element = node;
    const srsName = element.getAttribute('srsName');
    if (!srsName) {
        return null;
    }
    // Extract EPSG code from various formats:
    // "urn:ogc:def:crs:EPSG::28992" -> "EPSG:28992"
    // "EPSG:28992" -> "EPSG:28992"
    const epsgRegex = /EPSG::?(\d+)/i;
    const epsgMatch = epsgRegex.exec(srsName);
    const epsg = epsgMatch?.[1] ? `EPSG:${epsgMatch[1]}` : srsName;
    // Find gml:pos element (might be nested in gml:Point)
    const posNode = adapter.evaluateXPath(node, './/gml:pos', (prefix) => (prefix ? namespaces[prefix] ?? null : null));
    if (!posNode) {
        return null;
    }
    // Parse coordinates (space-separated: "x y" or "x y z")
    const posText = posNode.textContent?.trim();
    if (!posText) {
        return null;
    }
    const coords = posText.split(/\s+/).map(Number);
    if (coords.length < 2 || coords.some(isNaN)) {
        return null;
    }
    const x = coords[0];
    const y = coords[1];
    // These should always exist due to the length check above
    if (x === undefined || y === undefined) {
        return null;
    }
    return {
        x,
        y,
        epsg
    };
}
//# sourceMappingURL=gml-resolvers.js.map