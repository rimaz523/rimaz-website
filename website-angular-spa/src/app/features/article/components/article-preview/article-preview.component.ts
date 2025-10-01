import { Component, input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { IArticlePreview } from '@features/article/article-preview.model'

import { environment } from 'environments/environment'

@Component({
  selector: 'rmz-article-preview',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss',
})
export class ArticlePreviewComponent {
  readonly articlePreview = input.required<IArticlePreview>()

  cdnUrl: string = environment.cdnUrl

  openLinkInNewTab(url: string) {
    window.open(url, '_blank')
  }
}
