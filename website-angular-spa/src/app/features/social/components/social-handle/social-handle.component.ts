import { Component, input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

import { ISocialHandle } from '@features/social/social-handle.model'

@Component({
  selector: 'rmz-social-handle',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './social-handle.component.html',
  styleUrl: './social-handle.component.scss',
})
export class SocialHandleComponent {
  readonly socialHandle = input.required<ISocialHandle>()

  openLinkInNewTab(url: string) {
    window.open(url, '_blank')
  }
}
