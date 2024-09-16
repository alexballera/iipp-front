import { DetalleStateComponent, FiltrosProps } from 'src/@core/types'
import { SumarioCobranzaDTO } from 'src/bundle/cobranzas/domain/cobranzasModel'
import { SumarioClienteDTO } from 'src/bundle/parametrias/clientes/domain/clientesModel'
import { TipoDeProducto } from 'src/bundle/parametrias/productos/domain/productosModel'
import { RangoFechaDTO, filtros, order } from 'src/bundle/shared/domain'

//** Enums */
export enum TipoNota {
  DEBITO = 'ND',
  CREDITO = 'NC'
}

export enum EstadoNotaContable {
  GENERADA = 'GENERADA',
  ANULADA = 'ANULADA',
  CANCELADA = 'CANCELADA'
}

//** Models */
export interface ElementoDeNota {
  id: number
  descripcion: string
  cantidad: number
  monto: number
  costo_aplicado: number
  sub_elementos?: SubElementos[]
}

export interface SubElementos {
  descripcion: string
  cantidad: number
  monto: number
}
export interface ConceptoDTO {
  id: string
  nombre: string
  cuenta_contable: string
  productos: string[]
}

export interface NotaDTO {
  id: string
  cliente: SumarioClienteDTO
  monto: number
  moneda: string
  moneda_calculo: string
  conceptos: ConceptoDTO[]
  estado?: string
  fecha_alta: Date
  tipo: TipoNota
  ubicacion_pdf?: string
  producto: TipoDeProducto
  cobranzas?: SumarioCobranzaDTO[]
  elementos?: ElementoDeNota[]
  nota_debito?: SumarioNotaDTO
  nota_credito?: SumarioNotaDTO
  id_compuesto: string
  numero_id?: number
}

export type SumarioNotaDTO = Pick<NotaDTO, 'id' | 'cliente' | 'monto'>

export type GenerarNotaDTO = {
  producto: TipoDeProducto
} & RangoFechaDTO

export interface ResultadoGenerador {
  cantidad: number
  cantidad_errores: number
}

export interface RehacerNotaDTO {
  id?: string
  fecha: Date
}

export interface ResRehacerNotaDTO {
  id: string
  estado: string
  fecha_alta: Date
  monto: number
}

export interface NotaFiltrosDTO {
  filtros?: filtros[]
  orden?: order[]
}

//** Props & States */
export type NotaFiltrosProps = FiltrosProps<NotaFiltrosDTO>

export type NotaDetalleState = DetalleStateComponent<NotaDTO> & {
  onClick?: (id: string) => void
}
