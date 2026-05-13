export interface ApiResponse<TData = unknown> {
  data: TData
  message?: string
  success?: boolean
  statusCode?: number
}

export interface ApiErrorResponse<TError = unknown> {
  message: string
  errors?: TError
  statusCode?: number
}

export const ApiResponse = undefined
export const ApiErrorResponse = undefined
