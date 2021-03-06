/* tslint:disable */
/* eslint-disable */
/**
 * SITE API
 * API сайта ПИК Брокер
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime'
import {
  ApartmentsFilters,
  ApartmentsFiltersFromJSON,
  ApartmentsFiltersFromJSONTyped,
  ApartmentsFiltersToJSON,
} from './'

/**
 *
 * @export
 * @interface ApartmentMapRequestV2
 */
export interface ApartmentMapRequestV2 {
  /**
   *
   * @type {ApartmentsFilters}
   * @memberof ApartmentMapRequestV2
   */
  filter: ApartmentsFilters
}

export function ApartmentMapRequestV2FromJSON(json: any): ApartmentMapRequestV2 {
  return ApartmentMapRequestV2FromJSONTyped(json, false)
}

export function ApartmentMapRequestV2FromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ApartmentMapRequestV2 {
  if (json === undefined || json === null) {
    return json
  }
  return {
    filter: ApartmentsFiltersFromJSON(json['filter']),
  }
}

export function ApartmentMapRequestV2ToJSON(value?: ApartmentMapRequestV2 | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    filter: ApartmentsFiltersToJSON(value.filter),
  }
}
