import { Component, inject } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router'

import { ThemeService } from '@core/services/theme.services'
import { RouterTokens } from '../../../app.routes'
import { SideMenuService } from '@core/services/side-menu.service'

@Component({
  selector: 'rmz-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private themeService = inject(ThemeService)
  private sideMenuService = inject(SideMenuService)

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

  toggleSidenav(): void {
    if (this.sideMenuService.isOpen()) {
      this.sideMenuService.closeSidenav()
    } else {
      this.sideMenuService.openSidenav()
    }
  }
}
