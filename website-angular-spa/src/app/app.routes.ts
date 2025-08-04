import { Routes } from '@angular/router'
import { ArticlesComponent } from '@features/article/pages/articles/articles.component'

import { HomeComponent } from '@features/home/home.component'

export enum RouterTokens {
  home = '',
  articles = 'articles',
  wildcard = '**',
}

export const routes: Routes = [
  {
    path: RouterTokens.home,
    component: HomeComponent,
  },
  {
    path: RouterTokens.articles,
    component: ArticlesComponent,
  },
  {
    path: RouterTokens.wildcard,
    loadComponent: () =>
      import('@features/page-not-found/page-not-found.component').then(
        m => m.PageNotFoundComponent,
      ),
  },
]
