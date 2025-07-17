import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { ErrorModel } from '@core/models/error.model'
import { ErrorMessages } from '@shared/constants/app.constants'

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  getErrorModel(genericError: unknown): ErrorModel {
    const error: ErrorModel = {
      message: ErrorMessages.unknown,
      statusCode: undefined,
    }

    if (genericError instanceof HttpErrorResponse) {
      error.message = genericError.error.message
      error.statusCode = genericError.error.statusCode
    } else if (genericError instanceof Error) {
      error.message = genericError.message
    }
    return error
  }
}
