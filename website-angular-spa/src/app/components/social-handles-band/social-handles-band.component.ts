import { Component } from '@angular/core'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { SocialHandleComponent } from '@components/social-handle/social-handle.component'
import { ISocialHandle } from '@models/social-handle.model'
import { NgFor } from '@angular/common'
import { SocialHandlesService } from '@components/social-handles-band/social-handles.service'

@Component({
  selector: 'rmz-social-handles-band',
  imports: [MatDividerModule, MatIconModule, SocialHandleComponent, NgFor],
  templateUrl: './social-handles-band.component.html',
  styleUrl: './social-handles-band.component.scss',
})
export class SocialHandlesBandComponent {
  socialHandles!: ISocialHandle[]

  constructor(private socialHandlesService: SocialHandlesService) {
    socialHandlesService.getSocialHandles().subscribe(handles => (this.socialHandles = handles))
  }

  getOrderedSocialHandles(): ISocialHandle[] {
    return this.socialHandles.sort((a, b) => a.displayOrder - b.displayOrder)
  }
}
