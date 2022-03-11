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
  CoordsCheckerResponseResponseBody,
  CoordsCheckerResponseResponseBodyFromJSON,
  CoordsCheckerResponseResponseBodyFromJSONTyped,
  CoordsCheckerResponseResponseBodyToJSON,
} from './'

/**
 *
 * @export
 * @interface CoordsCheckerResponseResponse
 */
export interface CoordsCheckerResponseResponse {
  /**
   *
   * @type {CoordsCheckerResponseResponseBody}
   * @memberof CoordsCheckerResponseResponse
   */
  body: CoordsCheckerResponseResponseBody
  /**
   *
   * @type {Array<object>}
   * @memberof CoordsCheckerResponseResponse
   */
  errors: Array<object>
}

export function CoordsCheckerResponseResponseFromJSON(json: any): CoordsCheckerResponseResponse {
  return CoordsCheckerResponseResponseFromJSONTyped(json, false)
}

export function CoordsCheckerResponseResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CoordsCheckerResponseResponse {
  if (json === undefined || json === null) {
    return json
  }
  return {
    body: CoordsCheckerResponseResponseBodyFromJSON(json['body']),
    errors: json['errors'],
  }
}

export function CoordsCheckerResponseResponseToJSON(
  value?: CoordsCheckerResponseResponse | null,
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    body: CoordsCheckerResponseResponseBodyToJSON(value.body),
    errors: value.errors,
  }
}
