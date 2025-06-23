import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { ISocialHandle } from '@models/social-handle.model'

@Injectable({
  providedIn: 'root',
})
export class SocialHandlesService {
  private http = inject(HttpClient)
  readonly socialHandles$ = this.http.get<ISocialHandle[]>(
    'https://rimaz-dev-backend-apim.azure-api.net/v1/api/socialhandles',
    {
      headers: {
        'ocp-apim-subscription-key': 'f7c3ca94b5b94e6ab7bec64a983c3fb9',
      },
    },
  )
}
