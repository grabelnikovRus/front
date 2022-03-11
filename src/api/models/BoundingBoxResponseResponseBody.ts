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
  BoundingBoxResponseResponseBodyBoundingBox,
  BoundingBoxResponseResponseBodyBoundingBoxFromJSON,
  BoundingBoxResponseResponseBodyBoundingBoxFromJSONTyped,
  BoundingBoxResponseResponseBodyBoundingBoxToJSON,
} from './'

/**
 *
 * @export
 * @interface BoundingBoxResponseResponseBody
 */
export interface BoundingBoxResponseResponseBody {
  /**
   *
   * @type {BoundingBoxResponseResponseBodyBoundingBox}
   * @memberof BoundingBoxResponseResponseBody
   */
  boundingBox: BoundingBoxResponseResponseBodyBoundingBox
}

export function BoundingBoxResponseResponseBodyFromJSON(
  json: any,
): BoundingBoxResponseResponseBody {
  return BoundingBoxResponseResponseBodyFromJSONTyped(json, false)
}

export function BoundingBoxResponseResponseBodyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): BoundingBoxResponseResponseBody {
  if (json === undefined || json === null) {
    return json
  }
  return {
    boundingBox: BoundingBoxResponseResponseBodyBoundingBoxFromJSON(json['boundingBox']),
  }
}

export function BoundingBoxResponseResponseBodyToJSON(
  value?: BoundingBoxResponseResponseBody | null,
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    boundingBox: BoundingBoxResponseResponseBodyBoundingBoxToJSON(value.boundingBox),
  }
}