/**
 * Browser runtime adapter using native DOM APIs
 *
 * Uses DOMParser for XML parsing and native XPath evaluation.
 *
 * Note: Unlike NodeXMLAdapter, this adapter doesn't need to pre-populate
 * namespace prefixes because the browser's native document.evaluate()
 * accepts a namespace resolver function directly and queries it on-demand.
 */
export class BrowserXMLAdapter {
    constructor() {
        this.parser = new DOMParser();
    }
    parseXML(xmlText) {
        const doc = this.parser.parseFromString(xmlText, 'text/xml');
        const parserError = doc.querySelector('parsererror');
        if (parserError) {
            throw new Error(`XML parsing failed: ${parserError.textContent}`);
        }
        return doc;
    }
    evaluateXPath(doc, query, namespaceResolver) {
        try {
            // Get the Document object (needed for .evaluate() method)
            // If we received a Document, use it directly
            // If we received a Node, get its ownerDocument
            const document = doc.nodeType === 9 ? doc : doc.ownerDocument;
            if (!document) {
                throw new Error('Cannot evaluate XPath: node has no ownerDocument');
            }
            const result = document.evaluate(query, doc, // Use original doc/node as context
            namespaceResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue;
        }
        catch (error) {
            // Distinguish between "not found" (returns null) and actual errors (throw)
            const message = error instanceof Error ? error.message : String(error);
            // If it's an XPath syntax error, throw with details
            if (message.includes('syntax') || message.includes('parse') || message.includes('INVALID_EXPRESSION_ERR')) {
                throw new Error(`XPath evaluation failed: ${message} (query: ${query})`);
            }
            // For other errors, log and return null (element might just not exist)
            console.warn(`XPath query returned no results: ${query}`, message);
            return null;
        }
    }
    evaluateXPathAll(doc, query, namespaceResolver) {
        try {
            // Get the Document object (needed for .evaluate() method)
            const document = doc.nodeType === 9 ? doc : doc.ownerDocument;
            if (!document) {
                throw new Error('Cannot evaluate XPath: node has no ownerDocument');
            }
            const result = document.evaluate(query, doc, // Use original doc/node as context
            namespaceResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            const nodes = [];
            for (let i = 0; i < result.snapshotLength; i++) {
                const node = result.snapshotItem(i);
                if (node) {
                    nodes.push(node);
                }
            }
            return nodes;
        }
        catch (error) {
            // Distinguish between "not found" (returns empty array) and actual errors (throw)
            const message = error instanceof Error ? error.message : String(error);
            // If it's an XPath syntax error, throw with details
            if (message.includes('syntax') || message.includes('parse') || message.includes('INVALID_EXPRESSION_ERR')) {
                throw new Error(`XPath evaluation failed: ${message} (query: ${query})`);
            }
            // For other errors, log and return empty array (elements might just not exist)
            console.warn(`XPath query returned no results: ${query}`, message);
            return [];
        }
    }
}
//# sourceMappingURL=browser-adapter.js.map