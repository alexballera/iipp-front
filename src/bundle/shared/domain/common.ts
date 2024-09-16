import { ReactNode } from 'react'

export enum MonedaEnum {
  ARS = 'ARS',
  USD = 'USD'
}

export enum IdiomaEnum {
  ES = 'ES',
  EN = 'EN'
}

export interface DireccionDTO {
  pais?: string | null
  localidad?: string
  provincia?: string
  calle?: string
  numero?: string
  piso?: string
  departamento?: string
  codigo_postal?: string
  oficina?: string
  telefono?: string
}

export interface OptionSelector {
  id?: string | number
  label?: string | ReactNode
  value?: string
}

export interface MenuItemsAccion {
  icon?: ReactNode
  tooltipIcon?: ReactNode
  tooltipText?: string | ReactNode
  title?: any
  actions?: any
  loader?: boolean
  show?: boolean | (() => boolean)
}

export interface Jurisdiccion {
  codigo: number
  nombre: string
}

export interface ImpuestoTypes {
  nombre: string
  condicion: string
  jurisdiccion: string
  alicuota: number
  habilitado?: boolean
  fecha_desde?: string
  fecha_hasta?: string
  cuenta_contable?: number
  moneda?: string[]
}

export interface Archivo {
  id: string
  ubicacion: string
  nombre_original: string
  descripcion?: string
  cantidad_registros?: number
  categoria?: string
  fecha_alta?: string
}

export interface DescargarArchivo {
  contenedor_id: string
  nombre_archivo: string
}

export interface RangoFechaDTO {
  fecha_desde?: Date
  fecha_hasta?: Date
}

//** Initial States */
export const jurisdiccionesMock: Jurisdiccion[] = [
  { codigo: 901, nombre: 'Ciudad de Buenos Aires' },
  { codigo: 902, nombre: 'Provincia de Buenos Aires' },
  { codigo: 903, nombre: 'Catamarca' },
  { codigo: 904, nombre: 'Córdoba' },
  { codigo: 905, nombre: 'Corrientes' },
  { codigo: 906, nombre: 'Chaco' },
  { codigo: 907, nombre: 'Chubut' },
  { codigo: 908, nombre: 'Entre Ríos' },
  { codigo: 909, nombre: 'Formosa' },
  { codigo: 910, nombre: 'Jujuy' },
  { codigo: 911, nombre: 'La Pampa' },
  { codigo: 912, nombre: 'La Rioja' },
  { codigo: 913, nombre: 'Mendoza' },
  { codigo: 914, nombre: 'Misiones' },
  { codigo: 915, nombre: 'Neuquén' },
  { codigo: 916, nombre: 'Río Negro' },
  { codigo: 917, nombre: 'Salta' },
  { codigo: 918, nombre: 'San Juan' },
  { codigo: 919, nombre: 'San Luis' },
  { codigo: 920, nombre: 'Santa Cruz' },
  { codigo: 921, nombre: 'Santa Fe' },
  { codigo: 922, nombre: 'Santiago del Estero' },
  { codigo: 923, nombre: 'Tierra del Fuego' },
  { codigo: 924, nombre: 'Tucumán' }
]
