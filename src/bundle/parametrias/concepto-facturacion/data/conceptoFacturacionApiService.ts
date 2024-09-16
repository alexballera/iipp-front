import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_ROUTE, CONCEPTO_FACTURACION_ROUTE } from 'src/@core/constants'
import { ElasticSearchData, PaginationData } from 'src/@core/types'
import { setBaseQuery } from 'src/@core/utils'
import {
  ConceptoFacturacionDTO,
  CrearConceptoFacturacionDTO
} from '../domain/conceptoFacturacionModel'

const URL = `${process.env.NEXT_PUBLIC_API_URL}${APP_ROUTE}`

//** RTK API */
export const conceptoFacturacionApi = createApi({
  reducerPath: 'conceptoFacturacionApi',
  baseQuery: fetchBaseQuery(setBaseQuery(URL)),
  refetchOnMountOrArgChange: true,
  tagTypes: ['concepto_facturacion'],
  endpoints: builder => ({
    // GET: Listar
    fetchConceptoFacturacion: builder.query<
      ElasticSearchData<ConceptoFacturacionDTO>,
      PaginationData
    >({
      query: params => ({
        url: `${CONCEPTO_FACTURACION_ROUTE}?pagina=${params.pagina}&cantidad=${params.cantidad}`,
        method: 'get'
      })
    }),

    // GET: Detalle
    getConceptoFacturacionById: builder.query<ConceptoFacturacionDTO, string>({
      query: id => ({
        url: `${CONCEPTO_FACTURACION_ROUTE}/${id}`,
        method: 'get'
      })
    }),

    // POST: Create
    createConceptoFacturacion: builder.mutation<
      CrearConceptoFacturacionDTO,
      CrearConceptoFacturacionDTO
    >({
      query: body => ({ url: `${CONCEPTO_FACTURACION_ROUTE}`, method: 'post', body })
    }),

    // PUT: Update
    updateConceptoFacturacion: builder.mutation<ConceptoFacturacionDTO, ConceptoFacturacionDTO>({
      query: body => ({
        url: `${CONCEPTO_FACTURACION_ROUTE}/${body?.id}`,
        method: 'put',
        body
      })
    }),

    // PUT: Deshabilitar
    disableConceptoFacturacion: builder.mutation<ConceptoFacturacionDTO, ConceptoFacturacionDTO>({
      query: body => ({
        url: `${CONCEPTO_FACTURACION_ROUTE}/${body?.id}/estado`,
        method: 'put',
        body
      })
    })
  })
})

export const {
  useCreateConceptoFacturacionMutation,
  useDisableConceptoFacturacionMutation,
  useFetchConceptoFacturacionQuery,
  useGetConceptoFacturacionByIdQuery,
  useUpdateConceptoFacturacionMutation
} = conceptoFacturacionApi

export const {
  createConceptoFacturacion,
  disableConceptoFacturacion,
  fetchConceptoFacturacion,
  getConceptoFacturacionById,
  updateConceptoFacturacion
} = conceptoFacturacionApi.endpoints
