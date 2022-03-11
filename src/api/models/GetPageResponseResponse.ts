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
  GetPageResponseResponseBody,
  GetPageResponseResponseBodyFromJSON,
  GetPageResponseResponseBodyFromJSONTyped,
  GetPageResponseResponseBodyToJSON,
} from './'

/**
 *
 * @export
 * @interface GetPageResponseResponse
 */
export interface GetPageResponseResponse {
  /**
   *
   * @type {GetPageResponseResponseBody}
   * @memberof GetPageResponseResponse
   */
  body: GetPageResponseResponseBody | null
  /**
   *
   * @type {Array<object>}
   * @memberof GetPageResponseResponse
   */
  errors: Array<object>
}

export function GetPageResponseResponseFromJSON(json: any): GetPageResponseResponse {
  return GetPageResponseResponseFromJSONTyped(json, false)
}

export function GetPageResponseResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): GetPageResponseResponse {
  if (json === undefined || json === null) {
    return json
  }
  return {
    body: GetPageResponseResponseBodyFromJSON(json['body']),
    errors: json['errors'],
  }
}

export function GetPageResponseResponseToJSON(value?: GetPageResponseResponse | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    body: GetPageResponseResponseBodyToJSON(value.body),
    errors: value.errors,
  }
}