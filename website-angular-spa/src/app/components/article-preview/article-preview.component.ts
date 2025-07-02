import { Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { IArticle } from '@models/article.model'

@Component({
  selector: 'rmz-article-preview',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss',
})
export class ArticlePreviewComponent {
  @Input() article!: IArticle

  openLinkInNewTab(url: string) {
    window.open(url, '_blank')
  }
}
