import { Component, effect, inject, viewChild } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav'
import { SideMenuService } from '@core/services/side-menu.service'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'

@Component({
  selector: 'rmz-side-menu',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  private sideMenuService = inject(SideMenuService)
  readonly sidenav = viewChild<MatSidenav>('sidenav')

  constructor() {
    effect(() => {
      if (this.sideMenuService.isOpen()) {
        this.openSidenav()
      } else {
        this.closeSidenav()
      }
    })
  }

  openSidenav() {
    this.sideMenuService.openSidenav()
    this.sidenav()?.open()
  }

  closeSidenav() {
    this.sideMenuService.closeSidenav()
    this.sidenav()?.close()
  }
}
