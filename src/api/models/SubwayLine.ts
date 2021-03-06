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
/**
 *
 * @export
 * @interface SubwayLine
 */
export interface SubwayLine {
  /**
   *
   * @type {string}
   * @memberof SubwayLine
   */
  uuid: string
  /**
   *
   * @type {string}
   * @memberof SubwayLine
   */
  name: string
  /**
   *
   * @type {string}
   * @memberof SubwayLine
   */
  color: string
}

export function SubwayLineFromJSON(json: any): SubwayLine {
  return SubwayLineFromJSONTyped(json, false)
}

export function SubwayLineFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubwayLine {
  if (json === undefined || json === null) {
    return json
  }
  return {
    uuid: json['uuid'],
    name: json['name'],
    color: json['color'],
  }
}

export function SubwayLineToJSON(value?: SubwayLine | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    uuid: value.uuid,
    name: value.name,
    color: value.color,
  }
}
