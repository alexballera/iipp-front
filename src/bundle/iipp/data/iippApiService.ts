import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_ROUTE } from 'src/@core/constants'
import { ElasticSearchData, ObjectQueryParams } from 'src/@core/types'
import { setBaseQuery } from 'src/@core/utils'
import {
  ClienteDTO,
  ClienteDatosExterno,
  CrearClienteDTO,
  CrearParametriaComercialDTO,
  EliminarParametriaComercialDTO,
  ModificarClienteDTO,
  ModificarParametriaComercialDTO,
  ParametriaComercialDTO
} from '../domain/iippModel'

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
    }),

    // Update
    disableIipp: builder.mutation<ClienteDTO, ClienteDTO>({
      query: body => ({
        url: `/cliente/${body?.id}/estado`,
        method: 'put',
        body
      })
    }),

    // GET Oficio by Numero Documneto
    getIippByDocumentNumber: builder.query<ClienteDatosExterno, string>({
      query: numero_documento => ({
        url: `/cliente/datos-completos/${numero_documento}`,
        method: 'get'
      })
    }),

    // Create Parametria
    createParametria: builder.mutation<ParametriaComercialDTO, CrearParametriaComercialDTO>({
      query: body => ({ url: `/cliente/${body.cliente_id}/parametria`, method: 'post', body })
    }),

    // Edit Parametria
    updateParametria: builder.mutation<ParametriaComercialDTO, ModificarParametriaComercialDTO>({
      query: body => ({
        url: `/cliente/${body.cliente_id}/parametria/${body.id}`,
        method: 'put',
        body
      })
    }),

    // Delete Parametria
    deleteParametria: builder.query<ParametriaComercialDTO, EliminarParametriaComercialDTO>({
      query: body => ({
        url: `/cliente/${body.cliente_id}/parametria/${body.id}`,
        method: 'delete'
      })
    })
  })
})

export const {
  useCreateIippMutation,
  useDisableIippMutation,
  useFetchIippQuery,
  useGetIippByDocumentNumberQuery,
  useGetIippByIdQuery,
  useCreateParametriaMutation,
  useUpdateParametriaMutation,
  useDeleteParametriaQuery,
  useUpdateIippMutation
} = iippApi

export const {
  createIipp,
  disableIipp,
  fetchIipp,
  getIippByDocumentNumber,
  getIippById,
  updateIipp,
  createParametria,
  updateParametria,
  deleteParametria
} = iippApi.endpoints
