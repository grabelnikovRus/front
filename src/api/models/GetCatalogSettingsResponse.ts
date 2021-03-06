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
  GetCatalogSettingsResponseResponse,
  GetCatalogSettingsResponseResponseFromJSON,
  GetCatalogSettingsResponseResponseFromJSONTyped,
  GetCatalogSettingsResponseResponseToJSON,
} from './'

/**
 *
 * @export
 * @interface GetCatalogSettingsResponse
 */
export interface GetCatalogSettingsResponse {
  /**
   *
   * @type {GetCatalogSettingsResponseResponse}
   * @memberof GetCatalogSettingsResponse
   */
  response?: GetCatalogSettingsResponseResponse
}

export function GetCatalogSettingsResponseFromJSON(json: any): GetCatalogSettingsResponse {
  return GetCatalogSettingsResponseFromJSONTyped(json, false)
}

export function GetCatalogSettingsResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): GetCatalogSettingsResponse {
  if (json === undefined || json === null) {
    return json
  }
  return {
    response: !exists(json, 'response')
      ? undefined
      : GetCatalogSettingsResponseResponseFromJSON(json['response']),
  }
}

export function GetCatalogSettingsResponseToJSON(value?: GetCatalogSettingsResponse | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    response: GetCatalogSettingsResponseResponseToJSON(value.response),
  }
}
