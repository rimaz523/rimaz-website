import { ErrorModel } from './error.model'

export interface Result<T> {
  data: T | undefined
  error?: ErrorModel
}
