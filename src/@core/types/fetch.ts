export interface FetchErrorTypes {
  data?: {
    error: {
      message: string | undefined
      context: string | undefined
    }
  }
  error?: {
    message: string
  }
  status?: any
  originalArgs?: { nombre_archivo: string }
  message?: string | undefined
}

export type FetchBaseQueryResult =
  | {
      data: any
      error?: undefined
      meta?: { request: Request; response: Response }
    }
  | {
      error: {
        status: number
        data: any
      }
      data?: undefined
      meta?: { request: Request; response: Response }
    }
