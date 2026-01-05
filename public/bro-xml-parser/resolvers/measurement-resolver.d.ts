/**
 * Measurement data resolver for parsing embedded CSV in CPT XML
 */
import type { ResolverContext, CPTMeasurement } from '../types/index.js';
/**
 * Parse CPT measurement data from embedded CSV
 *
 * The CPT XML contains measurement data as CSV text embedded in the values element.
 * The structure is:
 * - parameters: defines which columns are included (ja/nee flags)
 * - encoding: defines CSV delimiters
 * - values: actual CSV data with all columns (we select only "ja" columns)
 */
export declare function processCPTResult(_value: string | null, context: ResolverContext): Array<CPTMeasurement>;
//# sourceMappingURL=measurement-resolver.d.ts.map