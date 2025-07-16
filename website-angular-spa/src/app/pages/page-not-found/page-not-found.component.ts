import { Component } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { RouterLink } from '@angular/router'
import { RouterTokens } from '../../app.routes'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'rmz-page-not-found',
  imports: [MatCardModule, RouterLink, MatButtonModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  readonly routerTokens = RouterTokens
}
