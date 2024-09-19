import { SelectChangeEvent } from '@mui/material'
import {
  DetalleStateComponent,
  detalleStateComponentIS,
  ElasticSearchData,
  FiltrosProps,
  FormComponentProps,
  ViewComponentProps
} from 'src/@core/types'
import {
  Archivo,
  DireccionDTO,
  filtros,
  IdiomaEnum,
  ImpuestoTypes,
  MonedaEnum,
  order
} from 'src/bundle/shared/domain'

export const TipoDocumento = ['CUIT', 'CUIL', 'Código CNV', 'DNI', 'PASAPORTE']

export interface DireccionApi {
  pais?: {
    codigo: string
    descripcion: string
  }
  localidad?: {
    codigo: string
    descripcion: string
  }
  provincia?: {
    codigo: string
    descripcion: string
  }
  nombre_calle?: string
  numero_puerta?: string
  piso?: string
  departamento?: string
  codigo_postal?: string
  oficina?: string
  telefono?: string
}

export interface CuentasCliente {
  caja_valores?: string
  custodia_bony?: string
}

export interface NumeroCuenta {
  tipo: string
  valor: string
}

export interface ClienteDTO {
  id: string
  nombre?: string
  cuenta?: CuentasCliente
  numero_documento?: NumeroCuenta[]
  documento?: string
  direccion?: DireccionDTO
  emails?: string[]
  email?: string
  nombre_referente?: string
  telefono?: string
  idioma_factura?: IdiomaEnum
  moneda?: MonedaEnum
  archivo?: any
  cliente_banco?: boolean
  cliente_completo?: boolean
  fecha_alta?: string
  fecha_modificacion?: string
  habilitado?: boolean
  impuesto?: any
  percepcion?: any
  impuestos?: ImpuestoTypes[]
  percepciones?: ImpuestoTypes[]
  datos_incompletos?: string[]
  archivos?: Archivo[]
  productos?: string[]
  minimo?: number
}

export interface IIPPFiltrosDTO {
  filtros?: filtros[]
  orden?: order[]
}

export type ClienteFiltrosProps = FiltrosProps<IIPPFiltrosDTO>

export type CrearClienteDTO = Omit<ClienteDTO, 'fecha_modificacion' | 'fecha_alta' | 'email'> & {
  documentos?: string[]
}

export type ModificarClienteDTO = CrearClienteDTO

export type SumarioClienteDTO = Pick<ClienteDTO, 'id' | 'nombre' | 'numero_documento'>

export type ClientesViewProps = ViewComponentProps<ElasticSearchData<ClienteDTO>>

export type ClienteFormComponentProps = FormComponentProps<
  ClienteDTO,
  CrearClienteDTO,
  ModificarClienteDTO
>

export type ClienteDetalleState = DetalleStateComponent<ClienteDTO> & {
  handleChange?: (event: SelectChangeEvent) => void
  isDisabling?: boolean
  conceptoSelected?: ClienteDTO
  handleDetail?: () => void
}

//** Initial States */
export const ClienteStateComponentIS: ClienteDetalleState = {
  ...detalleStateComponentIS
}

export const SumarioClienteIS: SumarioClienteDTO = {
  id: '',
  nombre: '',
  numero_documento: []
}

export const DireccionIS = {
  pais: '',
  localidad: '',
  provincia: '',
  calle: '',
  numero: '',
  piso: '',
  departamento: '',
  codigo_postal: '',
  oficina: '',
  telefono: ''
}

export const ImpuestoTypesIS = {
  nombre: '',
  condicion: '',
  jurisdiccion: '',
  alicuota: 0,
  habilitado: true,
  fecha_desde: '',
  fecha_hasta: '',
  cuenta_contable: 0
}

export const clienteIS: ClienteDTO = {
  id: '',
  nombre: '',
  cuenta: {
    caja_valores: '',
    custodia_bony: ''
  },
  direccion: DireccionIS,
  email: '',
  nombre_referente: '',
  telefono: '',
  idioma_factura: IdiomaEnum.ES,
  moneda: MonedaEnum.ARS,
  cliente_banco: true,
  fecha_alta: '',
  fecha_modificacion: ''
}

export const IIPPFiltrosIS: IIPPFiltrosDTO = {
  filtros: [
    { campo: 'cliente_completo', valor: '' },
    { campo: 'numero_documento', valor: '' },
    { campo: 'nombre', valor: '' }
  ],
  orden: []
}
