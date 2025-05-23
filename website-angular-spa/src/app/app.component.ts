import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { HeaderComponent } from './core/components/header/header.component'

@Component({
  selector: 'rmz-root',
  imports: [RouterOutlet, HomeComponent, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'website-angular-spa'
}
