import { OperationStatus } from '@shared/constants/app.constants'
import { ErrorModel } from './error.model'

export interface Result<T> {
  data: T | undefined
  status: OperationStatus.success | OperationStatus.error | OperationStatus.loading
  error?: ErrorModel
}
