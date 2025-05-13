import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'

@Component({
  selector: 'rmz-root',
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'website-angular-spa'
}
