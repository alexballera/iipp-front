import { UbicacionDocumentoEnum } from 'src/@core/enums'
import { ACTION_MULTIPART_UPLOAD } from '../constants'

export type InitMultipartUpload = {
  UploadId: string
  Key: string
}

export type AddPartMultipartUpload = {
  type: ACTION_MULTIPART_UPLOAD.addPart
  Bucket: string
  Key: string
  UploadId: string
  buffer: any
  PartNumber: number
}

export type CompleteMultipartUpload = {
  url: string
  e_tag: string
}

export type CancelMultipartUpload = {
  type: ACTION_MULTIPART_UPLOAD.cancel
  Bucket: string
  Key: string
  UploadId: string
}

export type PartMultipartUpload = {
  e_tag: string
  numero_parte: number
}

export type SuccessMultipartUpload = {
  url: string
  e_tag: string
}

export type BodyType = {
  id?: string
  extension?: string
  tipo_contenido?: string
  categoria_archivo?: string
  nombre_archivo?: string
  carga_id?: string
  numero_parte?: number
  accion?: string
  partes?: PartMultipartUpload[]
  contenedor_id: UbicacionDocumentoEnum
}

export type PayloadMultipartUpload =
  | InitMultipartUpload
  | AddPartMultipartUpload
  | CompleteMultipartUpload
  | CancelMultipartUpload
