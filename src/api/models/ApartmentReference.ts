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
 * @interface ApartmentReference
 */
export interface ApartmentReference {
  /**
   *
   * @type {string}
   * @memberof ApartmentReference
   */
  uuid: string
  /**
   *
   * @type {string}
   * @memberof ApartmentReference
   */
  name: string
  /**
   *
   * @type {string}
   * @memberof ApartmentReference
   */
  slug: string | null
  /**
   *
   * @type {string}
   * @memberof ApartmentReference
   */
  altTitle: string | null
}

export function ApartmentReferenceFromJSON(json: any): ApartmentReference {
  return ApartmentReferenceFromJSONTyped(json, false)
}

export function ApartmentReferenceFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ApartmentReference {
  if (json === undefined || json === null) {
    return json
  }
  return {
    uuid: json['uuid'],
    name: json['name'],
    slug: json['slug'],
    altTitle: json['altTitle'],
  }
}

export function ApartmentReferenceToJSON(value?: ApartmentReference | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    uuid: value.uuid,
    name: value.name,
    slug: value.slug,
    altTitle: value.altTitle,
  }
}