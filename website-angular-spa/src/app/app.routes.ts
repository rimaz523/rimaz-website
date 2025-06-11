import { Routes } from '@angular/router'
import { HomeComponent } from '@pages/home/home.component'
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component'

export enum ROUTER_TOKENS {
  HOME = '',
  WILDCARD = '**',
}

export const routes: Routes = [
  {
    path: ROUTER_TOKENS.HOME,
    component: HomeComponent,
  },
  {
    path: ROUTER_TOKENS.WILDCARD,
    component: PageNotFoundComponent,
  },
]
