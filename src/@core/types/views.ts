import { GridCellParams } from '@mui/x-data-grid'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { PaginationData, QueryParams } from './queryParams'

export interface ViewComponentProps<T> {
  data: T
  isLoading?: boolean
  isFetching?: boolean
  isError?: boolean
  isSuccess?: boolean
  queryParams?: QueryParams
  itemSelected?: GridCellParams
  setItemSelected?: (obj: GridCellParams) => void
  onHandleRefresh?: () => void
  isLoadingRefresh?: boolean
  paginationData: PaginationData
  setPaginationData: (PaginationDataIS: PaginationData) => void
}

export type ViewDetalleProps<T, P> = Omit<ViewComponentProps<T>, 'queryParams'> & {
  itemSelected: P
}

export interface HeaderDetalleProps {
  loading?: boolean
  titleHeader?: string
  subheader?: string
  action?: ReactNode
}

export type DetalleStateComponent<T> = {
  open: boolean
  loading?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  data: T | undefined
  estado?: string
} & HeaderDetalleProps

export interface FormComponentProps<D, C, E> {
  data?: D
  accion?: string
  loading: boolean
  creado?: boolean
  editado?: boolean
  handleCrear?: (data: C) => void
  handleEditar?: (data: E) => void
}

//** Initial State */
export const detalleStateComponentIS: DetalleStateComponent<any> = {
  open: false,
  loading: false,
  data: undefined,
  estado: ''
}
