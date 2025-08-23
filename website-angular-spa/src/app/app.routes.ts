import { Routes } from '@angular/router'

import { AboutComponent } from '@features/about/about.component'
import { ArticlesComponent } from '@features/article/pages/articles/articles.component'
import { ContactComponent } from '@features/contact/contact.component'
import { HomeComponent } from '@features/home/home.component'

export enum RouterTokens {
  home = '',
  about = 'about',
  articles = 'articles',
  contact = 'contact',
  wildcard = '**',
}

export const routes: Routes = [
  {
    path: RouterTokens.home,
    component: HomeComponent,
  },
  {
    path: RouterTokens.about,
    component: AboutComponent,
  },
  {
    path: RouterTokens.articles,
    component: ArticlesComponent,
  },
  {
    path: RouterTokens.contact,
    component: ContactComponent,
  },
  {
    path: RouterTokens.wildcard,
    loadComponent: () =>
      import('@features/page-not-found/page-not-found.component').then(
        m => m.PageNotFoundComponent,
      ),
  },
]
