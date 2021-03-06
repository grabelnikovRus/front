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
  CatalogSelectNewOptions,
  CatalogSelectNewOptionsFromJSON,
  CatalogSelectNewOptionsFromJSONTyped,
  CatalogSelectNewOptionsToJSON,
  Validation,
  ValidationFromJSON,
  ValidationFromJSONTyped,
  ValidationToJSON,
} from './'

/**
 *
 * @export
 * @interface CatalogSelectNew
 */
export interface CatalogSelectNew {
  /**
   *
   * @type {string}
   * @memberof CatalogSelectNew
   */
  title: string
  /**
   *
   * @type {string}
   * @memberof CatalogSelectNew
   */
  type: CatalogSelectNewTypeEnum
  /**
   *
   * @type {boolean}
   * @memberof CatalogSelectNew
   */
  multiple?: boolean
  /**
   *
   * @type {Array<string>}
   * @memberof CatalogSelectNew
   */
  initial: Array<string> | null
  /**
   *
   * @type {Array<CatalogSelectNewOptions>}
   * @memberof CatalogSelectNew
   */
  options: Array<CatalogSelectNewOptions>
  /**
   *
   * @type {Validation}
   * @memberof CatalogSelectNew
   */
  validation: Validation
}

/**
 * @export
 * @enum {string}
 */
export enum CatalogSelectNewTypeEnum {
  Radio = 'radio',
  Checkbox = 'checkbox',
  Select = 'select',
}

export function CatalogSelectNewFromJSON(json: any): CatalogSelectNew {
  return CatalogSelectNewFromJSONTyped(json, false)
}

export function CatalogSelectNewFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CatalogSelectNew {
  if (json === undefined || json === null) {
    return json
  }
  return {
    title: json['title'],
    type: json['type'],
    multiple: !exists(json, 'multiple') ? undefined : json['multiple'],
    initial: json['initial'],
    options: (json['options'] as Array<any>).map(CatalogSelectNewOptionsFromJSON),
    validation: ValidationFromJSON(json['validation']),
  }
}

export function CatalogSelectNewToJSON(value?: CatalogSelectNew | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    title: value.title,
    type: value.type,
    multiple: value.multiple,
    initial: value.initial,
    options: (value.options as Array<any>).map(CatalogSelectNewOptionsToJSON),
    validation: ValidationToJSON(value.validation),
  }
}
