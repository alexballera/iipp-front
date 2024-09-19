import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_ROUTE } from 'src/@core/constants'
import { ElasticSearchData, ObjectQueryParams } from 'src/@core/types'
import { setBaseQuery } from 'src/@core/utils'
import { ClienteDTO, CrearClienteDTO, ModificarClienteDTO } from '../domain/iippModel'

const URL = `${process.env.NEXT_PUBLIC_API_URL}${APP_ROUTE}`

//** RTK API */
export const iippApi = createApi({
  reducerPath: 'iippApi',
  baseQuery: fetchBaseQuery(setBaseQuery(URL)),
  refetchOnMountOrArgChange: true,
  tagTypes: ['clientes'],
  endpoints: builder => ({
    // List
    fetchIipp: builder.query<ElasticSearchData<ClienteDTO>, ObjectQueryParams>({
      query: body => {
        return {
          url: '/cliente',
          params: {
            paginationData: JSON.stringify(body.paginationData),
            filtros: JSON.stringify(body.queryParams.filtros),
            orden: JSON.stringify(body.queryParams.orden)
          },
          method: 'get'
        }
      }
    }),

    // Get
    getIippById: builder.query<ClienteDTO, string>({
      query: id => ({
        url: `/cliente/${id}`,
        method: 'get'
      })
    }),

    // Create
    createIipp: builder.mutation<CrearClienteDTO, CrearClienteDTO>({
      query: body => ({ url: '/cliente', method: 'post', body })
    }),

    // Update
    updateIipp: builder.mutation<ModificarClienteDTO, ModificarClienteDTO>({
      query: body => ({
        url: `/cliente/${body?.id}`,
        method: 'put',
        body
      })
    })
  })
})

export const {
  useCreateIippMutation,
  useFetchIippQuery,
  useGetIippByIdQuery,
  useUpdateIippMutation
} = iippApi

export const { createIipp, fetchIipp, getIippById, updateIipp } = iippApi.endpoints
