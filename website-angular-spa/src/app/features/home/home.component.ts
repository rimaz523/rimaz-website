import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { RouterLink } from '@angular/router'

import { ArticlePreviewListComponent } from '@features/article/components/article-preview-list/article-preview-list.component'
import { HeroComponent } from '@features/hero/hero.component'
import { SocialHandlesBandComponent } from '@features/social/components/social-handles-band/social-handles-band.component'
import { RouterTokens } from 'app/app.routes'

@Component({
  selector: 'rmz-home',
  imports: [
    HeroComponent,
    SocialHandlesBandComponent,
    ArticlePreviewListComponent,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly routerTokens = RouterTokens
}
