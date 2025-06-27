import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable } from '@angular/core'
import { ISocialHandle } from '@models/social-handle.model'
import { toSignal } from '@angular/core/rxjs-interop'
import { catchError, map, of, shareReplay } from 'rxjs'
import { Result } from '@models/result.model'
import { ErrorService } from '@core/services/error.service'

@Injectable({
  providedIn: 'root',
})
export class SocialHandlesService {
  private http = inject(HttpClient)
  private errorService = inject(ErrorService)

  private readonly socialHandles$ = this.http
    .get<ISocialHandle[]>('https://rimaz-dev-backend-apim.azure-api.net/v1/api/socialhandles', {
      headers: {
        'ocp-apim-subscription-key': 'f7c3ca94b5b94e6ab7bec64a983c3fb9',
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
