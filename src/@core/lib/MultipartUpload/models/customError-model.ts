abstract class CustomError extends Error {
  public ERR_CODE?: string
  public ERR_SUGGESTIONS?: Array<string>
  public ERR_MESSAGE?: Error

  constructor(err?: Error) {
    super()
    this.ERR_MESSAGE = err
    this.stack = err?.stack
    this.name = err?.name || ''
  }
}

export { CustomError }
