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
  BatchResponseResponse,
  BatchResponseResponseFromJSON,
  BatchResponseResponseFromJSONTyped,
  BatchResponseResponseToJSON,
} from './'

/**
 *
 * @export
 * @interface BatchResponse
 */
export interface BatchResponse {
  /**
   *
   * @type {BatchResponseResponse}
   * @memberof BatchResponse
   */
  response?: BatchResponseResponse
}

export function BatchResponseFromJSON(json: any): BatchResponse {
  return BatchResponseFromJSONTyped(json, false)
}

export function BatchResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): BatchResponse {
  if (json === undefined || json === null) {
    return json
  }
  return {
    response: !exists(json, 'response')
      ? undefined
      : BatchResponseResponseFromJSON(json['response']),
  }
}

export function BatchResponseToJSON(value?: BatchResponse | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    response: BatchResponseResponseToJSON(value.response),
  }
}