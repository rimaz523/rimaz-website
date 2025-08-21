import { Injectable, signal } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class SideMenuService {
  readonly isOpen = signal(false)

  openSidenav() {
    this.isOpen.set(true)
  }

  closeSidenav() {
    this.isOpen.set(false)
  }
}
