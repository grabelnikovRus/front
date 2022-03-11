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
import { Validation, ValidationFromJSON, ValidationFromJSONTyped, ValidationToJSON } from './'

/**
 *
 * @export
 * @interface CatalogCheckbox
 */
export interface CatalogCheckbox {
  /**
   *
   * @type {string}
   * @memberof CatalogCheckbox
   */
  type: CatalogCheckboxTypeEnum
  /**
   *
   * @type {boolean}
   * @memberof CatalogCheckbox
   */
  initial: boolean | null
  /**
   *
   * @type {Validation}
   * @memberof CatalogCheckbox
   */
  validation: Validation
}

/**
 * @export
 * @enum {string}
 */
export enum CatalogCheckboxTypeEnum {
  Checkbox = 'checkbox',
}

export function CatalogCheckboxFromJSON(json: any): CatalogCheckbox {
  return CatalogCheckboxFromJSONTyped(json, false)
}

export function CatalogCheckboxFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CatalogCheckbox {
  if (json === undefined || json === null) {
    return json
  }
  return {
    type: json['type'],
    initial: json['initial'],
    validation: ValidationFromJSON(json['validation']),
  }
}

export function CatalogCheckboxToJSON(value?: CatalogCheckbox | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    type: value.type,
    initial: value.initial,
    validation: ValidationToJSON(value.validation),
  }
}
