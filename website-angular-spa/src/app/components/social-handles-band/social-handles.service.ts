import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { ISocialHandle } from '@models/social-handle.model'
import { toSignal } from '@angular/core/rxjs-interop'
import { shareReplay } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SocialHandlesService {
  private http = inject(HttpClient)
  private readonly socialHandles$ = this.http
    .get<ISocialHandle[]>('https://rimaz-dev-backend-apim.azure-api.net/v1/api/socialhandles', {
      headers: {
        'ocp-apim-subscription-key': 'f7c3ca94b5b94e6ab7bec64a983c3fb9',
      },
    })
    .pipe(shareReplay(1))

  readonly socialHandles = toSignal(this.socialHandles$, { initialValue: [] as ISocialHandle[] })
}
