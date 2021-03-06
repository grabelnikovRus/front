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
  InfrastructureResponse,
  InfrastructureResponseFromJSON,
  InfrastructureResponseToJSON,
} from '../models'

/**
 *
 */
export class InfrastructureApi extends runtime.BaseAPI {
  /**
   * Справочник инфраструктур
   */
  async getInfrastructureRaw(): Promise<runtime.ApiResponse<InfrastructureResponse>> {
    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    const response = await this.request({
      path: `/infrastructure-v1`,
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    })

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      InfrastructureResponseFromJSON(jsonValue),
    )
  }

  /**
   * Справочник инфраструктур
   */
  async getInfrastructure(): Promise<InfrastructureResponse> {
    const response = await this.getInfrastructureRaw()
    return await response.value()
  }
}
