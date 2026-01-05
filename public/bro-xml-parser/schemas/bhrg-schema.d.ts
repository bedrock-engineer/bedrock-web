/**
 * BHR-G (Geological Borehole) schema definition
 *
 * Defines metadata fields for BHR-G data following BRO structure.
 * Each field specifies:
 * - xpath: location in XML document
 * - resolver: function to convert/parse value (optional)
 * - attribute: which property to extract (optional, defaults to textContent)
 * - required: whether field is mandatory (optional, defaults to false)
 */
import type { Schema } from '../types/index.js';
export declare const BHRG_SCHEMA: Schema;
//# sourceMappingURL=bhrg-schema.d.ts.map