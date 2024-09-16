import { SelectChangeEvent } from '@mui/material'
import {
  DetalleStateComponent,
  ElasticSearchData,
  FiltrosProps,
  ViewComponentProps,
  detalleStateComponentIS
} from 'src/@core/types'
import { CobranzasDTO } from 'src/bundle/cobranzas/domain/cobranzasModel'
import { NotaDTO } from 'src/bundle/facturacion/domain'
import { filtros, order } from 'src/bundle/shared/domain'

export type DataGridCobranzasProps = {
  cobranzas: CobranzasDTO[]
}

export type DataGridNotasProps = {
  notas: NotaDTO[]
}

export interface SaldosClienteDTO {
  id: string
  cliente: {
    id: string
    nombre: string
    cuit: string
  }
  importe_total_cobrado: string
  deuda_total: string
  deuda_total_no_vencida: string
  deuda_total_vencida: {
    hasta_treinta: string
    hasta_sesenta: string
    hasta_noventa: string
    mas_noventa: string
  }
  cuenta_contable: string
  nota_debito: NotaDTO[]
  cobranza: CobranzasDTO[]
  observaciones: string
}

export type SaldosClientesViewProps = ViewComponentProps<ElasticSearchData<SaldosClienteDTO>>

export type SaldosClienteDetalleState = DetalleStateComponent<SaldosClienteDTO> & {
  handleChange?: (event: SelectChangeEvent) => void
  isDisabling?: boolean
  conceptoSelected?: SaldosClienteDTO
  handleDetail?: () => void
}

export interface SaldoClienteFiltrosDTO {
  filtros?: filtros[]
  orden?: order[]
}

export type SaldoClienteFiltrosProps = FiltrosProps<SaldoClienteFiltrosDTO>

//** Initial States */
export const SaldosClienteStateComponentIS: SaldosClienteDetalleState = {
  ...detalleStateComponentIS
}

export const saldosClienteIS: SaldosClienteDTO = {
  id: '',
  cliente: {
    id: '',
    nombre: '',
    cuit: ''
  },
  importe_total_cobrado: '',
  deuda_total: '',
  deuda_total_no_vencida: '',
  deuda_total_vencida: {
    hasta_treinta: '',
    hasta_sesenta: '',
    hasta_noventa: '',
    mas_noventa: ''
  },
  cuenta_contable: '',
  nota_debito: [],
  cobranza: [],
  observaciones: ''
}

export const SaldoClienteFiltrosIS: SaldoClienteFiltrosDTO = {
  filtros: [
    { campo: 'nombre', valor: '' },
    { campo: 'numero_documento', valor: '' },
    { campo: 'deuda_total', valor: '' || false },
    { campo: 'deuda_vencida', valor: '' || false },
    { campo: 'deuda_no_vencida', valor: '' || false }
  ],
  orden: []
}
