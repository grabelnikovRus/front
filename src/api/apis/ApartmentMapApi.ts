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
  ApartmentMapRequestV2,
  ApartmentMapRequestV2FromJSON,
  ApartmentMapRequestV2ToJSON,
  ApartmentsMapResponseV2,
  ApartmentsMapResponseV2FromJSON,
  ApartmentsMapResponseV2ToJSON,
  BoundingBoxRequest,
  BoundingBoxRequestFromJSON,
  BoundingBoxRequestToJSON,
  BoundingBoxResponse,
  BoundingBoxResponseFromJSON,
  BoundingBoxResponseToJSON,
  EmptyBody,
  EmptyBodyFromJSON,
  EmptyBodyToJSON,
} from '../models'

export interface ApartmentsMapRequest {
  apartmentMapRequestV2: ApartmentMapRequestV2
}

export interface BoundingBoxOperationRequest {
  boundingBoxRequest?: BoundingBoxRequest
}

/**
 *
 */
export class ApartmentMapApi extends runtime.BaseAPI {
  /**
   * Поиск квартир на карте (формат ObjectManager)
   */
  async apartmentsMapRaw(
    requestParameters: ApartmentsMapRequest,
  ): Promise<runtime.ApiResponse<ApartmentsMapResponseV2>> {
    if (
      requestParameters.apartmentMapRequestV2 === null ||
      requestParameters.apartmentMapRequestV2 === undefined
    ) {
      throw new runtime.RequiredError(
        'apartmentMapRequestV2',
        'Required parameter requestParameters.apartmentMapRequestV2 was null or undefined when calling apartmentsMap.',
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    const response = await this.request({
      path: `/apartments-map-v1`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: ApartmentMapRequestV2ToJSON(requestParameters.apartmentMapRequestV2),
    })

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ApartmentsMapResponseV2FromJSON(jsonValue),
    )
  }

  /**
   * Поиск квартир на карте (формат ObjectManager)
   */
  async apartmentsMap(
    apartmentMapRequestV2: ApartmentMapRequestV2,
  ): Promise<ApartmentsMapResponseV2> {
    const response = await this.apartmentsMapRaw({ apartmentMapRequestV2: apartmentMapRequestV2 })
    return await response.value()
  }

  /**
   * Возвращает bounding box по фильтру
   */
  async boundingBoxRaw(
    requestParameters: BoundingBoxOperationRequest,
  ): Promise<runtime.ApiResponse<BoundingBoxResponse>> {
    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    const response = await this.request({
      path: `/bounding-box-v1`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: BoundingBoxRequestToJSON(requestParameters.boundingBoxRequest),
    })

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      BoundingBoxResponseFromJSON(jsonValue),
    )
  }

  /**
   * Возвращает bounding box по фильтру
   */
  async boundingBox(boundingBoxRequest?: BoundingBoxRequest): Promise<BoundingBoxResponse> {
    const response = await this.boundingBoxRaw({ boundingBoxRequest: boundingBoxRequest })
    return await response.value()
  }
}