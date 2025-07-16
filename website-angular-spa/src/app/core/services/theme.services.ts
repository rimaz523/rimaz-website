import { Injectable, signal } from '@angular/core'
import { appTheme, darkMode } from '@shared/constants/app.constants'

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal(false)

  constructor() {
    this.loadTheme()
  }

  loadTheme(): void {
    const theme = localStorage.getItem(appTheme)
    if (theme === darkMode) {
      document.documentElement.classList.add(darkMode)
      this.isDark.set(true)
    } else {
      document.documentElement.classList.remove(darkMode)
    }
  }

  setDarkMode(): boolean {
    this.isDark.set(true)
    document.documentElement.classList.add(darkMode)
    localStorage.setItem(appTheme, darkMode)
    return this.isDark()
  }

  setLightMode(): boolean {
    this.isDark.set(false)
    document.documentElement.classList.remove(darkMode)
    localStorage.removeItem(appTheme)
    return this.isDark()
  }

  getIsDark(): boolean {
    return this.isDark()
  }
}
