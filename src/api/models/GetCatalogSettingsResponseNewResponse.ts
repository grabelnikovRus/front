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
  CatalogSettingsNew,
  CatalogSettingsNewFromJSON,
  CatalogSettingsNewFromJSONTyped,
  CatalogSettingsNewToJSON,
} from './'

/**
 *
 * @export
 * @interface GetCatalogSettingsResponseNewResponse
 */
export interface GetCatalogSettingsResponseNewResponse {
  /**
   *
   * @type {CatalogSettingsNew}
   * @memberof GetCatalogSettingsResponseNewResponse
   */
  body: CatalogSettingsNew
  /**
   *
   * @type {Array<object>}
   * @memberof GetCatalogSettingsResponseNewResponse
   */
  errors: Array<object>
}

export function GetCatalogSettingsResponseNewResponseFromJSON(
  json: any,
): GetCatalogSettingsResponseNewResponse {
  return GetCatalogSettingsResponseNewResponseFromJSONTyped(json, false)
}

export function GetCatalogSettingsResponseNewResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): GetCatalogSettingsResponseNewResponse {
  if (json === undefined || json === null) {
    return json
  }
  return {
    body: CatalogSettingsNewFromJSON(json['body']),
    errors: json['errors'],
  }
}

export function GetCatalogSettingsResponseNewResponseToJSON(
  value?: GetCatalogSettingsResponseNewResponse | null,
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    body: CatalogSettingsNewToJSON(value.body),
    errors: value.errors,
  }
}
