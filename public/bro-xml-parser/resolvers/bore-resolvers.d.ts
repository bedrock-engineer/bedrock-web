/**
 * Resolvers for BHR-GT (Geotechnical Borehole) data
 *
 * Functions to parse and convert bore-specific data structures
 */
import type { ResolverContext, BoreLayer, BoreholeSampleAnalysis } from '../types/index.js';
/**
 * Process bore layer data from descriptiveBoreholeLog element
 *
 * Extracts all layer elements and converts them to BoreLayer objects.
 * Each layer contains depth boundaries and soil classification information.
 *
 * @param value - Not used (we work with the node directly)
 * @param context - Resolver context containing the XML node and adapter
 * @returns Array of BoreLayer objects
 */
export declare function processBoreLayerData(_value: string | null, context: ResolverContext): Array<BoreLayer>;
/**
 * Process borehole sample analysis data from boreholeSampleAnalysis element
 *
 * Extracts laboratory analysis data including all investigated intervals
 * and their determination results.
 *
 * @param value - Not used (we work with the node directly)
 * @param context - Resolver context containing the XML node and adapter
 * @returns BoreholeSampleAnalysis object or undefined if not present
 */
export declare function processBoreholeSampleAnalysis(_value: string | null, context: ResolverContext): BoreholeSampleAnalysis | undefined;
//# sourceMappingURL=bore-resolvers.d.ts.map