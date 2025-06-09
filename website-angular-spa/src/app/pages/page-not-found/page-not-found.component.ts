import { Component } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { RouterLink } from '@angular/router'
import { ROUTER_TOKENS } from '../../app.routes'

@Component({
  selector: 'rmz-page-not-found',
  imports: [MatCardModule, RouterLink],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  readonly ROUTER_TOKENS = ROUTER_TOKENS
}
