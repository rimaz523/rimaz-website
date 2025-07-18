import { Component, input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { IArticle } from '@features/article/article.model'

import { environment } from 'environments/environment'

@Component({
  selector: 'rmz-article-preview',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss',
})
export class ArticlePreviewComponent {
  readonly article = input.required<IArticle>()

  cdnUrl: string = environment.cdnUrl

  openLinkInNewTab(url: string) {
    window.open(url, '_blank')
  }
}
