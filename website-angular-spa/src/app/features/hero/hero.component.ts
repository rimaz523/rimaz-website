import { Component, effect, ElementRef, inject, Renderer2 } from '@angular/core'
import { MatCardModule } from '@angular/material/card'

import { ThemeService } from '@core/services/theme.services'
import { CdnRoutes } from '@shared/constants/app.constants'
import { environment } from 'environments/environment'

@Component({
  selector: 'rmz-hero',
  imports: [MatCardModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  private elementRef = inject(ElementRef)
  private renderer = inject(Renderer2)
  private themeService = inject(ThemeService)

  constructor() {
    effect(() => {
      this.renderer.setStyle(
        this.elementRef.nativeElement.querySelector('.hero-container'),
        'background-image',
        this.themeService.getIsDark()
          ? `url(${environment.cdnUrl}${CdnRoutes.heroImageDark})`
          : `url(${environment.cdnUrl}${CdnRoutes.heroImageLight})`,
      )
    })
  }
}
