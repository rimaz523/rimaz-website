import { Component, Input } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { IArticle } from '@models/article.model'

@Component({
  selector: 'rmz-article-preview',
  imports: [MatCardModule],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss',
})
export class ArticlePreviewComponent {
  @Input() article!: IArticle
}
