import { Component, effect, ElementRef, inject, Renderer2 } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

import { PageTitleComponent } from '@core/layout/page-title/page-title.component'
import { CdnRoutes } from '@shared/constants/app.constants'
import { environment } from 'environments/environment'
import { BrowserUtilsService } from '@core/services/browser-utils.service'

@Component({
  selector: 'rmz-about',
  imports: [PageTitleComponent, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  private elementRef = inject(ElementRef)
  private renderer = inject(Renderer2)

  readonly profileImageUrl = `${environment.cdnUrl}/${CdnRoutes.profileImage}`
  readonly downloadResumeUrl = environment.downloadResumeUrl
  readonly browserUtilsService = inject(BrowserUtilsService)

  constructor() {
    effect(() => {
      this.renderer.setStyle(
        this.elementRef.nativeElement.querySelector('.hero__card'),
        'background-image',
        `url(${environment.cdnUrl}/${CdnRoutes.aboutHeroBanner})`,
      )
    })
  }
}
