import { Component, effect, inject, signal } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

import { ArticleService } from './article.service'
import { Result } from '@core/models/result.model'
import { IArticle } from '@features/article/article.model'
import { OperationStatus } from '@shared/constants/app.constants'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'rmz-article',
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  private sanitizer = inject(DomSanitizer)
  private articleService = inject(ArticleService)
  private route = inject(ActivatedRoute)
  private slug = ''

  readonly article = signal<Result<IArticle | undefined>>({
    data: undefined,
    status: OperationStatus.loading,
  })
  readonly sanitizedContent = signal<SafeHtml>('')

  constructor() {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? ''
    effect(() => {
      this.articleService.getArticleBySlug(this.slug).subscribe(result => {
        this.article.set(result)
        const rawHtml = result.data?.content ?? ''
        this.sanitizedContent.set(this.sanitizer.bypassSecurityTrustHtml(rawHtml))
      })
    })
  }
}
