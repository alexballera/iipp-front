import { ResponseMeMs, ResponsePhotoMeMs } from 'src/bundle/user/data/msGraphApiService'
import { RoleIdEnum } from '../core/userEnum'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export enum SQSMessageContext {
  NOVEDAD = 'NOVEDAD',
  CONCILIACION = 'CONCILIACION',
  NOVEDAD_FALTANTE = 'NOVEDAD_FALTANTE',
  OFICIO = 'OFICIO',
  AOJ = 'AOJ'
}

export enum Status {
  ERROR = 'ERROR',
  EXITO = 'EXITO'
}

export type Configuracion = {
  id: string
  contexto: SQSMessageContext
  status: Status
}

export type ConfiguracionTypes = {
  contexto: string
  status: string
}

export type UserDataType = {
  usuario: string
  email: string
  configuracion_general?: Configuracion[]
  configuracion_notificacion?: Configuracion[]
  role?: RoleTypes
}

export type RoleTypes = {
  roleId: RoleIdEnum
  tenantId: string
  policies: PoliticaAutorizacion[]
}

export type PoliticaAutorizacion = {
  actions: string[]
  effect: string
  resource: string
  conditions?: any[]
  factors?: any
  sourceIp?: any
  views?: View[]
}

export type View = {
  actions: string[]
  entrypoint: string
}

export type LoginParams = {
  email: string
  password: string
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type AuthValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  logout: () => void
  isInitialized: boolean
  user: UserDataType | null
  setUser: (value: UserDataType | null) => void
  setIsInitialized: (value: boolean) => void
  views?: View[]
}

export const userDataMeMeIS: ResponseMeMs = {
  id: '',
  jobTitle: '',
  displayName: '',
  givenName: '',
  mail: '',
  mobilePhone: '',
  officeLocation: '',
  preferredLanguage: '',
  surname: '',
  userPrincipalName: ''
}

export const userPictureMeMsIS: ResponsePhotoMeMs = {
  photo: ''
}

export const UserDataIS: UserDataType | null = null
