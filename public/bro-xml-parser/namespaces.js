/**
 * BRO XML namespace definitions
 *
 * Centralizes all namespace URIs and prefixes used in BRO documents.
 */
/**
 * Standard BRO namespace URIs
 */
export const BRO_NAMESPACES = {
    // CPT namespaces
    dscpt: 'http://www.broservices.nl/xsd/dscpt/1.1',
    brocom: 'http://www.broservices.nl/xsd/brocommon/3.0',
    cptcommon: 'http://www.broservices.nl/xsd/cptcommon/1.1',
    // Bore namespaces (BHR-GT dsbhr-gt/2.1)
    dsbhrgt: 'http://www.broservices.nl/xsd/dsbhr-gt/2.1',
    bhrcommon: 'http://www.broservices.nl/xsd/bhrcommon/1.1',
    bhrgt: 'http://www.broservices.nl/xsd/bhrgt/1.1',
    bhrgtcom: 'http://www.broservices.nl/xsd/bhrgtcommon/2.1',
    // BHR-G namespaces (dsbhrg/3.1)
    dsbhrg: 'http://www.broservices.nl/xsd/dsbhrg/3.1',
    bhrgcom: 'http://www.broservices.nl/xsd/bhrgcommon/3.1',
    // Common geospatial namespaces
    gml: 'http://www.opengis.net/gml/3.2',
    swe: 'http://www.opengis.net/swe/2.0',
    om: 'http://www.opengis.net/om/2.0',
    sampling: 'http://www.opengis.net/sampling/2.0'
};
/**
 * List of known BRO namespace prefixes
 * Used by NodeXMLAdapter for pre-populating the xpath library's namespace map
 */
export const KNOWN_BRO_PREFIXES = [
    'dscpt',
    'brocom',
    'cptcommon',
    'gml',
    'swe',
    'om',
    'sampling',
    'dsbhr',
    'dsbhrgt',
    'bhrcommon',
    'bhrgt',
    'bhrgtcom',
    'dsbhrg',
    'bhrgcom'
];
//# sourceMappingURL=namespaces.js.map