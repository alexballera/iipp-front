import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_ROUTE } from 'src/@core/constants'
import { ElasticSearchData, PaginationData } from 'src/@core/types'
import { setBaseQuery } from 'src/@core/utils'
import { CrearNovedadDTO, NovedadDTO } from '../domain/novedadesModel'

const URL = `${process.env.NEXT_PUBLIC_API_URL}${APP_ROUTE}`

//** RTK API */
export const novedadesApi = createApi({
  reducerPath: 'novedad',
  baseQuery: fetchBaseQuery(setBaseQuery(URL)),
  refetchOnMountOrArgChange: true,
  tagTypes: ['novedad'],
  endpoints: builder => ({
    // GET: Listar
    fetchNovedades: builder.query<ElasticSearchData<NovedadDTO>, PaginationData>({
      query: params => ({
        url: `/novedad?pagina=${params.pagina}&cantidad=${params.cantidad}`,
        method: 'get'
      })
    }),

    // GET: Detalle
    getNovedadById: builder.query<NovedadDTO, string>({
      query: id => ({
        url: `/novedad/${id}`,
        method: 'get'
      })
    }),

    // POST: Create
    createNovedad: builder.mutation<CrearNovedadDTO, CrearNovedadDTO>({
      query: body => ({ url: '/novedad', method: 'post', body })
    }),

    // POST: Anular
    anularNovedad: builder.mutation<void, string>({
      query: id => ({
        url: `novedad/${id}/anular`,
        method: 'put'
      })
    }),

    // POST: Reintentar
    reintentarNovedad: builder.mutation<void, string>({
      query: id => ({
        url: `/novedad/${id}/reintentar`,
        method: 'put'
      })
    })
  })
})

export const {
  useAnularNovedadMutation,
  useCreateNovedadMutation,
  useFetchNovedadesQuery,
  useGetNovedadByIdQuery,
  useReintentarNovedadMutation
} = novedadesApi

export const { fetchNovedades, getNovedadById, createNovedad, anularNovedad, reintentarNovedad } =
  novedadesApi.endpoints
