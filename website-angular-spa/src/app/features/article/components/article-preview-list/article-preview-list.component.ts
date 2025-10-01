import { Component, effect, inject, input, signal } from '@angular/core'
import { MatGridListModule } from '@angular/material/grid-list'

import { ArticlePreviewComponent } from '@features/article/components/article-preview/article-preview.component'
import { ArticlePreviewService } from './article-preview.service'
import { IArticlePreview } from '@features/article/article-preview.model'

@Component({
  selector: 'rmz-article-preview-list',
  imports: [ArticlePreviewComponent, MatGridListModule],
  templateUrl: './article-preview-list.component.html',
  styleUrl: './article-preview-list.component.scss',
})
export class ArticlePreviewListComponent {
  private articlePreviewService = inject(ArticlePreviewService)

  readonly isPreview = input.required<boolean>()
  readonly articlePreviews = signal<IArticlePreview[] | undefined>([])

  constructor() {
    effect(() => {
      this.articlePreviews.set(
        this.isPreview()
          ? this.articlePreviewService.articlePreviews()
          : this.articlePreviewService.allArticlePreviewsList(),
      )
    })
  }
}
