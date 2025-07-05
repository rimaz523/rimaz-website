import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { IconService } from './core/services/icon.service'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { apimSubscriptionHeaderInterceptor } from './core/interceptors/apim-subscription-header.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apimSubscriptionHeaderInterceptor])),
    provideAppInitializer(() => inject(IconService).init()),
  ],
}
