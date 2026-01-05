/**
 * Type definitions for BRO/XML parser
 */
/**
 * Namespace mapping (prefix -> URI)
 */
export type Namespaces = Record<string, string>;
/**
 * XML adapter interface for cross-runtime compatibility
 */
export interface XMLAdapter {
    parseXML(xmlText: string): Document;
    evaluateXPath(doc: Document | Node, query: string, namespaceResolver: (prefix: string | null) => string | null): Node | null;
    evaluateXPathAll(doc: Document | Node, query: string, namespaceResolver: (prefix: string | null) => string | null): Array<Node>;
}
/**
 * Context passed to resolver functions
 */
export interface ResolverContext {
    node: Node;
    element: Node;
    namespaces: Namespaces;
    adapter: XMLAdapter;
}
/**
 * Resolver function type
 */
export type ResolverFunction = (value: string | null, context: ResolverContext) => unknown;
/**
 * Schema field definition
 */
export interface SchemaField {
    xpath: string;
    resolver?: ResolverFunction;
    attribute?: string;
    required?: boolean;
}
/**
 * Schema definition (field name -> field config)
 */
export type Schema = Record<string, SchemaField>;
/**
 * BRO quality regime
 *
 * IMBRO: Strict regime for new data (all mandatory fields required)
 * IMBRO/A: Relaxed regime for historical/legacy data (allows missing fields)
 */
export type QualityRegime = 'IMBRO' | 'IMBRO/A';
/**
 * Geographic location with coordinates and EPSG code
 */
export interface Location {
    x: number;
    y: number;
    epsg: string;
}
/**
 * CPT measurement row (dynamic fields based on parameters)
 */
export interface CPTMeasurement {
    penetrationLength: number;
    depth?: number;
    elapsedTime?: number;
    coneResistance: number | null;
    correctedConeResistance?: number | null;
    netConeResistance?: number | null;
    localFriction?: number | null;
    frictionRatio?: number | null;
    porePressureU1?: number | null;
    porePressureU2?: number | null;
    porePressureU3?: number | null;
    poreRatio?: number | null;
    inclinationX?: number | null;
    inclinationY?: number | null;
    inclinationEW?: number | null;
    inclinationNS?: number | null;
    inclinationResultant?: number | null;
    magneticFieldStrengthX?: number | null;
    magneticFieldStrengthY?: number | null;
    magneticFieldStrengthZ?: number | null;
    magneticFieldStrengthTotal?: number | null;
    magneticInclination?: number | null;
    magneticDeclination?: number | null;
    electricalConductivity?: number | null;
    temperature?: number | null;
}
/**
 * Complete CPT data (metadata + measurements)
 */
export interface CPTData {
    bro_id: string | null;
    /**
     * User-defined identifier (not parsed from XML)
     *
     * Useful for tracking data that doesn't have a bro_id yet,
     * such as during data collection or before BRO registration.
     *
     * @example
     * ```typescript
     * const cpt = parser.parseCPT(xmlString);
     * cpt.alias = "Site A - Test 1";
     * ```
     */
    alias?: string;
    /**
     * BRO quality regime
     *
     * - IMBRO: Strict regime (all mandatory fields required)
     * - IMBRO/A: Relaxed regime for historical data (allows missing fields)
     */
    quality_regime: QualityRegime | null;
    research_report_date: Date | null;
    delivered_location: Location | null;
    standardized_location: Location | null;
    delivered_vertical_position_offset: number | null;
    delivered_vertical_position_datum: string | null;
    delivered_vertical_position_reference_point: string | null;
    cpt_standard: string | null;
    dissipationtest_performed: boolean | null;
    quality_class: number | null;
    predrilled_depth: number | null;
    final_depth: number | null;
    groundwater_level: number | null;
    cpt_description: string | null;
    cpt_type: string | null;
    cone_surface_area: number | null;
    cone_diameter: number | null;
    cone_surface_quotient: number | null;
    cone_to_friction_sleeve_distance: number | null;
    cone_to_friction_sleeve_surface_area: number | null;
    cone_to_friction_sleeve_surface_quotient: number | null;
    zlm_cone_resistance_before: number | null;
    zlm_cone_resistance_after: number | null;
    zlm_inclination_ew_before: number | null;
    zlm_inclination_ew_after: number | null;
    zlm_inclination_ns_before: number | null;
    zlm_inclination_ns_after: number | null;
    zlm_inclination_resultant_before: number | null;
    zlm_inclination_resultant_after: number | null;
    zlm_local_friction_before: number | null;
    zlm_local_friction_after: number | null;
    zlm_pore_pressure_u1_before: number | null;
    zlm_pore_pressure_u2_before: number | null;
    zlm_pore_pressure_u3_before: number | null;
    zlm_pore_pressure_u1_after: number | null;
    zlm_pore_pressure_u2_after: number | null;
    zlm_pore_pressure_u3_after: number | null;
    data: Array<CPTMeasurement>;
}
/**
 * Bore layer data
 */
