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
 * @interface CatalogCheckboxGroupOptions
 */
export interface CatalogCheckboxGroupOptions {
  /**
   *
   * @type {string}
   * @memberof CatalogCheckboxGroupOptions
   */
  value: string | null
  /**
   *
   * @type {string}
   * @memberof CatalogCheckboxGroupOptions
   */
  caption: string
  /**
   *
   * @type {string}
   * @memberof CatalogCheckboxGroupOptions
   */
  icon: string | null
}

export function CatalogCheckboxGroupOptionsFromJSON(json: any): CatalogCheckboxGroupOptions {
  return CatalogCheckboxGroupOptionsFromJSONTyped(json, false)
}

export function CatalogCheckboxGroupOptionsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CatalogCheckboxGroupOptions {
  if (json === undefined || json === null) {
    return json
  }
  return {
    value: json['value'],
    caption: json['caption'],
    icon: json['icon'],
  }
}

export function CatalogCheckboxGroupOptionsToJSON(
  value?: CatalogCheckboxGroupOptions | null,
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
