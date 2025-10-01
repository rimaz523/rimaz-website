import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, map, Observable, of } from 'rxjs'

import { Result } from '@core/models/result.model'
import { ErrorService } from '@core/services/error.service'
import { environment } from 'environments/environment'
import { IArticle } from '@features/article/article.model'
import { ApiRoutes, OperationStatus } from '@shared/constants/app.constants'

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private http = inject(HttpClient)
  private errorService = inject(ErrorService)

  getArticleBySlug(slug: string): Observable<Result<IArticle | undefined>> {
    return this.http
      .get(`${environment.integrationsApimUrl}${ApiRoutes.article}?slug=${slug}&source=wordpress`)
      .pipe(
        map(data => {
          return { data: data as IArticle, status: OperationStatus.success } as Result<IArticle>
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
