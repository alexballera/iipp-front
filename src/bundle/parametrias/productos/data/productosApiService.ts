import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_ROUTE, PRODUCTO_ROUTE } from 'src/@core/constants'
import { ElasticSearchData, PaginationData } from 'src/@core/types'
import { setBaseQuery } from 'src/@core/utils'
import { ModificarProductoDTO, ProductoDTO } from '../domain/productosModel'

const URL = process.env.NEXT_PUBLIC_API_URL + APP_ROUTE + PRODUCTO_ROUTE

//** RTK API */
export const productosApi = createApi({
  reducerPath: 'productosApi',
  baseQuery: fetchBaseQuery(setBaseQuery(URL)),
  refetchOnMountOrArgChange: true,
  tagTypes: ['productos'],
  endpoints: builder => ({
    // List
    fetchProductos: builder.query<ElasticSearchData<ProductoDTO>, PaginationData>({
      query: params => {
        return {
          url: `?pagina=${params.pagina}&cantidad=${params.cantidad}`,
          method: 'get'
        }
      }
    }),

    // Get
    getProductoById: builder.query<ProductoDTO, string>({
      query: id => ({
        url: `/${id}`,
        method: 'get'
      })
    }),

    // PUT: Update
    editarProducto: builder.query<ModificarProductoDTO, ModificarProductoDTO>({
      query: body => ({
        url: `/${body.id}`,
        method: 'put',
        body
      })
    })
  })
})

export const { useFetchProductosQuery, useGetProductoByIdQuery, useEditarProductoQuery } =
  productosApi
export const { fetchProductos, getProductoById, editarProducto } = productosApi.endpoints
