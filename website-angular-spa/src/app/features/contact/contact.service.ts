import { inject, Injectable } from '@angular/core'
import { IMessage } from './message.model'
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment'
import { ApiRoutes, OperationStatus } from '@shared/constants/app.constants'
import { catchError, map, Observable, of } from 'rxjs'
import { Result } from '@core/models/result.model'
import { ErrorService } from '@core/services/error.service'

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient)
  private errorService = inject(ErrorService)

  sendMessage(message: IMessage): Observable<Result<undefined>> {
    return this.http.post(`${environment.integrationsApimUrl}${ApiRoutes.message}`, message).pipe(
      map(() => {
        return { data: undefined, status: OperationStatus.success } as Result<undefined>
      }),
      catchError(error =>
        of({
          data: undefined,
          error: this.errorService.getErrorModel(error),
          status: OperationStatus.error,
        } as Result<undefined>),
      ),
    )
  }
}
