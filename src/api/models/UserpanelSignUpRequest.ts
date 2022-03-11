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
 * @interface UserpanelSignUpRequest
 */
export interface UserpanelSignUpRequest {
  /**
   *
   * @type {string}
   * @memberof UserpanelSignUpRequest
   */
  phone: string
  /**
   *
   * @type {string}
   * @memberof UserpanelSignUpRequest
   */
  name: string
  /**
   *
   * @type {string}
   * @memberof UserpanelSignUpRequest
   */
  gaId?: string | null
  /**
   *
   * @type {string}
   * @memberof UserpanelSignUpRequest
   */
  recaptchaToken: string | null
  /**
   *
   * @type {Source}
   * @memberof UserpanelSignUpRequest
   */
  source: Source
  /**
   *
   * @type {boolean}
   * @memberof UserpanelSignUpRequest
   */
  allowMarketing?: boolean
}

export function UserpanelSignUpRequestFromJSON(json: any): UserpanelSignUpRequest {
  return UserpanelSignUpRequestFromJSONTyped(json, false)
}

export function UserpanelSignUpRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): UserpanelSignUpRequest {
  if (json === undefined || json === null) {
    return json
  }
  return {
    phone: json['phone'],
    name: json['name'],
    gaId: !exists(json, 'ga_id') ? undefined : json['ga_id'],
    recaptchaToken: json['recaptchaToken'],
    source: SourceFromJSON(json['source']),
    allowMarketing: !exists(json, 'allow_marketing') ? undefined : json['allow_marketing'],
  }
}

export function UserpanelSignUpRequestToJSON(value?: UserpanelSignUpRequest | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    phone: value.phone,
    name: value.name,
    ga_id: value.gaId,
    recaptchaToken: value.recaptchaToken,
    source: SourceToJSON(value.source),
    allow_marketing: value.allowMarketing,
  }
}
