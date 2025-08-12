import { Component } from '@angular/core'
import { PageTitleComponent } from '@core/layout/page-title/page-title.component'
import { ArticlePreviewListComponent } from '@features/article/components/article-preview-list/article-preview-list.component'

@Component({
  selector: 'rmz-articles',
  imports: [ArticlePreviewListComponent, PageTitleComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent {}
