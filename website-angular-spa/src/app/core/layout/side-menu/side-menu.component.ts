import { Component, effect, inject, viewChild } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav'
import { SideMenuService } from '@core/services/side-menu.service'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { ThemeService } from '@core/services/theme.services'

import { RouterTokens } from 'app/app.routes'
import { environment } from 'environments/environment'

@Component({
  selector: 'rmz-side-menu',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  private themeService = inject(ThemeService)
  private sideMenuService = inject(SideMenuService)

  readonly sidenav = viewChild<MatSidenav>('sidenav')
  readonly routerTokens = RouterTokens

  githubReportIssueUrl = environment.githubReportIssueUrl
  isDark = false

  constructor() {
    this.isDark = this.themeService.getIsDark()
    effect(() => {
      if (this.sideMenuService.isOpen()) {
        this.openSidenav()
      } else {
        this.closeSidenav()
      }
    })
  }

  setDarkMode(): void {
    this.isDark = this.themeService.setDarkMode()
    this.closeSidenav()
  }
  setLightMode(): void {
    this.isDark = this.themeService.setLightMode()
    this.closeSidenav()
  }

  openSidenav() {
    this.sideMenuService.openSidenav()
    this.sidenav()?.open()
  }

  closeSidenav() {
    this.sideMenuService.closeSidenav()
    this.sidenav()?.close()
  }

  openLinkInNewTab(url: string) {
    window.open(url, '_blank')
  }
}
