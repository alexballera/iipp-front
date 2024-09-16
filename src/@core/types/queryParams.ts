import { Dispatch, SetStateAction } from 'react'
import { CANTIDAD_POR_PAGINAS } from '../constants'

export interface ElasticSearchData<T> {
  cantidad: number
  registros: T[]
  total: number
}

export interface PaginationData {
  pagina: number
  cantidad: number
}

export interface QueryParams {
  filtros?: string
  orden?: string
}

export interface ObjectQueryParams {
  paginationData: PaginationData
  queryParams: QueryParams
}

//** Initial States */
export const QueryParamsIS: QueryParams = {
  filtros: '',
  orden: ''
}

export interface FiltrosProps<T> {
  queryParams: T
  setQueryParams: Dispatch<SetStateAction<T>>
}

export const ElasticSearchDataIS: ElasticSearchData<any> = {
  cantidad: 0,
  registros: [],
  total: 0
}

export const PaginationDataIS: PaginationData = {
  pagina: 1,
  cantidad: CANTIDAD_POR_PAGINAS
}
