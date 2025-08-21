import { Component } from '@angular/core'

import { HeaderComponent } from '@core/layout/header/header.component'
import { FooterComponent } from '@core/layout/footer/footer.component'
import { SideMenuComponent } from '@core/layout/side-menu/side-menu.component'

@Component({
  selector: 'rmz-root',
  imports: [HeaderComponent, FooterComponent, SideMenuComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'website-angular-spa'
}
