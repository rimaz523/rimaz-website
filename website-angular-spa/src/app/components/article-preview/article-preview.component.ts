import { Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { IArticle } from '@models/article.model'
import { environment } from 'environments/environment'

@Component({
  selector: 'rmz-article-preview',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss',
})
export class ArticlePreviewComponent {
  @Input() article!: IArticle

  public Cdn_Url: string = environment.Cdn_Url

  openLinkInNewTab(url: string) {
    window.open(url, '_blank')
  }
}
