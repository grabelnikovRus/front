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
  GetWidgetsResponse,
  GetWidgetsResponseFromJSON,
  GetWidgetsResponseToJSON,
} from '../models'

/**
 *
 */
export class WidgetApi extends runtime.BaseAPI {
  /**
   * Получение списка глобальных виджетов
   */
  async getWidgetsRaw(): Promise<runtime.ApiResponse<GetWidgetsResponse>> {
    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    const response = await this.request({
      path: `/widgets-v1`,
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    })

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      GetWidgetsResponseFromJSON(jsonValue),
    )
  }

  /**
   * Получение списка глобальных виджетов
   */
  async getWidgets(): Promise<GetWidgetsResponse> {
    const response = await this.getWidgetsRaw()
    return await response.value()
  }
}