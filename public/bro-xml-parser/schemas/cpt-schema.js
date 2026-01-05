/**
 * CPT (Cone Penetration Test) schema definition
 *
 * Defines 42 metadata fields for CPT data.
 * Each field specifies:
 * - xpath: location in XML document
 * - resolver: function to convert/parse value (optional)
 * - attribute: which property to extract (optional, defaults to textContent)
 * - required: whether field is mandatory (optional, defaults to false)
 */
import * as typeResolvers from '../resolvers/type-resolvers.js';
import * as gmlResolvers from '../resolvers/gml-resolvers.js';
import * as measurementResolvers from '../resolvers/measurement-resolver.js';
export const CPT_SCHEMA = {
    // === Core Identification ===
    bro_id: {
        xpath: 'brocom:broId'
    },
    quality_regime: {
        xpath: 'brocom:qualityRegime'
    },
    research_report_date: {
        xpath: './dscpt:researchReportDate/brocom:date',
        resolver: typeResolvers.parseDate
    },
    cpt_standard: {
        xpath: './dscpt:cptStandard'
    },
    // === Location ===
    delivered_location: {
        xpath: './dscpt:deliveredLocation/cptcommon:location',
        resolver: gmlResolvers.parseGMLLocation
    },
    standardized_location: {
        xpath: './dscpt:standardizedLocation/brocom:location',
        resolver: gmlResolvers.parseGMLLocation
    },
    // === Vertical Position ===
    delivered_vertical_position_offset: {
        xpath: './dscpt:deliveredVerticalPosition/cptcommon:offset',
        resolver: typeResolvers.parseFloat,
    },
    delivered_vertical_position_datum: {
        xpath: './dscpt:deliveredVerticalPosition/cptcommon:verticalDatum',
        resolver: typeResolvers.lowerText,
    },
    delivered_vertical_position_reference_point: {
        xpath: './dscpt:deliveredVerticalPosition/cptcommon:localVerticalReferencePoint',
        resolver: typeResolvers.lowerText,
    },
    // === Test Metadata ===
    dissipationtest_performed: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:dissipationTestPerformed',
        resolver: typeResolvers.parseBoolean,
    },
    quality_class: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:qualityClass',
        resolver: typeResolvers.parseQualityClass,
    },
    groundwater_level: {
        xpath: './dscpt:additionalInvestigation/cptcommon:groundwaterLevel',
        resolver: typeResolvers.parseFloat,
    },
    predrilled_depth: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:trajectory/cptcommon:predrilledDepth',
        resolver: typeResolvers.parseFloat,
    },
    final_depth: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:trajectory/cptcommon:finalDepth',
        resolver: typeResolvers.parseFloat,
    },
    // === Equipment Specifications ===
    cpt_description: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:description',
    },
    cpt_type: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:conePenetrometerType',
    },
    cone_surface_area: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:coneSurfaceArea',
        resolver: typeResolvers.parseInt,
    },
    cone_diameter: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:coneDiameter',
        resolver: typeResolvers.parseInt,
    },
    cone_surface_quotient: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:coneSurfaceQuotient',
        resolver: typeResolvers.parseFloat,
    },
    cone_to_friction_sleeve_distance: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:coneToFrictionSleeveDistance',
        resolver: typeResolvers.parseInt,
    },
    cone_to_friction_sleeve_surface_area: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:frictionSleeveSurfaceArea',
        resolver: typeResolvers.parseInt,
    },
    cone_to_friction_sleeve_surface_quotient: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:frictionSleeveSurfaceQuotient',
        resolver: typeResolvers.parseFloat,
    },
    // === Zero-Load Measurements (Equipment Calibration) ===
    // Cone Resistance
    zlm_cone_resistance_before: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:coneResistanceBefore',
        resolver: typeResolvers.parseFloat,
    },
    zlm_cone_resistance_after: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:coneResistanceAfter',
        resolver: typeResolvers.parseFloat,
    },
    // Inclination East-West
    zlm_inclination_ew_before: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:inclinationEWBefore',
        resolver: typeResolvers.parseInt,
    },
    zlm_inclination_ew_after: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:inclinationEWAfter',
        resolver: typeResolvers.parseInt,
    },
    // Inclination North-South
    zlm_inclination_ns_before: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:inclinationNSBefore',
        resolver: typeResolvers.parseInt,
    },
    zlm_inclination_ns_after: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:inclinationNSAfter',
        resolver: typeResolvers.parseInt,
    },
    // Inclination Resultant
    zlm_inclination_resultant_before: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:inclinationResultantBefore',
        resolver: typeResolvers.parseInt,
    },
    zlm_inclination_resultant_after: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:inclinationResultantAfter',
        resolver: typeResolvers.parseInt,
    },
    // Local Friction
    zlm_local_friction_before: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:localFrictionBefore',
        resolver: typeResolvers.parseFloat,
    },
    zlm_local_friction_after: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:localFrictionAfter',
        resolver: typeResolvers.parseFloat,
    },
    // Pore Pressure U1
    zlm_pore_pressure_u1_before: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:porePressureU1Before',
        resolver: typeResolvers.parseFloat,
    },
    zlm_pore_pressure_u1_after: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:porePressureU1After',
        resolver: typeResolvers.parseFloat,
    },
    // Pore Pressure U2
    zlm_pore_pressure_u2_before: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:porePressureU2Before',
        resolver: typeResolvers.parseFloat,
    },
    zlm_pore_pressure_u2_after: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:porePressureU2After',
        resolver: typeResolvers.parseFloat,
    },
    // Pore Pressure U3
    zlm_pore_pressure_u3_before: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:porePressureU3Before',
        resolver: typeResolvers.parseFloat,
    },
    zlm_pore_pressure_u3_after: {
        xpath: './dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:porePressureU3After',
        resolver: typeResolvers.parseFloat,
    },
    // === Measurement Data ===
    data: {
        xpath: './dscpt:conePenetrometerSurvey',
        resolver: measurementResolvers.processCPTResult
    }
};
//# sourceMappingURL=cpt-schema.js.map