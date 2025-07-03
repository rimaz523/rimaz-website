import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable } from '@angular/core'
import { ISocialHandle } from '@models/social-handle.model'
import { toSignal } from '@angular/core/rxjs-interop'
import { catchError, map, of, shareReplay } from 'rxjs'
import { Result } from '@models/result.model'
import { ErrorService } from '@core/services/error.service'
import { environment } from 'environments/environment'
import { ApiRoutes } from '@shared/constants/app.constants'

@Injectable({
  providedIn: 'root',
})
export class SocialHandlesService {
  private http = inject(HttpClient)
  private errorService = inject(ErrorService)

  private readonly socialHandles$ = this.http
    .get<ISocialHandle[]>(`${environment.Integrations_Apim_Url}${ApiRoutes.socialHandles}`, {
      headers: {
        'ocp-apim-subscription-key': environment.Integrations_Apim_Subscription_Key,
      },
    })
    .pipe(
      map(data => ({ data: data, error: undefined }) as Result<ISocialHandle[]>),
      shareReplay(1),
      catchError(error =>
        of({
          data: [],
          error: this.errorService.getErrorModel(error),
        } as Result<ISocialHandle[]>),
      ),
    )

  private socialHandlesResult = toSignal(this.socialHandles$, {
    initialValue: { data: [] } as Result<ISocialHandle[]>,
  })

  socialHandles = computed(() => this.socialHandlesResult().data)
  socialHandlesError = computed(() => this.socialHandlesResult().error)
}
