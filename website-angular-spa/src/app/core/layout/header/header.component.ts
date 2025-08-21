import { Component, inject } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router'

import { RouterTokens } from '../../../app.routes'
import { SideMenuService } from '@core/services/side-menu.service'

@Component({
  selector: 'rmz-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private sideMenuService = inject(SideMenuService)
  readonly routerTokens = RouterTokens

  toggleSidenav(): void {
    if (this.sideMenuService.isOpen()) {
      this.sideMenuService.closeSidenav()
    } else {
      this.sideMenuService.openSidenav()
    }
  }
}
