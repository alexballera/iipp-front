import { CategoriaArchivoEnum, TokenEnum, UbicacionDocumentoEnum } from 'src/@core/enums'
import { SIZE_SLIP_5MB, SIZE_SLIP_OVER_5MB } from './constants'
import { UploadCanceledError, UploadNotCanceledError } from './errors'
import { blobToBase64, splitArrayBuffer, splitBlobToString, stractDataBase64 } from './functions'
import {
  BodyType,
  CompleteMultipartUpload,
  FileSlice,
  InitMultipartUpload,
  PartMultipartUpload,
  SuccessMultipartUpload
} from './types'
import { ApiResponse } from './types/ApiResponse-type'

class MultipartUpload {
  private fileName?: string
  private uploadId?: string
  private _file?: File

  constructor(
    private url: string,
    private contenedorId: UbicacionDocumentoEnum,
    private fileCategory?: CategoriaArchivoEnum
  ) {}

  set file(file: File) {
    if (!file) {
      throw Error('file is required')
    }
    if (!(file instanceof File)) {
      throw Error('file must be a File')
    }
    this._file = file
  }

  get file(): File {
    return <File>this._file
  }

  /**
   * @throws {Error}
   */
  async multipartUpload(
    file: File,
    identifier: string,
    fileCategory: string,
    isBase64: boolean
  ): Promise<SuccessMultipartUpload> {
    try {
      let requestParts: Array<PartMultipartUpload>
      this.file = file
      await this._initMultipartUpload(identifier, fileCategory, `.${file.name.split('.').pop()}`)

      if (isBase64) {
        requestParts = await this._addMultipartUploadBase64()
      } else {
        requestParts = await this._addMultipartUpload()
      }

      return await this._completeMultiUpload(requestParts)
    } catch (err) {
      if (
        this.uploadId &&
        !(err instanceof UploadNotCanceledError) &&
        !(err instanceof UploadCanceledError)
      ) {
        await this._cancelMultiUpload('Error_MultipartUpload')
      }
      throw err
    }
  }

  private async _initMultipartUpload(
    identifier: string,
    fileCategory: string,
    fileExtension?: string
  ): Promise<InitMultipartUpload> {
    const bodyReq: BodyType = {
      id: identifier,
      accion: 'iniciar',
      extension: fileExtension,
      tipo_contenido: this.file.type,
      categoria_archivo: fileCategory,
      contenedor_id: this.contenedorId
    }

    const {
      body: { nombre_archivo, carga_id }
    } = await this._requestMultipartUpload(JSON.stringify(bodyReq))
    this.fileName = nombre_archivo
    this.uploadId = carga_id

    return {
      Key: nombre_archivo,
      UploadId: carga_id
    }
  }

  private async _addMultipartUpload(): Promise<Array<PartMultipartUpload>> {
    const promisesRequestParts: Array<Promise<ApiResponse>> = []
    const file = this.file
    const slices = splitArrayBuffer(await file.arrayBuffer(), SIZE_SLIP_5MB)
    slices.forEach((slice: FileSlice) => {
      const params = `nombre_archivo=${this.fileName}&carga_id=${this.uploadId}&numero_parte=${slice.number}&accion=agregar_parte&categoria_archivo=${this.fileCategory}`
      promisesRequestParts.push(this._requestMultipartUpload(slice.blob, params))
    })

    const requestParts = await Promise.all(promisesRequestParts)

    return requestParts.map(reqPart => {
      return {
        numero_parte: reqPart.body.numero_parte,
        e_tag: reqPart.body.e_tag
      }
    })
  }

  private async _addMultipartUploadBase64(): Promise<Array<PartMultipartUpload>> {
    const promisesRequestParts: Array<Promise<ApiResponse>> = []
    const fileInBase64 = await blobToBase64(this.file)
    const { metadata } = stractDataBase64(fileInBase64)
    const slices = await splitBlobToString(metadata, SIZE_SLIP_OVER_5MB)
    slices.forEach((slice: FileSlice) => {
      const params = {
        nombre_archivo: this.fileName,
        carga_id: this.uploadId,
        numero_parte: slice.number,
        accion: 'agregar_parte',
        categoria_archivo: this.fileCategory,
        base_64: slice.blob,
        contenedor_id: this.contenedorId
      }
      promisesRequestParts.push(this._requestMultipartUpload(JSON.stringify(params)))
    })

    const requestParts = await Promise.all(promisesRequestParts)

    return requestParts.map((reqPart, index) => {
      return {
        e_tag: reqPart.body.e_tag,
        numero_parte: ++index
      }
    })
  }

  private async _completeMultiUpload(
    partes: PartMultipartUpload[]
  ): Promise<CompleteMultipartUpload> {
    const bodyReq: BodyType = {
      extension: `.${this.file.name.split('.').pop()}`,
      tipo_contenido: this.file.type,
      nombre_archivo: this.fileName,
      categoria_archivo: this.fileCategory,
      carga_id: this.uploadId,
      accion: 'finalizar',
      partes,
      contenedor_id: this.contenedorId
    }

    const { body, statusCode } = await this._requestMultipartUpload(JSON.stringify(bodyReq))

    if (statusCode >= 400) {
      await this._cancelMultiUpload('Error_Complete')
    }

    return {
      url: body.carga_id,
      e_tag: body.e_tag
    }
  }

  private async _cancelMultiUpload(cause: string): Promise<void> {
    const bodyReq: BodyType = {
      nombre_archivo: this.fileName,
      carga_id: this.uploadId,
      accion: 'cancelar',
      contenedor_id: this.contenedorId
    }
    const { statusCode } = await this._requestMultipartUpload(JSON.stringify(bodyReq))
    if (statusCode >= 200) {
      throw new UploadNotCanceledError(this.uploadId, cause)
    }
    throw new UploadCanceledError(this.uploadId, cause)
  }

  private async _requestMultipartUpload(body: any, params?: string): Promise<ApiResponse> {
    try {
      const access_token = localStorage.getItem(TokenEnum.access_token)
      const url = params ? `${this.url}/carga-por-partes?${params}` : `${this.url}/carga-por-partes`
      const res = await fetch(url, {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${access_token}`
        }
      })

      return {
        statusCode: res.status,
        body: await res.json()
      }
    } catch (error) {
      console.error('_requestMultipartUpload.error:', error)
      throw Error('error request')
    }
  }
}

export default MultipartUpload
