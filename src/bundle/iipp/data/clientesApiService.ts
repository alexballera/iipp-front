import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_ROUTE } from 'src/@core/constants'
import { ElasticSearchData, ObjectQueryParams } from 'src/@core/types'
import { setBaseQuery } from 'src/@core/utils'
import {
  ClienteDTO,
  ClienteDatosExterno,
  CrearClienteDTO,
  ModificarClienteDTO
} from '../domain/clientesModel'

const URL = `${process.env.NEXT_PUBLIC_API_URL}${APP_ROUTE}`

//** RTK API */
export const clientesApi = createApi({
  reducerPath: 'clientesApi',
  baseQuery: fetchBaseQuery(setBaseQuery(URL)),
  refetchOnMountOrArgChange: true,
  tagTypes: ['clientes'],
  endpoints: builder => ({
    // List
    fetchClientes: builder.query<ElasticSearchData<ClienteDTO>, ObjectQueryParams>({
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
    getClienteById: builder.query<ClienteDTO, string>({
      query: id => ({
        url: `/cliente/${id}`,
        method: 'get'
      })
    }),

    // Create
    createCliente: builder.mutation<CrearClienteDTO, CrearClienteDTO>({
      query: body => ({ url: '/cliente', method: 'post', body })
    }),

    // Update
    updateCliente: builder.mutation<ModificarClienteDTO, ModificarClienteDTO>({
      query: body => ({
        url: `/cliente/${body?.id}`,
        method: 'put',
        body
      })
    }),

    // Update
    disableCliente: builder.mutation<ClienteDTO, ClienteDTO>({
      query: body => ({
        url: `/cliente/${body?.id}/estado`,
        method: 'put',
        body
      })
    }),

    // GET Oficio by Numero Documneto
    getClienteByDocumentNumber: builder.query<ClienteDatosExterno, string>({
      query: numero_documento => ({
        url: `/cliente/datos-completos/${numero_documento}`,
        method: 'get'
      })
    })
  })
})

export const {
  useFetchClientesQuery,
  useCreateClienteMutation,
  useGetClienteByIdQuery,
  useUpdateClienteMutation,
  useDisableClienteMutation,
  useGetClienteByDocumentNumberQuery
} = clientesApi

export const {
  fetchClientes,
  getClienteById,
  createCliente,
  updateCliente,
  disableCliente,
  getClienteByDocumentNumber
} = clientesApi.endpoints
