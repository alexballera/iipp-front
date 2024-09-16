import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_ROUTE, IMPUESTO_ROUTE } from 'src/@core/constants'
import { ElasticSearchData, PaginationData } from 'src/@core/types'
import { setBaseQuery } from 'src/@core/utils'
import { CrearImpuestoDTO, ImpuestoDTO, ModificarImpuestoDTO } from '../domain/impuestosModel'

const URL = process.env.NEXT_PUBLIC_API_URL + APP_ROUTE + IMPUESTO_ROUTE

//** RTK API */
export const impuestosApi = createApi({
  reducerPath: 'impuestosApi',
  baseQuery: fetchBaseQuery(setBaseQuery(URL)),
  refetchOnMountOrArgChange: true,
  tagTypes: ['impuestos'],
  endpoints: builder => ({
    // List
    fetchImpuestos: builder.query<ElasticSearchData<ImpuestoDTO>, PaginationData>({
      query: params => {
        return {
          url: `?pagina=${params.pagina}&cantidad=${params.cantidad}`,
          method: 'get'
        }
      }
    }),

    // Get
    getImpuestoById: builder.query<ImpuestoDTO, string>({
      query: id => ({
        url: `/${id}`,
        method: 'get'
      })
    }),

    // PUT: Update
    editarImpuesto: builder.query<ModificarImpuestoDTO, ModificarImpuestoDTO>({
      query: body => ({
        url: `/${body.id}`,
        method: 'put',
        body
      })
    }),

    // POST: Create
    crearImpuesto: builder.query<CrearImpuestoDTO, CrearImpuestoDTO>({
      query: body => ({
        url: '/',
        method: 'post',
        body
      })
    })
  })
})

export const {
  useEditarImpuestoQuery,
  useFetchImpuestosQuery,
  useGetImpuestoByIdQuery,
  useCrearImpuestoQuery
} = impuestosApi
export const { fetchImpuestos, getImpuestoById, editarImpuesto, crearImpuesto } =
  impuestosApi.endpoints
