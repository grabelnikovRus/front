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
  BatchResponseResponseBody,
  BatchResponseResponseBodyFromJSON,
  BatchResponseResponseBodyFromJSONTyped,
  BatchResponseResponseBodyToJSON,
} from './'

/**
 *
 * @export
 * @interface BatchResponseResponse
 */
export interface BatchResponseResponse {
  /**
   *
   * @type {BatchResponseResponseBody}
   * @memberof BatchResponseResponse
   */
  body?: BatchResponseResponseBody | null
}

export function BatchResponseResponseFromJSON(json: any): BatchResponseResponse {
  return BatchResponseResponseFromJSONTyped(json, false)
}

export function BatchResponseResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): BatchResponseResponse {
  if (json === undefined || json === null) {
    return json
  }
  return {
    body: !exists(json, 'body') ? undefined : BatchResponseResponseBodyFromJSON(json['body']),
  }
}

export function BatchResponseResponseToJSON(value?: BatchResponseResponse | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    body: BatchResponseResponseBodyToJSON(value.body),
  }
}