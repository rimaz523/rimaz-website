import { Routes } from '@angular/router'
import { HomeComponent } from '@pages/home/home.component'
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component'

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
