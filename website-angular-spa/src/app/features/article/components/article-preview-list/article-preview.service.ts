import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { catchError, map, of } from 'rxjs'

import { Result } from '@core/models/result.model'
import { ErrorService } from '@core/services/error.service'
import { environment } from 'environments/environment'
import { IArticlePreview } from '@features/article/article-preview.model'
import { ApiRoutes, OperationStatus } from '@shared/constants/app.constants'

@Injectable({
  providedIn: 'root',
})
export class ArticlePreviewService {
  private http = inject(HttpClient)
  private errorService = inject(ErrorService)

  private readonly getArticlePreviews$ = this.http
    .get<IArticlePreview[]>(`${environment.integrationsApimUrl}${ApiRoutes.articlePreviews}`)
    .pipe(
      map(data => ({ data: data, error: undefined }) as Result<IArticlePreview[]>),
      catchError(error =>
        of({
          data: [],
          status: OperationStatus.error,
          error: this.errorService.getErrorModel(error),
        } as Result<IArticlePreview[]>),
      ),
    )

  private readonly allArticlePreviewsResult = toSignal(this.getArticlePreviews$, {
    initialValue: { data: [], status: OperationStatus.success } as Result<IArticlePreview[]>,
  })

  readonly articlePreviews = computed(() => this.allArticlePreviewsResult().data?.slice(0, 4))
  readonly allArticlePreviewsList = computed(() => this.allArticlePreviewsResult().data)
  readonly getArticlePreviewsError = computed(() => this.allArticlePreviewsResult().error)
}
