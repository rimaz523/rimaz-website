import { Injectable, signal } from '@angular/core'
import { APP_THEME, DARK_MODE } from '@shared/constants/app.constants'

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal(false)

  constructor() {
    this.loadTheme()
  }

  loadTheme(): void {
    const theme = localStorage.getItem(APP_THEME)
    if (theme === DARK_MODE) {
      document.documentElement.classList.add(DARK_MODE)
      this.isDark.set(true)
    } else {
      document.documentElement.classList.remove(DARK_MODE)
    }
  }

  setDarkMode(): boolean {
    this.isDark.set(true)
    document.documentElement.classList.add(DARK_MODE)
    localStorage.setItem(APP_THEME, DARK_MODE)
    return this.isDark()
  }

  setLightMode(): boolean {
    this.isDark.set(false)
    document.documentElement.classList.remove(DARK_MODE)
    localStorage.removeItem(APP_THEME)
    return this.isDark()
  }

  getIsDark(): boolean {
    return this.isDark()
  }
}
