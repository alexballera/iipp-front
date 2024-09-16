import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_ROUTE } from 'src/@core/constants'
import { ElasticSearchData, ObjectQueryParams } from 'src/@core/types'
import { setBaseQuery } from 'src/@core/utils'
import {
  CobranzasDTO,
  CrearCobranzaDTO,
  ModificarCobranzaDTO,
  VincularCobranzaDTO
} from '../domain/cobranzasModel'

const URL = `${process.env.NEXT_PUBLIC_API_URL}${APP_ROUTE}`

//** RTK API */
export const cobranzasApi = createApi({
  reducerPath: 'cobranza',
  baseQuery: fetchBaseQuery(setBaseQuery(URL)),
  refetchOnMountOrArgChange: true,
  tagTypes: ['cobranza'],
  endpoints: builder => ({
    // GET: Listar
    fetchCobranzas: builder.query<ElasticSearchData<CobranzasDTO>, ObjectQueryParams>({
      query: params => {
        return {
          url: '/cobranza',
          params: {
            paginationData: JSON.stringify(params.paginationData),
            filtros: JSON.stringify(params.queryParams.filtros),
            orden: JSON.stringify(params.queryParams.orden)
          },
          method: 'get'
        }
      }
    }),

    // GET: Detalle
    getCobranzaById: builder.query<CobranzasDTO, string>({
      query: id => ({
        url: `/cobranza/${id}`,
        method: 'get'
      })
    }),

    // POST: Create
    createCobranza: builder.mutation<CrearCobranzaDTO, CrearCobranzaDTO>({
      query: body => ({ url: '/cobranza', method: 'post', body })
    }),

    // PUT: Update
    updateCobranza: builder.mutation<ModificarCobranzaDTO, ModificarCobranzaDTO>({
      query: body => ({
        url: `/cobranza/${body?.id}`,
        method: 'put',
        body
      })
    }),

    vincularCobranza: builder.mutation<VincularCobranzaDTO, VincularCobranzaDTO>({
      query: body => ({
        url: `/cobranza/${body?.id}/vincular`,
        method: 'put',
        body
      })
    }),

    // PUT: Deshabilitar
    disableCobranza: builder.mutation<CobranzasDTO, CobranzasDTO>({
      query: body => ({
        url: `/cobranza/${body?.id}/estado`,
        method: 'put',
        body
      })
    })
  })
})

export const {
  useCreateCobranzaMutation,
  useDisableCobranzaMutation,
  useFetchCobranzasQuery,
  useGetCobranzaByIdQuery,
  useUpdateCobranzaMutation,
  useVincularCobranzaMutation
} = cobranzasApi

export const {
  createCobranza,
  disableCobranza,
  fetchCobranzas,
  getCobranzaById,
  updateCobranza,
  vincularCobranza
} = cobranzasApi.endpoints