export interface BoreLayer {
    upperBoundary: number;
    lowerBoundary: number;
    geotechnicalSoilName: string;
    color?: string;
    dispersedInhomogeneity?: boolean | null;
    organicMatterContentClass?: string | null;
    sandMedianClass?: string | null;
}
/**
 * Complete Bore data (metadata + layers)
 *
 * Note: BoreData represents BHR-GT-BMB (Boormonsterbeschrijving - visual/textural description)
 * For laboratory analysis data, see the optional `analysis` field (BHR-GT-BMA)
 */
export interface BoreData {
    bro_id: string | null;
    /**
     * User-defined identifier (not parsed from XML)
     *
     * Useful for tracking data that doesn't have a bro_id yet,
     * such as during data collection or before BRO registration.
     *
     * @example
     * ```typescript
     * const bore = parser.parseBore(xmlString);
     * bore.alias = "Borehole 7 - North Field";
     * ```
     */
    alias?: string;
    /**
     * BRO quality regime
     *
     * - IMBRO: Strict regime (all mandatory fields required)
     * - IMBRO/A: Relaxed regime for historical data (allows missing fields)
     */
    quality_regime: QualityRegime | null;
    research_report_date: Date | null;
    delivered_location: Location | null;
    standardized_location: Location | null;
    delivered_vertical_position_offset: number | null;
    delivered_vertical_position_datum: string | null;
    delivered_vertical_position_reference_point: string | null;
    description_procedure: string | null;
    groundwater_level: number | null;
    bore_rock_reached: boolean | null;
    final_bore_depth: number | null;
    final_sample_depth: number | null;
    bore_hole_completed: boolean | null;
    data: Array<BoreLayer>;
    analysis?: BoreholeSampleAnalysis;
}
/**
 * BHR-G (Geological Borehole) layer data
 */
export interface BHRGLayer {
    upperBoundary: number;
    lowerBoundary: number;
    soilNameNEN5104: string;
    color?: string;
    anthropogenic?: string | null;
    rooted?: string | null;
    organicMatterContentClassNEN5104?: string | null;
    gravelContentClass?: string | null;
    carbonateContentClass?: string | null;
    sandMedianClass?: string | null;
}
/**
 * Complete BHR-G (Geological Borehole) data (metadata + layers)
 */
export interface BHRGData {
    bro_id: string | null;
    /**
     * User-defined identifier (not parsed from XML)
     */
    alias?: string;
    /**
     * BRO quality regime
     *
     * - IMBRO: Strict regime (all mandatory fields required)
     * - IMBRO/A: Relaxed regime for historical data (allows missing fields)
     */
    quality_regime: QualityRegime | null;
    research_report_date: Date | null;
    delivered_location: Location | null;
    standardized_location: Location | null;
    delivered_vertical_position_offset: number | null;
    delivered_vertical_position_datum: string | null;
    delivered_vertical_position_reference_point: string | null;
    description_procedure: string | null;
    bore_rock_reached: boolean | null;
    final_bore_depth: number | null;
    final_sample_depth: number | null;
    bore_hole_completed: string | null;
    data: Array<BHRGLayer>;
}
/**
 * BHR-GT-BMA (Borehole Sample Analysis) - Laboratory Determinations
 */
