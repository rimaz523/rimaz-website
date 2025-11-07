import { Component, inject, input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { Router } from '@angular/router'
import { MsalService } from '@azure/msal-angular'
import { IArticlePreview } from '@features/article/article-preview.model'
import { MatDialog } from '@angular/material/dialog'

import { environment } from 'environments/environment'
import { DialogComponent } from '@core/layout/dialog/dialog.component'

@Component({
  selector: 'rmz-article-preview',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss',
})
export class ArticlePreviewComponent {
  private router = inject(Router)
  private authService = inject(MsalService)
  readonly articlePreview = input.required<IArticlePreview>()
  readonly dialog = inject(MatDialog)

  cdnUrl: string = environment.cdnUrl

  openArticleLink(url: string, slug: string): void {
    if (this.authService.instance.getAllAccounts().length > 0) {
      if (slug.trim() === '') {
        window.open(url, '_blank')
      } else {
        this.router.navigate(['/article', slug])
      }
    } else {
      this.dialog.open(DialogComponent, {
        data: {
          title: 'Sign in to continue reading',
          content:
            'This article is free to read — just log in to access it. Signing in lets you enjoy unlimited articles, personalized recommendations, and exclusive features at no cost.',
          hasPrimaryAction: true,
          primaryAction: 'Sign In',
          primaryCallbackFn: () => {
            this.authService.loginRedirect()
          },
        },
      })
    }
  }
}
