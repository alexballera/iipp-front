import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_ROUTE } from 'src/@core/constants'
import { ElasticSearchData, ObjectQueryParams } from 'src/@core/types'
import { setBaseQuery } from 'src/@core/utils'
import { Archivo } from 'src/bundle/shared/domain'
import {
  GenerarNotaDTO,
  NotaDTO,
  RehacerNotaDTO,
  ResRehacerNotaDTO,
  ResultadoGenerador
} from '../domain'

const URL = process.env.NEXT_PUBLIC_API_URL + APP_ROUTE

//** RTK API */
export const facturacionApi = createApi({
  reducerPath: 'facturacionApi',
  baseQuery: fetchBaseQuery(setBaseQuery(URL)),
  refetchOnMountOrArgChange: true,
  tagTypes: ['nota-contable'],
  endpoints: builder => ({
    //** NOTAS */
    // List Notas
    fetchNotas: builder.query<ElasticSearchData<NotaDTO>, ObjectQueryParams>({
      query: body => {
        return {
          url: `/nota-contable`,
          params: {
            paginationData: JSON.stringify(body.paginationData),
            filtros: JSON.stringify(body.queryParams.filtros),
            orden: JSON.stringify(body.queryParams.orden)
          },
          method: 'get'
        }
      }
    }),

    // Get ND
    getNotaById: builder.query<NotaDTO, string>({
      query: id => ({
        url: `/nota-contable/${id}`,
        method: 'get'
      })
    }),

    //TODO: mover "getArchivosInformacionMensual" a "novedadesApiService"
    // Get Archivos
    getArchivosInformacionMensual: builder.query<ElasticSearchData<Archivo>, GenerarNotaDTO>({
      query: body => ({
        url: `/novedad/archivos-informacion-mensual?fecha_desde=${body.fecha_desde!.toISOString()}&fecha_hasta=${body.fecha_hasta!.toISOString()}&producto=${body.producto}`,
        method: 'get'
      })
    }),

    // POST: Create ND
    generarNotas: builder.mutation<ResultadoGenerador, GenerarNotaDTO>({
      query: body => ({
        url: `/nota-contable`,
        method: 'post',
        body
      })
    }),

    // POST: Anular ND
    anularNota: builder.mutation<void, string>({
      query: id => ({
        url: `/nota-contable/${id}/anular`,
        method: 'put'
      })
    }),

    // POST: Rehacer ND
    rehacerNota: builder.mutation<ResRehacerNotaDTO, RehacerNotaDTO>({
      query: body => ({
        url: `/nota-contable/${body.id}/rehacer`,
        method: 'post',
        body: {
          ...body,
          fecha: body.fecha?.toISOString()
        }
      })
    })
  })
})

export const {
  useFetchNotasQuery,
  useGetNotaByIdQuery,
  useGenerarNotasMutation,
  useAnularNotaMutation,
  useGetArchivosInformacionMensualQuery,
  useRehacerNotaMutation
} = facturacionApi

export const {
  anularNota,
  fetchNotas,
  getNotaById,
  generarNotas,
  getArchivosInformacionMensual,
  rehacerNota
} = facturacionApi.endpoints
