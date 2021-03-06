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

import * as runtime from '../runtime'
import {
  CoordsCheckerResponse,
  CoordsCheckerResponseFromJSON,
  CoordsCheckerResponseToJSON,
  EmptyBody,
  EmptyBodyFromJSON,
  EmptyBodyToJSON,
} from '../models'

export interface CheckCoordsRequest {
  longitude: number
  latitude: number
}

/**
 *
 */
export class DefaultApi extends runtime.BaseAPI {
  /**
   * Проверка вхождения координат в зону выкупа
   */
  async checkCoordsRaw(
    requestParameters: CheckCoordsRequest,
  ): Promise<runtime.ApiResponse<CoordsCheckerResponse>> {
    if (requestParameters.longitude === null || requestParameters.longitude === undefined) {
      throw new runtime.RequiredError(
        'longitude',
        'Required parameter requestParameters.longitude was null or undefined when calling checkCoords.',
      )
    }

    if (requestParameters.latitude === null || requestParameters.latitude === undefined) {
      throw new runtime.RequiredError(
        'latitude',
        'Required parameter requestParameters.latitude was null or undefined when calling checkCoords.',
      )
    }

    const queryParameters: any = {}

    if (requestParameters.longitude !== undefined) {
      queryParameters['longitude'] = requestParameters.longitude
    }

    if (requestParameters.latitude !== undefined) {
      queryParameters['latitude'] = requestParameters.latitude
    }

    const headerParameters: runtime.HTTPHeaders = {}

    const response = await this.request({
      path: `/coords-checker-v1`,
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    })

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      CoordsCheckerResponseFromJSON(jsonValue),
    )
  }

  /**
   * Проверка вхождения координат в зону выкупа
   */
  async checkCoords(longitude: number, latitude: number): Promise<CoordsCheckerResponse> {
    const response = await this.checkCoordsRaw({ longitude: longitude, latitude: latitude })
    return await response.value()
  }
}
