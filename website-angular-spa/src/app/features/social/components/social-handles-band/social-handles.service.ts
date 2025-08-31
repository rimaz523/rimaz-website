import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable } from '@angular/core'
import { ISocialHandle } from '@features/social/social-handle.model'
import { toSignal } from '@angular/core/rxjs-interop'
import { catchError, map, of, shareReplay } from 'rxjs'

import { Result } from '@core/models/result.model'
import { ErrorService } from '@core/services/error.service'
import { environment } from 'environments/environment'
import { ApiRoutes, OperationStatus } from '@shared/constants/app.constants'

@Injectable({
  providedIn: 'root',
})
export class SocialHandlesService {
  private http = inject(HttpClient)
  private errorService = inject(ErrorService)

  private readonly socialHandles$ = this.http
    .get<ISocialHandle[]>(`${environment.integrationsApimUrl}${ApiRoutes.socialHandles}`)
    .pipe(
      map(data => ({ data: data, error: undefined }) as Result<ISocialHandle[]>),
      shareReplay(1),
      catchError(error =>
        of({
          data: [],
          status: OperationStatus.error,
          error: this.errorService.getErrorModel(error),
        } as Result<ISocialHandle[]>),
      ),
    )

  private readonly socialHandlesResult = toSignal(this.socialHandles$, {
    initialValue: { data: [], status: OperationStatus.success } as Result<ISocialHandle[]>,
  })

  readonly socialHandles = computed(() => this.socialHandlesResult().data)
  readonly socialHandlesError = computed(() => this.socialHandlesResult().error)
}
