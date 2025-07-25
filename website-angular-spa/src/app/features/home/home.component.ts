import { Component } from '@angular/core'

import { ArticlePreviewListComponent } from '@features/article/components/article-preview-list/article-preview-list.component'
import { HeroComponent } from '@features/hero/hero.component'
import { SocialHandlesBandComponent } from '@features/social/components/social-handles-band/social-handles-band.component'

@Component({
  selector: 'rmz-home',
  imports: [HeroComponent, SocialHandlesBandComponent, ArticlePreviewListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
