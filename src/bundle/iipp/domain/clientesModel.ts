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
  Jurisdiccion,
  MonedaEnum,
  order
} from 'src/bundle/shared/domain'

export type DataGridPercepcionesProps = {
  percepciones: ImpuestoTypes[]
}

export type DataGridImpuestosProps = {
  impuestos: ImpuestoTypes[]
}

export type DataGridDocumentosProps = {
  documentos: NumeroCuenta[]
}

export type DataGridCorreosProps = {
  correos: string[]
}

export enum CategoriaDeProductoCustodia {
  OPERACIONES_BONY = 'OPERACIONES_BONY',
  OPERACIONES_TRESURY = 'OPERACIONES_TRESURY',
  OPERACIONES_SGM = 'OPERACIONES_SGM'
}

export enum TipoOperador {
  SUMA = '+',
  RESTA = '-',
  MAYOR_QUE = '>',
  MENOR_QUE = '<',
  ENTRE = '><',
  PORCENTAJE = '%',
  MULTIPLICACION = 'x'
}

export enum TipoCondicion {
  POR_UNIDAD = 'PU',
  POR_SUMATORIA = 'PS'
}

export const TipoOperadorLabels = {
  [TipoOperador.SUMA]: 'SUMA',
  [TipoOperador.RESTA]: 'RESTA',
  [TipoOperador.MAYOR_QUE]: 'MAYOR QUE',
  [TipoOperador.MENOR_QUE]: 'MENOR QUE',
  [TipoOperador.ENTRE]: 'ENTRE',
  [TipoOperador.PORCENTAJE]: 'PORCENTAJE',
  [TipoOperador.MULTIPLICACION]: 'MULTIPLICACION'
}

export const TipoCondicionLabels = {
  [TipoCondicion.POR_UNIDAD]: 'Cantidad',
  [TipoCondicion.POR_SUMATORIA]: 'Sumatoria del Monto'
}

export enum AplicacionParametria {
  MONTO_TOTAL_DEUDA = 'MONTO_TOTAL_DEUDA',
  CANTIDAD_OPERACIONES = 'CANTIDAD_OPERACIONES',
  TENENCIA_CLIENTE = 'TENENCIA_CLIENTE'
}

export enum TipoParametriaComercial {
  ESPECIAL = 'ESPECIAL',
  ESTANDAR = 'ESTANDAR'
}

export enum TipoOperacionParametria {
  BONIFICACION = 'BONIFICACION',
  COSTO = 'COSTO'
}

export enum TipoMercado {
  LOCAL = 'LOCAL',
  EXTERIOR = 'EXTERIOR'
}

export enum TipoClienteEnum {
  NACIONAL = 'NACIONAL',
  EXTERIOR = 'EXTERIOR'
}

export enum JurisdiccionEnum {
  NACIONAL = 'NACIONAL',
  EXTERIOR = 'EXTERIOR'
}

export enum ProductosEnum {
  CEDEARS = 'CEDEARS',
  CUSTODIA = 'CUSTODIA',
  FIDEICOMISOS = 'FIDEICOMISOS',
  FONDOS = 'FONDOS'
}

export type ParametriaComercialDTO = {
  id: string
  producto: any
  concepto: any
  aplicacion: AplicacionParametria

  // cuenta_contable: string
  // impuesto: string
  // moneda: string
  // calculo: string
  cliente_id: string
  fecha_alta: string
  precio?: number
  costo?: number
  maximo?: number
  minimo?: number
  monto_deuda?: number
  fecha_vigencia_inicio?: string
  fecha_vigencia_fin?: string
}

export type CrearParametriaComercialDTO = Omit<
  ParametriaComercialDTO,
  'fecha_alta' | 'fecha_modificacion'
> & {
  cliente_id: string
}

export type ModificarParametriaComercialDTO = CrearParametriaComercialDTO
export type EliminarParametriaComercialDTO = {
  cliente_id: string
  id: string
}

export const TipoDocumento = ['CUIT', 'CUIL', 'Código CNV', 'DNI', 'PASAPORTE']

export interface EmailDTO {
  email: string
  fecha_alta: Date
  marca_de_preferido: boolean
  razon_social: string
  secuencia: number
  uso: {
    codigo: number
    descripcion: string
  }
}
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
  tipo_cliente?: TipoClienteEnum
  archivo?: any
  cliente_banco?: boolean
  cliente_completo?: boolean
  fecha_alta?: string
  fecha_modificacion?: string
  habilitado?: boolean
  impuesto?: ImpuestoTypes
  percepcion?: ImpuestoTypes
  impuestos?: ImpuestoTypes[]
  percepciones?: ImpuestoTypes[]
  datos_incompletos?: string[]
  parametrias?: ParametriaComercialDTO[]
  archivos?: Archivo[]
  productos?: string[]
  minimo?: number
}

export interface ClienteDatosExterno {
  datos_personales: {
    habilitado: boolean
    tipo_cliente: {
      codigo: string
      descripcion: string
    }
    tipo_documento: number
    numero_documento: string
    tipo_persona: string
    apellido: string
    nombre: string
    razon_social: string
  }
  direcciones: DireccionApi[]
  emails: EmailDTO[]
  datos_impositivos: {
    iva: {
      condicion: string
      percepcion: number
      percepcion_exclusion: number
      jurisdicciones: Jurisdiccion[]
    }
    impuesto_ganancias: {
      condicion: number
      exclusion: boolean
      porcentaje_exclusion: number
      jurisdicciones: Jurisdiccion[]
    }
    ingresos_brutos: {
      condicion: string
      numero: number
      jurisdicciones: Jurisdiccion[]
    }
  }
  datos_adicionales: {
    empleado_del_banco: boolean
  }
}

export interface ClienteFiltrosDTO {
  filtros?: filtros[]
  orden?: order[]
}

export type ClienteFiltrosProps = FiltrosProps<ClienteFiltrosDTO>

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

export const parametriaIS: ParametriaComercialDTO = {
  id: '',
  producto: '',
  concepto: {
    id: '',
    nombre: '',
    productos: [],
    cuenta_contable: '',
    impuesto: {
      nombre: '',
      alicuota: 0,
      cuenta_contable: 0,
      moneda: []
    }
  },
  aplicacion: AplicacionParametria.CANTIDAD_OPERACIONES,

  // cuenta_contable: '',
  // impuesto: '',
  // moneda: '',
  // calculo: '',
  fecha_alta: '',
  cliente_id: '',
  precio: 0,
  costo: 0,
  maximo: 0,
  minimo: 0
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
  numero_documento: [],
  direccion: DireccionIS,
  email: '',
  nombre_referente: '',
  telefono: '',
  idioma_factura: IdiomaEnum.ES,
  moneda: MonedaEnum.ARS,
  tipo_cliente: TipoClienteEnum.NACIONAL,
  impuesto: ImpuestoTypesIS,
  percepcion: ImpuestoTypesIS,
  impuestos: [],
  percepciones: [],
  archivos: [],
  parametrias: [],
  datos_incompletos: [],
  cliente_banco: true,
  productos: [],
  fecha_alta: '',
  fecha_modificacion: ''
}

export const ClientesFiltrosIS: ClienteFiltrosDTO = {
  filtros: [
    { campo: 'cliente_completo', valor: '' },
    { campo: 'numero_documento', valor: '' },
    { campo: 'nombre', valor: '' }
  ],
  orden: []
}
