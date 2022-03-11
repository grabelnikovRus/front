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
import { Source, SourceFromJSON, SourceFromJSONTyped, SourceToJSON } from './'

/**
 *
 * @export
 * @interface ComplaintCreateRequest
 */
export interface ComplaintCreateRequest {
  /**
   *
   * @type {string}
   * @memberof ComplaintCreateRequest
   */
  authorName: string
  /**
   *
   * @type {string}
   * @memberof ComplaintCreateRequest
   */
  authorPhone: string
  /**
   *
   * @type {number}
   * @memberof ComplaintCreateRequest
   */
  theme: number
  /**
   *
   * @type {string}
   * @memberof ComplaintCreateRequest
   */
  content: string
  /**
   *
   * @type {Source}
   * @memberof ComplaintCreateRequest
   */
  source: Source
}

export function ComplaintCreateRequestFromJSON(json: any): ComplaintCreateRequest {
  return ComplaintCreateRequestFromJSONTyped(json, false)
}

export function ComplaintCreateRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ComplaintCreateRequest {
  if (json === undefined || json === null) {
    return json
  }
  return {
    authorName: json['author_name'],
    authorPhone: json['author_phone'],
    theme: json['theme'],
    content: json['content'],
    source: SourceFromJSON(json['source']),
  }
}

export function ComplaintCreateRequestToJSON(value?: ComplaintCreateRequest | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    author_name: value.authorName,
    author_phone: value.authorPhone,
    theme: value.theme,
    content: value.content,
    source: SourceToJSON(value.source),
  }
}
