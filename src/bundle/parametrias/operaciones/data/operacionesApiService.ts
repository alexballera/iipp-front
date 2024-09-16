import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_ROUTE } from 'src/@core/constants'
import { ElasticSearchData } from 'src/@core/types'
import { setBaseQuery } from 'src/@core/utils'
import { CrearOperacionDTO, QueryParamsOperacion } from '../domain/operacionesModel'

const URL = `${process.env.NEXT_PUBLIC_API_URL}${APP_ROUTE}`

//** RTK API */
export const operacionApi = createApi({
  reducerPath: 'operacionApi',
  baseQuery: fetchBaseQuery(setBaseQuery(URL)),
  refetchOnMountOrArgChange: true,
  tagTypes: ['operacion'],
  endpoints: builder => ({
    // List
    fetchOperacion: builder.query<ElasticSearchData<CrearOperacionDTO>, QueryParamsOperacion>({
      query: params => ({
        url: `novedad?pagina=${params.pagina}&cantidad=${params.cantidad}&tipo=${params.tipo}`,
        method: 'get'
      })
    }),

    // Get
    getOperacionById: builder.query<CrearOperacionDTO, string>({
      query: id => ({
        url: `novedad/${id}`,
        method: 'get'
      })
    }),

    // POST: Create
    crearOperacion: builder.mutation<CrearOperacionDTO, CrearOperacionDTO>({
      query: body => ({
        url: `novedad`,
        method: 'post',
        body
      })
    }),

    // PUT: Update
    anularOperacion: builder.mutation<{ id: string | number }, string>({
      query: id => ({
        url: `novedad/${id}/anular`,
        method: 'put'
      })
    })
  })
})

export const {
  useFetchOperacionQuery,
  useCrearOperacionMutation,
  useGetOperacionByIdQuery,
  useAnularOperacionMutation
} = operacionApi

export const { fetchOperacion, crearOperacion, getOperacionById, anularOperacion } =
  operacionApi.endpoints
