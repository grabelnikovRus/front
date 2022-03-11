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
/**
 *
 * @export
 * @interface ApartmentsFiltersToponym
 */
export interface ApartmentsFiltersToponym {
  /**
   *
   * @type {string}
   * @memberof ApartmentsFiltersToponym
   */
  kind: string
  /**
   *
   * @type {string}
   * @memberof ApartmentsFiltersToponym
   */
  name: string
}

export function ApartmentsFiltersToponymFromJSON(json: any): ApartmentsFiltersToponym {
  return ApartmentsFiltersToponymFromJSONTyped(json, false)
}

export function ApartmentsFiltersToponymFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ApartmentsFiltersToponym {
  if (json === undefined || json === null) {
    return json
  }
  return {
    kind: json['kind'],
    name: json['name'],
  }
}

export function ApartmentsFiltersToponymToJSON(value?: ApartmentsFiltersToponym | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    kind: value.kind,
    name: value.name,
  }
}