/**
 * Utility functions for bore determination parsing
 *
 * Shared helpers to eliminate duplication across bore resolver functions
 */
import type { XMLAdapter, Namespaces } from '../types/index.js';
export type XPathTextGetter = (xpath: string) => string | null;
export type NamespaceResolver = (prefix: string | null) => string | null;
/**
 * Creates a reusable namespace resolver function
 *
 * @param namespaces - Namespace mappings
 * @returns Resolver function for XPath namespace prefixes
 */
export declare function createNamespaceResolver(namespaces: Namespaces): NamespaceResolver;
/**
 * Helper to get text content from a node
 *
 * @param node - XML node or null
 * @returns Trimmed text content or null
 */
export declare function getTextContent(node: Node | null): string | null;
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
export declare function createXPathTextGetter(contextNode: Node, adapter: XMLAdapter, namespaces: Namespaces): XPathTextGetter;
/**
 * Find a child element using XPath
 *
 * @param parentNode - Parent node to search from
 * @param childPath - XPath to child element
 * @param adapter - XML adapter
 * @param namespaces - Namespace mappings
 * @returns Child node or null if not found
 */
export declare function findChildElement(parentNode: Node, childPath: string, adapter: XMLAdapter, namespaces: Namespaces): Node | null;
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
export declare function extractArray<T>(contextNode: Node, xpathPattern: string, mapFn: (node: Node, getText: XPathTextGetter) => T | null, adapter: XMLAdapter, namespaces: Namespaces): Array<T>;
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
export declare function parseCSVPairs<T>(csvText: string | null | undefined, parsePair: (key: string, value: string) => T | null): Array<T>;
//# sourceMappingURL=bore-resolver-utils.d.ts.map