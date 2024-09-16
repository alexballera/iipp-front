import { SelectChangeEvent } from '@mui/material'
import { DetalleStateComponent, detalleStateComponentIS } from 'src/@core/types'
import { ImpuestoTypes } from 'src/bundle/shared/domain'

export type ImpuestoConceptoFacturacionDTO = Pick<
  ImpuestoTypes,
  'nombre' | 'alicuota' | 'cuenta_contable' | 'moneda'
>

export enum GrupoConceptoFacturacion {
  COMISION = 'COMISIONES',
  GASTO = 'GASTOS',
  BONIFICACION = 'BONIFICACIONES'
}

export enum CodigosDeConceptosFacturacion {
  COM_01 = 'COM_01', // Comisión por transferencia en efectivo
  COM_02 = 'COM_02', // Comisión por transferencia en efectivo
  GAS_01 = 'GAS_01' // Gasto por transferencia en efectivo
}

export interface ConceptoFacturacionDTO {
  id?: string
  nombre?: string
  productos?: string[]
  producto?: string
  grupo?: GrupoConceptoFacturacion
  codigo?: CodigosDeConceptosFacturacion
  cuenta_contable?: string
  impuesto?: ImpuestoConceptoFacturacionDTO
  habilitado?: boolean
  fecha_alta?: string
  fecha_modificacion?: string
}

export type SumarioConceptoFacturacionDTO = Omit<
  ConceptoFacturacionDTO,
  'habilitado' | 'fecha_alta' | 'fecha_modificacion'
>

export type CrearConceptoFacturacionDTO = Omit<
  ConceptoFacturacionDTO,
  'id' | 'fecha_alta' | 'fecha_modificacion'
>

export type ConceptoFacturacionDetalleState = DetalleStateComponent<ConceptoFacturacionDTO> & {
  habilitado: string
  handleChange?: (event: SelectChangeEvent) => void
  isDisabling?: boolean
  conceptoSelected?: ConceptoFacturacionDTO
  onEditar?: () => void
}

//** Initial State */
export const ConceptoFacturacionStateComponentIS: ConceptoFacturacionDetalleState = {
  ...detalleStateComponentIS,
  habilitado: ''
}

export const conceptoFacturacionIS: ConceptoFacturacionDTO = {
  nombre: '',
  productos: [],
  grupo: GrupoConceptoFacturacion.COMISION,
  codigo: CodigosDeConceptosFacturacion.COM_01,
  cuenta_contable: '',
  impuesto: {
    nombre: '',
    alicuota: 0,
    cuenta_contable: 0,
    moneda: []
  },
  habilitado: true
}
