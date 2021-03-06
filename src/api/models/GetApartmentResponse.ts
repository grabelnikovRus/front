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
  GetApartmentResponseResponse,
  GetApartmentResponseResponseFromJSON,
  GetApartmentResponseResponseFromJSONTyped,
  GetApartmentResponseResponseToJSON,
} from './'

/**
 *
 * @export
 * @interface GetApartmentResponse
 */
export interface GetApartmentResponse {
  /**
   *
   * @type {GetApartmentResponseResponse}
   * @memberof GetApartmentResponse
   */
  response: GetApartmentResponseResponse
}

export function GetApartmentResponseFromJSON(json: any): GetApartmentResponse {
  return GetApartmentResponseFromJSONTyped(json, false)
}

export function GetApartmentResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): GetApartmentResponse {
  if (json === undefined || json === null) {
    return json
  }
  return {
    response: GetApartmentResponseResponseFromJSON(json['response']),
  }
}

export function GetApartmentResponseToJSON(value?: GetApartmentResponse | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    response: GetApartmentResponseResponseToJSON(value.response),
  }
}
