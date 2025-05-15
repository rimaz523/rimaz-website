import { Component } from '@angular/core'
import { HeroComponent } from '../../components/hero/hero.component'

@Component({
  selector: 'rmz-home',
  imports: [HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
