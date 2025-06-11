import { Component } from '@angular/core'
import { HeroComponent } from '@components/hero/hero.component'
import { SocialHandlesComponent } from '@components/social-handles/social-handles.component'

@Component({
  selector: 'rmz-home',
  imports: [HeroComponent, SocialHandlesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
