/**
 * Generic schema-driven XML parser
 *
 * This parser interprets a schema definition (field configurations)
 * and extracts data from XML documents accordingly.
 * The same parser works for any schema (CPT, Bore, etc.)
 */
import { BROParseError } from "../types/index.js";
export class SchemaParser {
    constructor(adapter, namespaces) {
        this.adapter = adapter;
        this.namespaces = namespaces;
    }
    /**
     * Parse XML document using provided schema
     *
     * @param doc - Parsed XML document
     * @param schema - Field definitions (field name -> config)
     * @param rootPath - Optional XPath to root element
     * @returns Parsed data object with fields from schema
     */
    parse(doc, schema, rootPath) {
        // Find root element if specified
        let rootElement = doc;
        if (rootPath) {
            // First try with namespace-aware search
            let root = this.adapter.evaluateXPath(doc, `.//${rootPath}/*[1]`, (prefix) => (prefix ? (this.namespaces[prefix] ?? null) : null));
            // If not found, try without namespace prefix
            root ?? (root = this.adapter.evaluateXPath(doc, `//*[local-name()='${rootPath}']/*[1]`, (prefix) => (prefix ? (this.namespaces[prefix] ?? null) : null)));
            if (!root) {
                throw new BROParseError(`Root element not found: ${rootPath}`, {
                    code: "MISSING_ROOT",
                    path: rootPath,
                });
            }
            rootElement = root;
        }
        const result = {};
        // Iterate through schema fields and extract each one
        for (const [fieldName, config] of Object.entries(schema)) {
            try {
                const value = this.extractField(rootElement, config);
                result[fieldName] = value;
            }
            catch (error) {
                // If field is required and extraction failed, throw error
                if (config.required) {
                    throw new BROParseError(`Required field missing or invalid: ${fieldName}`, {
                        code: "MISSING_REQUIRED_FIELD",
                        field: fieldName,
                        xpath: config.xpath,
                        originalError: error,
                    });
                }
                // Optional fields default to null on error
                result[fieldName] = null;
            }
        }
        return result;
    }
    /**
     * Extract single field using schema config
     *
     * @param element - Root element to search from
     * @param config - Field configuration (xpath, resolver, etc.)
     * @returns Extracted and resolved value
     */
    extractField(element, config) {
        // Find element using XPath
        const node = this.adapter.evaluateXPath(element, config.xpath, (prefix) => prefix ? (this.namespaces[prefix] ?? null) : null);
        if (!node) {
            return null;
        }
        // Get value from element (text content or attribute)
        let value;
        if (config.attribute) {
            // Get specific attribute (e.g., "textContent")
            // Use type assertion to access dynamic properties
            const element = node;
            const attrValue = element[config.attribute];
            value = typeof attrValue === "string" ? attrValue : null;
        }
        else {
            // Default to text content
            value = node.textContent;
        }
        if (config.resolver) {
            const context = {
                node,
                element,
                namespaces: this.namespaces,
                adapter: this.adapter,
            };
            return config.resolver(value, context);
        }
        return value;
    }
}
//# sourceMappingURL=schema-parser.js.map