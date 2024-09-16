import { SelectChangeEvent } from '@mui/material'
import { AccionesEnum } from 'src/@core/enums'
import {
  DetalleStateComponent,
  ElasticSearchData,
  FiltrosProps,
  FormComponentProps,
  ViewComponentProps,
  detalleStateComponentIS
} from 'src/@core/types'
import { NotaDTO, NotaIS } from 'src/bundle/facturacion/domain'
import { filtros, order } from 'src/bundle/shared/domain'

export enum TipoCobranza {
  TRANSFERENCIA = 'TRANSFERENCIA',
  INSTRUCCION = 'INSTRUCCION',
  CORRESPONSAL = 'CORRESPONSAL'
}

export enum EstadoCobranza {
  PENDIENTE = 'PENDIENTE',
  APLICADO = 'APLICADO',
  'APLICADO_PARCIALMENTE' = 'APLICADO_PARCIALMENTE'
}

export const getEstadoCobranzaTexto = (estado: string) => {
  if (estado === undefined) return 'Sin estado'

  return {
    PENDIENTE: 'PENDIENTE',
    APLICADO: 'APLICADO',
    APLICADO_PARCIALMENTE: 'APLICADO_PARCIALMENTE',
    default: 'SIN ESTADO'
  }[estado.toUpperCase() || 'default']
}

export const getEstadoCobranzaColor = (estado: string) => {
  if (estado === undefined) return

  //** color: primary, secondary, success, error, warning, info */

  switch (estado.toUpperCase()) {
    case 'APLICADO':
      return 'primary'
    case 'PENDIENTE':
      return 'secondary'
    case 'APLICADO_PARCIALMENTE':
      return 'warning'

    default:
      return
  }
}

export const EstadoCobranzasOptions = Object.values(EstadoCobranza)

export type CobranzasDTO = {
  id: string
  cuit?: string
  nombre?: string
  cuenta_originante?: string
  monto?: number
  monto_aplicado?: number
  moneda?: string
  notas_debito?: NotaDTO[]
  estado?: EstadoCobranza
  tipo_cobranza?: TipoCobranza
  fecha_operacion?: string
  fecha_alta?: string
}

export type SumarioCobranzaDTO = Pick<CobranzasDTO, 'id' | 'monto' | 'cuit'>

export type CobranzasViewProps = ViewComponentProps<ElasticSearchData<CobranzasDTO>>

export type CobranzasDetalleState = DetalleStateComponent<CobranzasDTO> & {
  handleChange?: (event: SelectChangeEvent) => void
  isDisabling?: boolean
  accion?: AccionesEnum
  handleDetail?: () => void
  conceptoSelected?: CobranzasDTO
}

export type CrearCobranzaDTO = Omit<
  CobranzasDTO,
  'notas_debito' | 'estado' | 'fecha_alta' | 'nombre'
>
export type ModificarCobranzaDTO = CrearCobranzaDTO & { id: string }

export type VincularCobranzaDTO = Pick<CobranzasDTO, 'id' | 'notas_debito' | 'estado'>

export type CobranzasFormComponentProps = FormComponentProps<
  CobranzasDTO,
  CrearCobranzaDTO,
  ModificarCobranzaDTO
>

export interface CobranzasFiltrosDTO {
  filtros?: filtros[]
  orden?: order[]
}

//** Props & States */
export type CobranzasFiltrosProps = FiltrosProps<CobranzasFiltrosDTO>

//** Initial State */
export const CobranzasStateComponentIS: CobranzasDetalleState = {
  ...detalleStateComponentIS
}

export const cobranzasIS: CobranzasDTO = {
  id: '',
  cuit: '',
  nombre: '',
  monto: 0,
  monto_aplicado: 0,
  cuenta_originante: '',
  moneda: '',
  notas_debito: [NotaIS],
  estado: EstadoCobranza.PENDIENTE,
  fecha_operacion: ''
}

export const CobranzasFormComponentPropsIS: CobranzasFormComponentProps = {
  accion: '',
  loading: false,
  data: cobranzasIS
}

export const CobranzasFiltrosIS: CobranzasFiltrosDTO = {
  filtros: [
    { campo: 'estado', valor: '' },
    { campo: 'cuit', valor: '' },
    { campo: 'nombre', valor: '' },
    { campo: 'fecha_alta_desde', valor: '' },
    { campo: 'fecha_alta_hasta', valor: '' }
  ],
  orden: []
}
