import { SelectChangeEvent } from '@mui/material'
import {
  DetalleStateComponent,
  ElasticSearchData,
  FormComponentProps,
  PaginationData,
  ViewComponentProps,
  detalleStateComponentIS
} from 'src/@core/types'
import { TipoNovedad } from 'src/bundle/novedades/domain/novedadesModel'

export interface OperacionesDTO {
  id?: string
  categoria?: string
  producto?: string
  fecha_alta?: string
  archivo_entrada: any
  estado?: string
  errores: any[]
}

export type QueryParamsOperacion = PaginationData & { tipo: TipoNovedad }

export type OperacionViewsProps = ViewComponentProps<ElasticSearchData<OperacionesDTO>>

export type CrearOperacionDTO = Omit<OperacionesDTO, 'id' | 'fecha_alta'>
export type ModificarOperacionDTO = CrearOperacionDTO & { id: string }

export type OperacionFormComponentProps = FormComponentProps<
  OperacionesDTO,
  CrearOperacionDTO,
  ModificarOperacionDTO
>

export type OperacionDetalleState = DetalleStateComponent<OperacionesDTO> & {
  handleChange?: (event: SelectChangeEvent) => void
  isDisabling?: boolean
  operacionSelected?: OperacionesDTO
  handleDetail?: () => void
  handleRefresh?: () => void
  handleDescargar?: (tipoArchivo: string) => void
}

//** Initial State */
export const OperacionStateComponentIS: OperacionDetalleState = {
  ...detalleStateComponentIS
}

export const operacionesIS: OperacionesDTO = {
  id: '',
  categoria: '',
  producto: '',
  fecha_alta: '',
  archivo_entrada: '',
  errores: []
}
