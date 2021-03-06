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
 * @interface WidgetFieldOptionsMultipleOptions
 */
export interface WidgetFieldOptionsMultipleOptions {
  /**
   *
   * @type {string}
   * @memberof WidgetFieldOptionsMultipleOptions
   */
  value: string
  /**
   *
   * @type {string}
   * @memberof WidgetFieldOptionsMultipleOptions
   */
  caption: string
  /**
   *
   * @type {string}
   * @memberof WidgetFieldOptionsMultipleOptions
   */
  icon: string
}

export function WidgetFieldOptionsMultipleOptionsFromJSON(
  json: any,
): WidgetFieldOptionsMultipleOptions {
  return WidgetFieldOptionsMultipleOptionsFromJSONTyped(json, false)
}

export function WidgetFieldOptionsMultipleOptionsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): WidgetFieldOptionsMultipleOptions {
  if (json === undefined || json === null) {
    return json
  }
  return {
    value: json['value'],
    caption: json['caption'],
    icon: json['icon'],
  }
}

export function WidgetFieldOptionsMultipleOptionsToJSON(
  value?: WidgetFieldOptionsMultipleOptions | null,
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    value: value.value,
    caption: value.caption,
    icon: value.icon,
  }
}
