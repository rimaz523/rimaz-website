import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { HeaderComponent } from '@core/layout/header/header.component'
import { FooterComponent } from '@core/layout/footer/footer.component'

@Component({
  selector: 'rmz-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'website-angular-spa'
}
