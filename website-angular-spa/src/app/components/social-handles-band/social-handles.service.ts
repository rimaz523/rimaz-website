import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ISocialHandle } from '@models/social-handle.model'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SocialHandlesService {
  constructor(private http: HttpClient) {}

  getSocialHandles(): Observable<ISocialHandle[]> {
    return this.http.get<ISocialHandle[]>(
      'https://rimaz-dev-backend-apim.azure-api.net/v1/api/socialhandles',
      {
        headers: {
          'ocp-apim-subscription-key': 'f7c3ca94b5b94e6ab7bec64a983c3fb9',
        },
      },
    )
  }
}
