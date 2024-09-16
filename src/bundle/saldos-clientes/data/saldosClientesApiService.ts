import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_ROUTE } from 'src/@core/constants'
import { ElasticSearchData, ObjectQueryParams } from 'src/@core/types'
import { setBaseQuery } from 'src/@core/utils'
import { SaldosClienteDTO } from '../domain/saldosClientesModel'

const URL = `${process.env.NEXT_PUBLIC_API_URL}${APP_ROUTE}`

//** RTK API */
export const saldosClientesApi = createApi({
  reducerPath: 'saldosClientesApi',
  baseQuery: fetchBaseQuery(setBaseQuery(URL)),
  refetchOnMountOrArgChange: true,
  tagTypes: ['saldos'],
  endpoints: builder => ({
    // List
    fetchSaldosClientes: builder.query<ElasticSearchData<SaldosClienteDTO>, ObjectQueryParams>({
      query: body => {
        return {
          url: `/cliente/saldos`,
          params: {
            paginationData: JSON.stringify(body.paginationData),
            filtros: JSON.stringify(body.queryParams.filtros),
            orden: JSON.stringify(body.queryParams.orden)
          },
          method: 'get'
        }
      }
    })
  })
})

export const { useFetchSaldosClientesQuery } = saldosClientesApi

export const { fetchSaldosClientes } = saldosClientesApi.endpoints
