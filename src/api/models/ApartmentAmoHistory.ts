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
  ApartmentAmoHistoryAmoHistory,
  ApartmentAmoHistoryAmoHistoryFromJSON,
  ApartmentAmoHistoryAmoHistoryFromJSONTyped,
  ApartmentAmoHistoryAmoHistoryToJSON,
} from './'

/**
 *
 * @export
 * @interface ApartmentAmoHistory
 */
export interface ApartmentAmoHistory {
  /**
   *
   * @type {ApartmentAmoHistoryAmoHistory}
   * @memberof ApartmentAmoHistory
   */
  amoHistory: ApartmentAmoHistoryAmoHistory | null
}

export function ApartmentAmoHistoryFromJSON(json: any): ApartmentAmoHistory {
  return ApartmentAmoHistoryFromJSONTyped(json, false)
}

export function ApartmentAmoHistoryFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ApartmentAmoHistory {
  if (json === undefined || json === null) {
    return json
  }
  return {
    amoHistory: ApartmentAmoHistoryAmoHistoryFromJSON(json['amoHistory']),
  }
}

export function ApartmentAmoHistoryToJSON(value?: ApartmentAmoHistory | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    amoHistory: ApartmentAmoHistoryAmoHistoryToJSON(value.amoHistory),
  }
}
