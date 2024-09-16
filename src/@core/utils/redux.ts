import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { TokenEnum } from 'src/@core/enums'
import { MsalUtils } from '.'

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params })

      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      }
    }
  }

/**
 * Set base query for redux toolkit and access token inside the headers object
 * @param {string} URL - URL of the API
 * @returns {FetchBaseQueryArgs} Base query for redux toolkit
 */
export function setBaseQuery(URL: string): FetchBaseQueryArgs {
  return {
    baseUrl: URL,
    prepareHeaders: headers => {
      const token = localStorage.getItem(TokenEnum.access_token)

      if (token) {
        headers.set('authorization', `Bearer ${token}`)

        return headers
      } else {
        MsalUtils.getAccessToken()
        const token = localStorage.getItem(TokenEnum.access_token)
        headers.set('authorization', `Bearer ${token}`)

        return headers
      }
    }
  }
}
