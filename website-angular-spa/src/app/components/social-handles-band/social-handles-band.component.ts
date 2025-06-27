import { Component, inject } from '@angular/core'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { SocialHandleComponent } from '@components/social-handle/social-handle.component'
import { SocialHandlesService } from '@components/social-handles-band/social-handles.service'

@Component({
  selector: 'rmz-social-handles-band',
  imports: [MatDividerModule, MatIconModule, SocialHandleComponent],
  templateUrl: './social-handles-band.component.html',
  styleUrl: './social-handles-band.component.scss',
})
export class SocialHandlesBandComponent {
  private socialHandlesService = inject(SocialHandlesService)
  readonly socialHandles = this.socialHandlesService.socialHandles
}
