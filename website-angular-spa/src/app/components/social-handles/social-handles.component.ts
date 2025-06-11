import { Component } from '@angular/core'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'rmz-social-handles',
  imports: [MatDividerModule, MatIconModule],
  templateUrl: './social-handles.component.html',
  styleUrl: './social-handles.component.scss',
})
export class SocialHandlesComponent {}
