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
  GetApartmentLoanResponseResponseBody,
  GetApartmentLoanResponseResponseBodyFromJSON,
  GetApartmentLoanResponseResponseBodyFromJSONTyped,
  GetApartmentLoanResponseResponseBodyToJSON,
} from './'

/**
 *
 * @export
 * @interface GetApartmentLoanResponseResponse
 */
export interface GetApartmentLoanResponseResponse {
  /**
   *
   * @type {GetApartmentLoanResponseResponseBody}
   * @memberof GetApartmentLoanResponseResponse
   */
  body: GetApartmentLoanResponseResponseBody | null
  /**
   *
   * @type {Array<object>}
   * @memberof GetApartmentLoanResponseResponse
   */
  errors: Array<object>
}

export function GetApartmentLoanResponseResponseFromJSON(
  json: any,
): GetApartmentLoanResponseResponse {
  return GetApartmentLoanResponseResponseFromJSONTyped(json, false)
}

export function GetApartmentLoanResponseResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): GetApartmentLoanResponseResponse {
  if (json === undefined || json === null) {
    return json
  }
  return {
    body: GetApartmentLoanResponseResponseBodyFromJSON(json['body']),
    errors: json['errors'],
  }
}

export function GetApartmentLoanResponseResponseToJSON(
  value?: GetApartmentLoanResponseResponse | null,
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    body: GetApartmentLoanResponseResponseBodyToJSON(value.body),
    errors: value.errors,
  }
}
