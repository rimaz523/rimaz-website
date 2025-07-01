import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { catchError, map, of, shareReplay } from 'rxjs'
import { Result } from '@models/result.model'
import { ErrorService } from '@core/services/error.service'
import { environment } from 'environments/environment'
import { IArticle } from '@models/article.model'

@Injectable({
  providedIn: 'root',
})
export class ArticlePreviewService {
  private http = inject(HttpClient)
  private errorService = inject(ErrorService)

  private readonly articlePreviewList$ = this.http
    .get<IArticle[]>(environment.Integrations_Apim_Url + 'blogPreviews?limit=4', {
      headers: {
        'ocp-apim-subscription-key': environment.Integrations_Apim_Subscription_Key,
      },
    })
    .pipe(
      map(data => ({ data: data, error: undefined }) as Result<IArticle[]>),
      shareReplay(1),
      catchError(error =>
        of({
          data: [],
          error: this.errorService.getErrorModel(error),
        } as Result<IArticle[]>),
      ),
    )

  private articlePreviewsResult = toSignal(this.articlePreviewList$, {
    initialValue: { data: [] } as Result<IArticle[]>,
  })

  articlePreviews = computed(() => this.articlePreviewsResult().data)
  articlePreviewsError = computed(() => this.articlePreviewsResult().error)
}
