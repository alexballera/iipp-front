import { CustomError } from '../models/customError-model'
import { ERROR_CODES } from '../constants'

class InvalidConfigParameterError extends CustomError {
  constructor(param: string) {
    super()
    this.ERR_CODE = ERROR_CODES.configuration
    this.message = `Configuration parameter '${param}' is not valid`
  }
}

class UploadCanceledError extends CustomError {
  constructor(uploadId?: string, cause?: string) {
    super()
    this.ERR_CODE = ERROR_CODES.cancelUpload
    this.message = `MultipartUpload ${uploadId} canceled. ${cause}`
  }
}

class UploadNotCanceledError extends CustomError {
  constructor(uploadId?: string, cause?: string) {
    super()
    this.ERR_CODE = ERROR_CODES.cancelUploadError
    this.message = `MultipartUpload ${uploadId} not canceled. ${cause}`
  }
}

class UnidentifiedError extends CustomError {
  constructor(err: Error) {
    super(err)
    this.ERR_CODE = ERROR_CODES.unidentified
  }
}

export {
  InvalidConfigParameterError,
  UploadCanceledError,
  UploadNotCanceledError,
  UnidentifiedError
}