/**
 * Water content determination result
 */
export interface WaterContentDetermination {
    determinationProcedure: string | null;
    determinationMethod: string | null;
    sampleMoistness: string | null;
    removedMaterial: string | null;
    waterContent: number | null;
    dryingTemperature: string | null;
    dryingPeriod: string | null;
    saltCorrectionMethod: string | null;
}
/**
 * Volumetric mass density (bulk density) determination result
 */
export interface VolumetricMassDensityDetermination {
    determinationProcedure: string | null;
    determinationMethod: string | null;
    sampleMoistness: string | null;
    volumetricMassDensity: number | null;
}
/**
 * Organic matter content determination result
 */
export interface OrganicMatterContentDetermination {
    determinationProcedure: string | null;
    determinationMethod: string | null;
    removedMaterial: string | null;
    organicMatterContent: number | null;
}
/**
 * Carbonate content determination result
 */
export interface CarbonateContentDetermination {
    determinationProcedure: string | null;
    determinationMethod: string | null;
    removedMaterial: string | null;
    carbonateContent: number | null;
}
/**
 * Volumetric mass density of solids determination result
 */
export interface VolumetricMassDensityOfSolidsDetermination {
    determinationProcedure: string | null;
    determinationMethod: string | null;
    liquidUsed: string | null;
    volumetricMassDensityOfSolids: number | null;
}
/**
 * Particle size distribution determination result
 * Contains detailed grain size fractions
 */
export interface ParticleSizeDistributionDetermination {
    determinationProcedure: string | null;
    determinationMethod: string | null;
    fractionDistribution: string | null;
    dispersionMethod: string | null;
    removedMaterial: string | null;
    equivalentMassDeterminationMethod: string | null;
    equivalentMass: number | null;
    fractionSmaller63um: number | null;
    fractionLarger63um: number | null;
    fraction0to2um?: number | null;
    fraction2to4um?: number | null;
    fraction4to8um?: number | null;
    fraction8to16um?: number | null;
    fraction16to32um?: number | null;
    fraction32to50um?: number | null;
    fraction50to63um?: number | null;
    fraction63to90um?: number | null;
    fraction90to125um?: number | null;
    fraction125to180um?: number | null;
    fraction180to250um?: number | null;
    fraction250to355um?: number | null;
    fraction355to500um?: number | null;
    fraction500to710um?: number | null;
    fraction710to1000um?: number | null;
    fraction1000to1400um?: number | null;
    fraction1400umto2mm?: number | null;
    fraction2to4mm?: number | null;
    fraction4to8mm?: number | null;
    fraction8to16mm?: number | null;
    fraction16to31_5mm?: number | null;
    fraction31_5to63mm?: number | null;
    fractionLarger63mm?: number | null;
}
/**
 * Plasticity data point for Atterberg limits test
 * Used to construct the plasticity curve (Casagrande)
 */
export interface PlasticityAtSpecificWaterContent {
    waterContent: number;
    numberOfFalls: number;
}
/**
 * Consistency limits determination (Atterberg limits)
 * Used to determine soil plasticity characteristics
 */
export interface ConsistencyLimitsDetermination {
    determinationProcedure: string | null;
    determinationMethod: string | null;
    fractionLarger500um: number | null;
    usedMedium: string | null;
    performanceIrregularity: string | null;
    liquidLimit: number | null;
    plasticLimit: number | null;
    plasticityIndex: number | null;
    plasticityAtSpecificWaterContent: Array<PlasticityAtSpecificWaterContent>;
}
/**
 * Height measurement at specific time during settlement test
 * Used to construct compression/consolidation curves
 */
export interface HeightAtSpecificTime {
    time: number;
    height: number;
}
/**
 * Single loading step in settlement characteristics test
 * Represents one stress increment in oedometer/consolidation test
 */
