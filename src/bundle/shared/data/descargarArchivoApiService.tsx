import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_ROUTE } from 'src/@core/constants'
import { setBaseQuery, utf8_to_b64 } from 'src/@core/utils'
import { DescargarArchivo } from '../domain'

const URL = `${process.env.NEXT_PUBLIC_API_URL}${APP_ROUTE}`

//** RTK API*/
export const descargaArchivoApi = createApi({
  reducerPath: 'decargaArchivoApi',
  baseQuery: fetchBaseQuery(setBaseQuery(URL)),
  tagTypes: ['decarga_archivo'],
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    // GET Archivo
    getArchivo: builder.query<DescargarArchivo, DescargarArchivo>({
      query: ({ contenedor_id, nombre_archivo }) => ({
        url: `/archivo/${contenedor_id}/descargar/${utf8_to_b64(nombre_archivo)}`,
        method: 'get'
      })
    })
  })
})

export const { useGetArchivoQuery } = descargaArchivoApi

export const { getArchivo } = descargaArchivoApi.endpoints
