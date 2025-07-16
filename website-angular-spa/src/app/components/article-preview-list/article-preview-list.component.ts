import { Component, inject } from '@angular/core'
import { MatGridListModule } from '@angular/material/grid-list'

import { ArticlePreviewComponent } from '../article-preview/article-preview.component'
import { ArticlePreviewService } from './article-preview.service'

@Component({
  selector: 'rmz-article-preview-list',
  imports: [ArticlePreviewComponent, MatGridListModule],
  templateUrl: './article-preview-list.component.html',
  styleUrl: './article-preview-list.component.scss',
})
export class ArticlePreviewListComponent {
  private articlePreviewService = inject(ArticlePreviewService)
  readonly articlePreviews = this.articlePreviewService.articlePreviews
}
