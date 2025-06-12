import { Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { ISocialHandle } from '@models/social-handle.model'

@Component({
  selector: 'rmz-social-handle',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './social-handle.component.html',
  styleUrl: './social-handle.component.scss',
})
export class SocialHandleComponent {
  @Input() socialHandle!: ISocialHandle

  getIconByName(name: string): string {
    let icon = ''
    switch (name) {
      case 'Github':
        icon = 'github'
        break
      case 'Medium':
        icon = 'medium'
        break
      case 'Linkedin':
        icon = 'linkedin'
        break
      case 'Stackoverflow':
        icon = 'stack-overflow'
        break
      case 'Twitter':
        icon = 'twitter-x'
        break
    }

    return icon
  }

  openLinkInNewTab(url: string) {
    window.open(url, '_blank')
  }
}
