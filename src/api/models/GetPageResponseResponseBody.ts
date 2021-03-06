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
  PageInfo,
  PageInfoFromJSON,
  PageInfoFromJSONTyped,
  PageInfoToJSON,
  Widget,
  WidgetFromJSON,
  WidgetFromJSONTyped,
  WidgetToJSON,
} from './'

/**
 *
 * @export
 * @interface GetPageResponseResponseBody
 */
export interface GetPageResponseResponseBody {
  /**
   *
   * @type {PageInfo}
   * @memberof GetPageResponseResponseBody
   */
  page: PageInfo
  /**
   *
   * @type {Array<Widget>}
   * @memberof GetPageResponseResponseBody
   */
  widgets: Array<Widget>
}

export function GetPageResponseResponseBodyFromJSON(json: any): GetPageResponseResponseBody {
  return GetPageResponseResponseBodyFromJSONTyped(json, false)
}

export function GetPageResponseResponseBodyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): GetPageResponseResponseBody {
  if (json === undefined || json === null) {
    return json
  }
  return {
    page: PageInfoFromJSON(json['page']),
    widgets: (json['widgets'] as Array<any>).map(WidgetFromJSON),
  }
}

export function GetPageResponseResponseBodyToJSON(
  value?: GetPageResponseResponseBody | null,
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    page: PageInfoToJSON(value.page),
    widgets: (value.widgets as Array<any>).map(WidgetToJSON),
  }
}
