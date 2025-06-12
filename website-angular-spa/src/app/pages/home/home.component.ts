import { Component } from '@angular/core'
import { HeroComponent } from '@components/hero/hero.component'
import { SocialHandlesBandComponent } from '@components/social-handles-band/social-handles-band.component'

@Component({
  selector: 'rmz-home',
  imports: [HeroComponent, SocialHandlesBandComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
