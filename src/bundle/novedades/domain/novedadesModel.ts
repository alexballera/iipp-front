import { SelectChangeEvent } from '@mui/material'
import { DetalleStateComponent, detalleStateComponentIS } from 'src/@core/types'

export enum CategoriaClienteNovedad {
  INTERFAZ = 'INTERFAZ'
}

export enum CategoriaNotaDebito {
  NOTA_DEBITO = 'NOTA_DEBITO',
  NOTA_CREDITO = 'NOTA_CREDITO'
}

export enum TipoDeProducto {
  FIDECOMISO = 'FIDECOMISO',
  CEDEARS = 'CEDEARS',
  CUSTODIA = 'CUSTODIA',
  FONDOS = 'FONDOS'
}

export enum CategoriasOperacionParaCustodia {
  OPERACIONES_BONY = 'OPERACIONES_BONY',
  OPERACIONES_TRESURY = 'OPERACIONES_TRESURY',
  OPERACIONES_SGM = 'OPERACIONES_SGM'
}

export enum EstadoDeNovedad {
  EN_EJECUCION = 'EN_PROCESO',
  EJECUTADA = 'EJECUTADA',
  CON_ERROR = 'CON_ERROR',
  ANULADA = 'ANULADA',
  OK = 'OK'
}

export enum TipoNovedad {
  OPERACION = 'OPERACION',
  NOTA_DEBITO = 'NOTA_DEBITO',
  CLIENTE = 'CLIENTE'
}

export const getEstadoNovedadTexto = (estado: string) => {
  if (estado === undefined) return 'Sin estado'

  return {
    EN_EJECUCION: 'EN_PROCESO',
    EJECUTADA: 'EJECUTADA',
    CON_ERROR: 'CON_ERROR',
    ANULADA: 'ANULADA',
    OK: 'OK',
    default: 'SIN ESTADO'
  }[estado.toUpperCase() || 'default']
}

export const getEstadoNovedadColor = (estado: string) => {
  if (estado === undefined) return

  //** color: primary, secondary, success, error, warning, info */

  switch (estado.toUpperCase()) {
    case 'EJECUTADA':
      return 'info'
    case 'EN_EJECUCION':
      return 'secondary'
    case 'CON_ERROR':
      return 'error'
    case 'ANULADA':
      return 'warning'
    case 'OK':
      return 'primary'

    default:
      return
  }
}

export type CategoriaNovedad =
  | CategoriasOperacionParaCustodia
  | CategoriaNotaDebito
  | CategoriaClienteNovedad

export type ArchivoNovedad = {
  id: string
  ubicacion: string
  nombre_original?: string
  cantidad_registros?: number
}

export type NovedadDTO = {
  id: string
  tipo_novedad: TipoNovedad
  producto: TipoDeProducto | null
  categoria: CategoriaNovedad | ''
  fecha_alta: string
  fecha_modificacion?: string
  archivo_entrada: ArchivoNovedad[]
  archivo_salida?: ArchivoNovedad | ''
  estado: EstadoDeNovedad
  errores: any[]
}

export type CrearNovedadDTO = Pick<NovedadDTO, 'archivo_entrada' | 'categoria' | 'producto'>

export type ModificarNovedadDTO = CrearNovedadDTO & { id: string }

export type NovedadDetalleState = DetalleStateComponent<NovedadDTO> & {
  handleChange?: (event: SelectChangeEvent) => void
  isDisabling?: boolean
  conceptoSelected?: NovedadDTO
  onEditar?: () => void
}

//** Initial State */
export const NovedadStateComponentIS: NovedadDetalleState = {
  ...detalleStateComponentIS
}

export const novedadIS: NovedadDTO = {
  id: '',
  tipo_novedad: TipoNovedad.CLIENTE,
  producto: null,
  categoria: '',
  fecha_alta: '',
  fecha_modificacion: '',
  archivo_entrada: [],
  archivo_salida: '',
  estado: EstadoDeNovedad.CON_ERROR,
  errores: []
}
