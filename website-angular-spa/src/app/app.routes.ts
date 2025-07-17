import { Routes } from '@angular/router'

import { HomeComponent } from '@features/home/home.component'
import { PageNotFoundComponent } from '@features/page-not-found/page-not-found.component'

export enum RouterTokens {
  home = '',
  wildcard = '**',
}

export const routes: Routes = [
  {
    path: RouterTokens.home,
    component: HomeComponent,
  },
  {
    path: RouterTokens.wildcard,
    component: PageNotFoundComponent,
  },
]
