import {
  DetalleStateComponent,
  ElasticSearchData,
  FormComponentProps,
  ViewComponentProps
} from 'src/@core/types'
import { MonedaEnum } from 'src/bundle/shared/domain'

//** Enums */
export enum GrupoImpuestosEnum {
  IMPUESTOS = 'IMPUESTOS',
  PERCEPCIONES = 'PERCEPCIONES'
}

//** Models */
export type ImpuestoDTO = {
  id?: string
  grupo?: GrupoImpuestosEnum
  descripcion: string
  alicuota: number
  cuenta?: string
  numero_cuenta: string[]
  id_compuesto?: string
  moneda?: MonedaEnum
  fecha_alta?: string
  fecha_modificacion?: string
}

export type CrearImpuestoDTO = Omit<ImpuestoDTO, 'id' | 'cuenta'>
export type ModificarImpuestoDTO = Omit<ImpuestoDTO, 'cuenta'>

export type ImpuestoDetalleState = DetalleStateComponent<ImpuestoDTO> & {
  onEditar?: () => void
  onDelete?: () => void
}

export type ImpuestosViewProps = ViewComponentProps<ElasticSearchData<ImpuestoDTO>>

export type ImpuestoFormComponentProps = FormComponentProps<
  ImpuestoDTO,
  CrearImpuestoDTO,
  ModificarImpuestoDTO
>

//** Initial State */
export const ImpuestoIS: ImpuestoDTO = {
  alicuota: 0,
  numero_cuenta: [],
  descripcion: '',
  grupo: GrupoImpuestosEnum.IMPUESTOS
}

export const ImpuestoFormComponentPropsIS: ImpuestoFormComponentProps = {
  accion: '',
  loading: false,
  data: ImpuestoIS
}
