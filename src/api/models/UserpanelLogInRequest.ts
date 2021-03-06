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
 * @interface UserpanelLogInRequest
 */
export interface UserpanelLogInRequest {
  /**
   *
   * @type {string}
   * @memberof UserpanelLogInRequest
   */
  phone: string
  /**
   *
   * @type {string}
   * @memberof UserpanelLogInRequest
   */
  smsCode: string
  /**
   *
   * @type {Source}
   * @memberof UserpanelLogInRequest
   */
  source: Source
  /**
   *
   * @type {string}
   * @memberof UserpanelLogInRequest
   */
  recaptchaToken: string | null
}

export function UserpanelLogInRequestFromJSON(json: any): UserpanelLogInRequest {
  return UserpanelLogInRequestFromJSONTyped(json, false)
}

export function UserpanelLogInRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): UserpanelLogInRequest {
  if (json === undefined || json === null) {
    return json
  }
  return {
    phone: json['phone'],
    smsCode: json['sms_code'],
    source: SourceFromJSON(json['source']),
    recaptchaToken: json['recaptchaToken'],
  }
}

export function UserpanelLogInRequestToJSON(value?: UserpanelLogInRequest | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    phone: value.phone,
    sms_code: value.smsCode,
    source: SourceToJSON(value.source),
    recaptchaToken: value.recaptchaToken,
  }
}
