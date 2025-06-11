import { Injectable } from '@angular/core'
import { APP_THEME, DARK_MODE } from '@shared/constants/app.constants'

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = false

  constructor() {
    this.loadTheme()
  }

  loadTheme(): void {
    const theme = localStorage.getItem(APP_THEME)
    if (theme === DARK_MODE) {
      document.documentElement.classList.add(DARK_MODE)
      this.isDark = true
    } else {
      document.documentElement.classList.remove(DARK_MODE)
    }
  }

  setDarkMode(): boolean {
    this.isDark = true
    document.documentElement.classList.add(DARK_MODE)
    localStorage.setItem(APP_THEME, DARK_MODE)
    return this.isDark
  }

  setLightMode(): boolean {
    this.isDark = false
    document.documentElement.classList.remove(DARK_MODE)
    localStorage.removeItem(APP_THEME)
    return this.isDark
  }

  getIsDark(): boolean {
    return this.isDark
  }
}
