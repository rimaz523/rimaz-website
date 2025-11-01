import { Component, effect, Inject, inject, OnDestroy, OnInit, viewChild } from '@angular/core'
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router'
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav'
import { SideMenuService } from '@core/services/side-menu.service'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import {
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
  MsalService,
  MsalBroadcastService,
} from '@azure/msal-angular'
import { RedirectRequest, EventType, EventMessage, InteractionStatus } from '@azure/msal-browser'

import { RouterTokens } from 'app/app.routes'
import { environment } from 'environments/environment'
import { BrowserUtilsService } from '@core/services/browser-utils.service'
import { ThemeService } from '@core/services/theme.services'
import { filter, Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'rmz-side-menu',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatIcon,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService)
  private sideMenuService = inject(SideMenuService)
  private authService = inject(MsalService)
  private msalBroadcastService = inject(MsalBroadcastService)
  private readonly _destroying$ = new Subject<void>()

  readonly browserUtilsService = inject(BrowserUtilsService)
  readonly sidenav = viewChild<MatSidenav>('sidenav')
  readonly routerTokens = RouterTokens

  loginDisplay = false
  userFirstName = ''
  githubReportIssueUrl = environment.githubReportIssueUrl
  isDark = false

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration) {
    this.isDark = this.themeService.getIsDark()
    effect(() => {
      if (this.sideMenuService.isOpen()) {
        this.openSidenav()
      } else {
        this.closeSidenav()
      }
    })
  }

  async ngOnInit(): Promise<void> {
    this.authService.handleRedirectObservable().subscribe()
    this.setLoginDisplay()
    this.authService.instance.enableAccountStorageEvents() // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED,
        ),
      )
      .subscribe(() => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/'
        } else {
          this.setLoginDisplay()
        }
      })

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$),
      )
      .subscribe(() => {
        this.setLoginDisplay()
        this.checkAndSetActiveAccount()
      })
  }

  signIn(): void {
    this.closeSidenav()
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest)
    } else {
      this.authService.loginRedirect()
    }
  }

  signOut() {
    const activeAccount =
      this.authService.instance.getActiveAccount() || this.authService.instance.getAllAccounts()[0]
    this.authService.logoutRedirect({ account: activeAccount })
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    const activeAccount = this.authService.instance.getActiveAccount()

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      console.log('No active account! Setting the first account as active account')
      const accounts = this.authService.instance.getAllAccounts()
      // add your code for handling multiple accounts here
      this.authService.instance.setActiveAccount(accounts[0])
    }
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0
    console.log('Login Display set to ' + this.loginDisplay)
    console.log(this.authService.instance.getAllAccounts()[0])
    this.userFirstName = this.authService.instance.getAllAccounts()[0]?.name || ''
  }

  setDarkMode(): void {
    this.isDark = this.themeService.setDarkMode()
    this.closeSidenav()
  }
  setLightMode(): void {
    this.isDark = this.themeService.setLightMode()
    this.closeSidenav()
  }

  openSidenav() {
    this.sideMenuService.openSidenav()
    this.sidenav()?.open()
  }

  closeSidenav() {
    this.sideMenuService.closeSidenav()
    this.sidenav()?.close()
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined)
    this._destroying$.complete()
  }
}