export interface SettlementDeterminationStep {
    stepNumber: number;
    wetPerformed: boolean | null;
    swellObserved: boolean | null;
    strainPoint24hours: number | null;
    stepType: string | null;
    verticalStress: number | null;
    heightChangeDuringSettlement: Array<HeightAtSpecificTime>;
}
/**
 * Settlement characteristics determination (oedometer/consolidation test)
 * Used to determine soil compressibility and consolidation behavior
 */
export interface SettlementCharacteristicsDetermination {
    determinationProcedure: string | null;
    determinationMethod: string | null;
    ringDiameter: number | null;
    sampleMoistness: string | null;
    filterPaperUsed: boolean | null;
    temperature: number | null;
    wallFrictionCorrectionMethod: string | null;
    apparatusDeformationApplied: boolean | null;
    bearingFrictionCorrectionApplied: boolean | null;
    irregularResult: boolean | null;
    determinationSteps: Array<SettlementDeterminationStep>;
}
/**
 * Permeability at specific density measurement
 */
export interface SaturatedPermeabilityAtSpecificDensity {
    dryVolumetricMassDensity: number | null;
    saturatedPermeability: number | null;
}
/**
 * Saturated permeability determination (hydraulic conductivity)
 * Used to determine water flow characteristics through soil
 */
export interface SaturatedPermeabilityDetermination {
    determinationProcedure: string | null;
    determinationMethod: string | null;
    specimenMade: boolean | null;
    saturatedWithCO2: boolean | null;
    verticallyDetermined: boolean | null;
    currentDownwards: boolean | null;
    usedMedium: string | null;
    waterDegassed: boolean | null;
    temperature: number | null;
    maximumGradient: number | null;
    saturatedPermeabilityAtSpecificDensity: Array<SaturatedPermeabilityAtSpecificDensity>;
}
/**
 * Investigated interval with laboratory determinations
 * Each interval represents a depth range with analysis results
 */
export interface InvestigatedInterval {
    beginDepth: number;
    endDepth: number;
    sampleQuality: string | null;
    analysisType: string | null;
    waterContentDetermined: boolean | null;
    organicMatterContentDetermined: boolean | null;
    carbonateContentDetermined: boolean | null;
    volumetricMassDensityDetermined: boolean | null;
    volumetricMassDensitySolidsDetermined: boolean | null;
    described: boolean | null;
    waterContentDetermination?: WaterContentDetermination;
    organicMatterContentDetermination?: OrganicMatterContentDetermination;
    carbonateContentDetermination?: CarbonateContentDetermination;
    volumetricMassDensityDetermination?: VolumetricMassDensityDetermination;
    volumetricMassDensityOfSolidsDetermination?: VolumetricMassDensityOfSolidsDetermination;
    particleSizeDistributionDetermination?: ParticleSizeDistributionDetermination;
    consistencyLimitsDetermination?: ConsistencyLimitsDetermination;
    settlementCharacteristicsDetermination?: SettlementCharacteristicsDetermination;
    saturatedPermeabilityDetermination?: SaturatedPermeabilityDetermination;
}
/**
 * Borehole sample analysis data (BHR-GT-BMA)
 * Contains laboratory test results for soil samples
 */
export interface BoreholeSampleAnalysis {
    analysisReportDate: Date | null;
    analysisProcedure: string | null;
    investigatedIntervals: Array<InvestigatedInterval>;
}
/**
 * Configuration for determination type parsing in registry pattern
 */
export interface DeterminationConfig<T> {
    xpath: string;
    propertyName: keyof InvestigatedInterval;
    parser: (node: Node, adapter: XMLAdapter, namespaces: Namespaces) => T;
}
/**
 * Parse error with context
 */
export declare class BROParseError extends Error {
    readonly code: string;
    readonly details: Record<string, unknown>;
    constructor(message: string, details: {
        code: string;
        [key: string]: unknown;
    });
}
//# sourceMappingURL=index.d.ts.map