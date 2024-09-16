import {
  DetalleStateComponent,
  ElasticSearchData,
  FormComponentProps,
  ViewComponentProps
} from 'src/@core/types'

//** Enums */
export enum TipoDeProducto {
  FIDECOMISO = 'FIDECOMISO',
  CEDEARS = 'CEDEARS',
  CUSTODIA = 'CUSTODIA',
  FONDOS = 'FONDOS'
}

//** Models */
export type ProductoDTO = {
  id?: string
  nombre: string
  cuenta_contable: number
  responsable_comercial: ResponsableComercial
  fecha_alta?: string
  fecha_modificacion?: string
}

export type ResponsableComercial = {
  nombre: string
  email: string
  telefono: number
}

export interface FiltrosProductoDTO {
  filtros?: [{ campo: 'nombre'; valor: string }]
  orden?: [{ campo: 'nombre'; valor: string }]
}

export type CrearProductoDTO = Omit<ProductoDTO, 'fecha_modificacion' | 'fecha_alta'>
export type ModificarProductoDTO = CrearProductoDTO

export interface FiltrosProductoDTO {
  filtros?: [{ campo: 'nombre'; valor: string }]
  orden?: [{ campo: 'nombre'; valor: string }]
}

export type ProductoDetalleState = DetalleStateComponent<ProductoDTO> & {
  onEditar?: () => void
  onDelete?: () => void
}

export type ProductosViewProps = ViewComponentProps<ElasticSearchData<ProductoDTO>>

export type ProductoFormComponentProps = FormComponentProps<
  ProductoDTO,
  CrearProductoDTO,
  ModificarProductoDTO
>

//** Initial State */
export const ResponsableComercialIS: ResponsableComercial = {
  nombre: '',
  email: '',
  telefono: 0
}

export const ProductoIS: ProductoDTO = {
  id: '',
  nombre: '',
  cuenta_contable: 0,
  responsable_comercial: ResponsableComercialIS,
  fecha_alta: '',
  fecha_modificacion: ''
}

export const FiltrosProductoIS: FiltrosProductoDTO = {
  filtros: [{ campo: 'nombre', valor: '' }],
  orden: [{ campo: 'nombre', valor: '' }]
}

export const ProductoFormComponentPropsIS: ProductoFormComponentProps = {
  accion: '',
  loading: false,
  data: ProductoIS
}
