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
  GetMenuResponseResponse,
  GetMenuResponseResponseFromJSON,
  GetMenuResponseResponseFromJSONTyped,
  GetMenuResponseResponseToJSON,
} from './'

/**
 *
 * @export
 * @interface GetMenuResponse
 */
export interface GetMenuResponse {
  /**
   *
   * @type {GetMenuResponseResponse}
   * @memberof GetMenuResponse
   */
  response?: GetMenuResponseResponse
}

export function GetMenuResponseFromJSON(json: any): GetMenuResponse {
  return GetMenuResponseFromJSONTyped(json, false)
}

export function GetMenuResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): GetMenuResponse {
  if (json === undefined || json === null) {
    return json
  }
  return {
    response: !exists(json, 'response')
      ? undefined
      : GetMenuResponseResponseFromJSON(json['response']),
  }
}

export function GetMenuResponseToJSON(value?: GetMenuResponse | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    response: GetMenuResponseResponseToJSON(value.response),
  }
}
