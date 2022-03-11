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
 * @interface WidgetFieldImage
 */
export interface WidgetFieldImage {
  /**
   *
   * @type {string}
   * @memberof WidgetFieldImage
   */
  widgetType: string
  /**
   *
   * @type {string}
   * @memberof WidgetFieldImage
   */
  alt: string
  /**
   *
   * @type {string}
   * @memberof WidgetFieldImage
   */
  title: string
  /**
   *
   * @type {string}
   * @memberof WidgetFieldImage
   */
  src: string
}

export function WidgetFieldImageFromJSON(json: any): WidgetFieldImage {
  return WidgetFieldImageFromJSONTyped(json, false)
}

export function WidgetFieldImageFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): WidgetFieldImage {
  if (json === undefined || json === null) {
    return json
  }
  return {
    widgetType: json['widgetType'],
    alt: json['alt'],
    title: json['title'],
    src: json['src'],
  }
}

export function WidgetFieldImageToJSON(value?: WidgetFieldImage | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    widgetType: value.widgetType,
    alt: value.alt,
    title: value.title,
    src: value.src,
  }
}