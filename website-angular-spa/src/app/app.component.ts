import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { HeaderComponent } from './core/components/header/header.component'
import { ThemeService } from './core/services/theme.services'
import { FooterComponent } from './core/components/footer/footer.component'

@Component({
  selector: 'rmz-root',
  imports: [RouterOutlet, HomeComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'website-angular-spa'

  constructor(private themeService: ThemeService) {}
}
