/**
 * Resolvers for BHR-G (Geological Borehole) data
 *
 * Functions to parse and convert BHR-G-specific data structures
 */
import type { ResolverContext, BHRGLayer } from '../types/index.js';
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
export declare function processBHRGLayerData(_value: string | null, context: ResolverContext): Array<BHRGLayer>;
//# sourceMappingURL=bhrg-resolvers.d.ts.map