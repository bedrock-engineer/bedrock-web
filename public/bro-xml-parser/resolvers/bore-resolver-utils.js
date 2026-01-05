/**
 * Utility functions for bore determination parsing
 *
 * Shared helpers to eliminate duplication across bore resolver functions
 */
/**
 * Creates a reusable namespace resolver function
 *
 * @param namespaces - Namespace mappings
 * @returns Resolver function for XPath namespace prefixes
 */
export function createNamespaceResolver(namespaces) {
    return (prefix) => prefix ? (namespaces[prefix] ?? null) : null;
}
/**
 * Helper to get text content from a node
 *
 * @param node - XML node or null
 * @returns Trimmed text content or null
 */
export function getTextContent(node) {
    const trimmed = node?.textContent?.trim();
    return trimmed || null;
}
/**
 * Creates an XPath text getter bound to a specific context node
 *
 * This eliminates the need to create identical getText helper functions
 * in every determination parser.
 *
 * @param contextNode - Node to query from
 * @param adapter - XML adapter
 * @param namespaces - Namespace mappings
 * @returns Function that gets text from XPath expressions
 *
 * @example
 * ```typescript
 * const getText = createXPathTextGetter(detNode, adapter, namespaces);
 * const procedure = getText('./bhrgtcom:determinationProcedure');
 * const method = getText('./bhrgtcom:determinationMethod');
 * ```
 */
export function createXPathTextGetter(contextNode, adapter, namespaces) {
    const nsResolver = createNamespaceResolver(namespaces);
    return (xpath) => {
        const node = adapter.evaluateXPath(contextNode, xpath, nsResolver);
        return getTextContent(node);
    };
}
/**
 * Find a child element using XPath
 *
 * @param parentNode - Parent node to search from
 * @param childPath - XPath to child element
 * @param adapter - XML adapter
 * @param namespaces - Namespace mappings
 * @returns Child node or null if not found
 */
export function findChildElement(parentNode, childPath, adapter, namespaces) {
    const nsResolver = createNamespaceResolver(namespaces);
    return adapter.evaluateXPath(parentNode, childPath, nsResolver);
}
/**
 * Extract an array of typed objects from XPath results
 *
 * This generic function consolidates the repetitive pattern of:
 * 1. Finding nodes with evaluateXPathAll
 * 2. Looping through nodes
 * 3. Extracting data from each node
 * 4. Filtering out nulls
 *
 * @param contextNode - Node to query from
 * @param xpathPattern - XPath expression to find array elements
 * @param mapFn - Function to transform each node into typed object
 * @param adapter - XML adapter
 * @param namespaces - Namespace mappings
 * @returns Array of non-null results
 *
 * @example
 * ```typescript
 * const points = extractArray(
 *   detNode,
 *   './bhrgtcom:plasticityAtSpecificWaterContent',
 *   (node, getText) => ({
 *     waterContent: parseFloat(getText('./bhrgtcom:waterContent')),
 *     numberOfFalls: parseInt(getText('./bhrgtcom:numberOfFalls') || '0', 10)
 *   }),
 *   adapter,
 *   namespaces
 * );
 * ```
 */
export function extractArray(contextNode, xpathPattern, mapFn, adapter, namespaces) {
    const nsResolver = createNamespaceResolver(namespaces);
    const nodes = adapter.evaluateXPathAll(contextNode, xpathPattern, nsResolver);
    const results = [];
    for (const node of nodes) {
        const getText = createXPathTextGetter(node, adapter, namespaces);
        const result = mapFn(node, getText);
        if (result !== null) {
            results.push(result);
        }
    }
    return results;
}
/**
 * Parse space-separated comma-delimited pairs from CSV text
 *
 * Handles the common pattern of "value1,value2 value3,value4" format
 * used in settlement characteristics and other time-series data.
 *
 * @param csvText - Space-separated "key,value" pairs
 * @param parsePair - Function to parse a single key,value pair
 * @returns Array of parsed objects
 *
 * @example
 * ```typescript
 * const timeHeightPairs = parseCSVPairs(
 *   csvNode.textContent,
 *   (timeStr, heightStr) => {
 *     const time = parseFloat(timeStr);
 *     const height = parseFloat(heightStr);
 *     return !isNaN(time) && !isNaN(height)
 *       ? { time, height }
 *       : null;
 *   }
 * );
 * ```
 */
export function parseCSVPairs(csvText, parsePair) {
    if (!csvText) {
        return [];
    }
    const trimmed = csvText.trim();
    if (trimmed.length === 0) {
        return [];
    }
    const pairs = trimmed.split(/\s+/);
    const results = [];
    for (const pair of pairs) {
        const [keyStr, valueStr] = pair.split(",");
        if (keyStr && valueStr) {
            const result = parsePair(keyStr, valueStr);
            if (result !== null) {
                results.push(result);
            }
        }
    }
    return results;
}
//# sourceMappingURL=bore-resolver-utils.js.map