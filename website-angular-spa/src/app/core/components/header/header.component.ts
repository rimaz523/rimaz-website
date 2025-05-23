import { Component, Renderer2 } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { NgIf } from '@angular/common'
import { DARK_MODE } from '../../../shared/constants/app.constants'

@Component({
  selector: 'rmz-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDark = false

  constructor(private renderer: Renderer2) {}

  setDarkMode(): void {
    this.isDark = true
    this.renderer.addClass(document.documentElement, DARK_MODE)
  }
  setLightMode(): void {
    this.isDark = false
    this.renderer.removeClass(document.documentElement, DARK_MODE)
  }
}
