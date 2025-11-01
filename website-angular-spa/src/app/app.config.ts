import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
  importProvidersFrom,
  APP_INITIALIZER,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http'
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
} from '@azure/msal-browser'
import {
  MsalInterceptor,
  MSAL_INSTANCE,
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
} from '@azure/msal-angular'
import { BrowserModule } from '@angular/platform-browser'
import { routes } from './app.routes'
import { IconService } from './core/services/icon.service'
import { apimSubscriptionHeaderInterceptor } from './core/interceptors/apim-subscription-header.interceptor'
import { environment } from '../environments/environment'

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message)
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.ms_external_id_client_id,
      authority: `https://${environment.ms_external_id_subdomain}.ciamlogin.com/`,
      redirectUri: `${environment.ms_external_id_spa_url}auth`,
      postLogoutRedirectUri: `${environment.ms_external_id_spa_url}`,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowPlatformBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  })
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, string[]>()
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read'])

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  }
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
    loginFailedRoute: '/login-failed',
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(BrowserModule),
    provideAppInitializer(() => inject(IconService).init()),
    provideHttpClient(withInterceptors([apimSubscriptionHeaderInterceptor])),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (msalService: MsalService) => {
        return () => msalService.instance.initialize() // Ensure initialize is called
      },
      deps: [MsalService],
      multi: true,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
}
