import { Component } from '@angular/core'
import { ArticlePreviewListComponent } from '@features/article/components/article-preview-list/article-preview-list.component'

@Component({
  selector: 'rmz-articles',
  imports: [ArticlePreviewListComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent {}
