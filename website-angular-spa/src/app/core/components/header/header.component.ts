import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { NgIf } from '@angular/common'
import { ThemeService } from '../../services/theme.services'
import { RouterLink } from '@angular/router'
import { ROUTER_TOKENS } from '../../../app.routes'

@Component({
  selector: 'rmz-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDark = false
  readonly ROUTER_TOKENS = ROUTER_TOKENS

  constructor(private themeService: ThemeService) {
    this.isDark = this.themeService.getIsDark()
  }

  setDarkMode(): void {
    this.isDark = this.themeService.setDarkMode()
  }
  setLightMode(): void {
    this.isDark = this.themeService.setLightMode()
  }
}
