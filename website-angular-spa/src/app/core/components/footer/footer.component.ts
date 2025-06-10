import { Component } from '@angular/core'
import { MatDividerModule } from '@angular/material/divider'

@Component({
  selector: 'rmz-footer',
  imports: [MatDividerModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  getCopyrightInformation() {
    return 'Copyright © ' + new Date().getFullYear() + ' Rimaz Mohommed'
  }
}
