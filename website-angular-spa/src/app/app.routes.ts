import { Routes } from '@angular/router'

import { HomeComponent } from '@features/home/home.component'

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
    loadComponent: () =>
      import('@features/page-not-found/page-not-found.component').then(
        m => m.PageNotFoundComponent,
      ),
  },
]
