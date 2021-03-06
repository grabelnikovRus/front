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
 * @interface CityPhones
 */
export interface CityPhones {
  /**
   *
   * @type {number}
   * @memberof CityPhones
   */
  id?: number
  /**
   *
   * @type {string}
   * @memberof CityPhones
   */
  number?: string
}

export function CityPhonesFromJSON(json: any): CityPhones {
  return CityPhonesFromJSONTyped(json, false)
}

export function CityPhonesFromJSONTyped(json: any, ignoreDiscriminator: boolean): CityPhones {
  if (json === undefined || json === null) {
    return json
  }
  return {
    id: !exists(json, 'id') ? undefined : json['id'],
    number: !exists(json, 'number') ? undefined : json['number'],
  }
}

export function CityPhonesToJSON(value?: CityPhones | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    id: value.id,
    number: value.number,
  }
}
