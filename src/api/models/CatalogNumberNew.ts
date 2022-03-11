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
 * @interface CatalogNumberNew
 */
export interface CatalogNumberNew {
  /**
   *
   * @type {string}
   * @memberof CatalogNumberNew
   */
  title: string
  /**
   *
   * @type {string}
   * @memberof CatalogNumberNew
   */
  placeholder: string | null
  /**
   *
   * @type {string}
   * @memberof CatalogNumberNew
   */
  type: CatalogNumberNewTypeEnum
  /**
   *
   * @type {number}
   * @memberof CatalogNumberNew
   */
  initial: number | null
  /**
   *
   * @type {Validation}
   * @memberof CatalogNumberNew
   */
  validation: Validation
}

/**
 * @export
 * @enum {string}
 */
export enum CatalogNumberNewTypeEnum {
  Number = 'number',
}

export function CatalogNumberNewFromJSON(json: any): CatalogNumberNew {
  return CatalogNumberNewFromJSONTyped(json, false)
}

export function CatalogNumberNewFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CatalogNumberNew {
  if (json === undefined || json === null) {
    return json
  }
  return {
    title: json['title'],
    placeholder: json['placeholder'],
    type: json['type'],
    initial: json['initial'],
    validation: ValidationFromJSON(json['validation']),
  }
}

export function CatalogNumberNewToJSON(value?: CatalogNumberNew | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    title: value.title,
    placeholder: value.placeholder,
    type: value.type,
    initial: value.initial,
    validation: ValidationToJSON(value.validation),
  }
}
