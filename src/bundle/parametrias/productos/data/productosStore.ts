import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ElasticSearchData, ElasticSearchDataIS } from 'src/@core/types'
import { ProductoDTO, ProductoIS } from '../domain/productosModel'

const initialState = {
  producto: ProductoIS,
  productosList: [ProductoIS],
  productosElasticSearch: ElasticSearchDataIS
}

export const productosSlice = createSlice({
  name: 'productosSlice',
  initialState,
  reducers: {
    setProducto: (state, action: PayloadAction<ProductoDTO>) => {
      state = {
        ...state,
        producto: action.payload
      }

      return { ...state }
    },
    cleanProducto: state => {
      state = {
        ...state,
        producto: initialState.producto
      }

      return { ...state }
    },
    setProductosList: (state, action: PayloadAction<ProductoDTO[]>) => {
      state = {
        ...state,
        productosList: action.payload
      }

      return { ...state }
    },
    cleanProductosList: state => {
      state = {
        ...state,
        productosList: initialState.productosList
      }

      return { ...state }
    },
    setProductosElasticSearch: (state, action: PayloadAction<ElasticSearchData<ProductoDTO>>) => {
      state = {
        ...state,
        productosElasticSearch: action.payload
      }

      return { ...state }
    },
    cleanProductosElasticSearch: state => {
      state = {
        ...state,
        productosElasticSearch: initialState.productosElasticSearch
      }

      return { ...state }
    }
  }
})

export const {
  cleanProducto,
  cleanProductosElasticSearch,
  cleanProductosList,
  setProducto,
  setProductosElasticSearch,
  setProductosList
} = productosSlice.actions
export default productosSlice.reducer
