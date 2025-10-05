import { Component, inject, input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { Router } from '@angular/router'
import { IArticlePreview } from '@features/article/article-preview.model'

import { environment } from 'environments/environment'

@Component({
  selector: 'rmz-article-preview',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss',
})
export class ArticlePreviewComponent {
  private router = inject(Router)
  readonly articlePreview = input.required<IArticlePreview>()

  cdnUrl: string = environment.cdnUrl

  openArticleLink(url: string, slug: string): void {
    if (slug.trim() === '') {
      window.open(url, '_blank')
    } else {
      this.router.navigate(['/article', slug])
    }
  }
}
