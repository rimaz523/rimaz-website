import { Component, inject } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { ThemeService } from '@core/services/theme.services'
import { RouterLink } from '@angular/router'
import { RouterTokens } from '../../../app.routes'

@Component({
  selector: 'rmz-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private themeService = inject(ThemeService)

  isDark = false
  readonly routerTokens = RouterTokens

  constructor() {
    this.isDark = this.themeService.getIsDark()
  }

  setDarkMode(): void {
    this.isDark = this.themeService.setDarkMode()
  }
  setLightMode(): void {
    this.isDark = this.themeService.setLightMode()
  }
}
