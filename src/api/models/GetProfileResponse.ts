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
  GetProfileResponseResponse,
  GetProfileResponseResponseFromJSON,
  GetProfileResponseResponseFromJSONTyped,
  GetProfileResponseResponseToJSON,
} from './'

/**
 *
 * @export
 * @interface GetProfileResponse
 */
export interface GetProfileResponse {
  /**
   *
   * @type {GetProfileResponseResponse}
   * @memberof GetProfileResponse
   */
  response?: GetProfileResponseResponse
}

export function GetProfileResponseFromJSON(json: any): GetProfileResponse {
  return GetProfileResponseFromJSONTyped(json, false)
}

export function GetProfileResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): GetProfileResponse {
  if (json === undefined || json === null) {
    return json
  }
  return {
    response: !exists(json, 'response')
      ? undefined
      : GetProfileResponseResponseFromJSON(json['response']),
  }
}

export function GetProfileResponseToJSON(value?: GetProfileResponse | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    response: GetProfileResponseResponseToJSON(value.response),
  }
}
