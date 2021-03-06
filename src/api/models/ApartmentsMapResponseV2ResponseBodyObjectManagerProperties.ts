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
  ApartmentsMapResponseV2ResponseBodyObjectManagerPropertiesPin,
  ApartmentsMapResponseV2ResponseBodyObjectManagerPropertiesPinFromJSON,
  ApartmentsMapResponseV2ResponseBodyObjectManagerPropertiesPinFromJSONTyped,
  ApartmentsMapResponseV2ResponseBodyObjectManagerPropertiesPinToJSON,
} from './'

/**
 *
 * @export
 * @interface ApartmentsMapResponseV2ResponseBodyObjectManagerProperties
 */
export interface ApartmentsMapResponseV2ResponseBodyObjectManagerProperties {
  /**
   *
   * @type {ApartmentsMapResponseV2ResponseBodyObjectManagerPropertiesPin}
   * @memberof ApartmentsMapResponseV2ResponseBodyObjectManagerProperties
   */
  pin?: ApartmentsMapResponseV2ResponseBodyObjectManagerPropertiesPin
}

export function ApartmentsMapResponseV2ResponseBodyObjectManagerPropertiesFromJSON(
  json: any,
): ApartmentsMapResponseV2ResponseBodyObjectManagerProperties {
  return ApartmentsMapResponseV2ResponseBodyObjectManagerPropertiesFromJSONTyped(json, false)
}

export function ApartmentsMapResponseV2ResponseBodyObjectManagerPropertiesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ApartmentsMapResponseV2ResponseBodyObjectManagerProperties {
  if (json === undefined || json === null) {
    return json
  }
  return {
    pin: !exists(json, 'pin')
      ? undefined
      : ApartmentsMapResponseV2ResponseBodyObjectManagerPropertiesPinFromJSON(json['pin']),
  }
}

export function ApartmentsMapResponseV2ResponseBodyObjectManagerPropertiesToJSON(
  value?: ApartmentsMapResponseV2ResponseBodyObjectManagerProperties | null,
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    pin: ApartmentsMapResponseV2ResponseBodyObjectManagerPropertiesPinToJSON(value.pin),
  }
}
