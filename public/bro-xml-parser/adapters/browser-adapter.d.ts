/**
 * Browser runtime adapter using native DOM APIs
 *
 * Uses DOMParser for XML parsing and native XPath evaluation.
 *
 * Note: Unlike NodeXMLAdapter, this adapter doesn't need to pre-populate
 * namespace prefixes because the browser's native document.evaluate()
 * accepts a namespace resolver function directly and queries it on-demand.
 */
import type { XMLAdapter } from '../types/index.js';
export declare class BrowserXMLAdapter implements XMLAdapter {
    private parser;
    constructor();
    parseXML(xmlText: string): Document;
    evaluateXPath(doc: Document | Node, query: string, namespaceResolver: (prefix: string | null) => string | null): Node | null;
    evaluateXPathAll(doc: Document | Node, query: string, namespaceResolver: (prefix: string | null) => string | null): Array<Node>;
}
//# sourceMappingURL=browser-adapter.d.ts.map