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
  BoundingBoxResponseResponse,
  BoundingBoxResponseResponseFromJSON,
  BoundingBoxResponseResponseFromJSONTyped,
  BoundingBoxResponseResponseToJSON,
} from './'

/**
 *
 * @export
 * @interface BoundingBoxResponse
 */
export interface BoundingBoxResponse {
  /**
   *
   * @type {BoundingBoxResponseResponse}
   * @memberof BoundingBoxResponse
   */
  response: BoundingBoxResponseResponse
}

export function BoundingBoxResponseFromJSON(json: any): BoundingBoxResponse {
  return BoundingBoxResponseFromJSONTyped(json, false)
}

export function BoundingBoxResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): BoundingBoxResponse {
  if (json === undefined || json === null) {
    return json
  }
  return {
    response: BoundingBoxResponseResponseFromJSON(json['response']),
  }
}

export function BoundingBoxResponseToJSON(value?: BoundingBoxResponse | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    response: BoundingBoxResponseResponseToJSON(value.response),
  }
}