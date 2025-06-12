import { Component } from '@angular/core'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { SocialHandleComponent } from '../social-handle/social-handle.component'
import { ISocialHandle } from '@models/social-handle.model'
import { NgFor } from '@angular/common'

@Component({
  selector: 'rmz-social-handles-band',
  imports: [MatDividerModule, MatIconModule, SocialHandleComponent, NgFor],
  templateUrl: './social-handles-band.component.html',
  styleUrl: './social-handles-band.component.scss',
})
export class SocialHandlesBandComponent {
  socialHandles: ISocialHandle[]

  constructor() {
    this.socialHandles = [
      {
        name: 'Github',
        url: 'https://github.com/rimaz523',
        displayOrder: 1,
      },
      {
        name: 'Medium',
        url: 'https://rimazmohommed523.medium.com',
        displayOrder: 2,
      },
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/rimazmohommed',
        displayOrder: 3,
      },
      {
        name: 'Stackoverflow',
        url: 'https://stackoverflow.com/users/4546132/rimaz-mohommed',
        displayOrder: 4,
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/rimaz_mohommed',
        displayOrder: 5,
      },
    ]
  }

  getOrderedSocialHandles(): ISocialHandle[] {
    return this.socialHandles.sort((a, b) => a.displayOrder - b.displayOrder)
  }
}
