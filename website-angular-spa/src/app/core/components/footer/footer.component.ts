import { Component } from '@angular/core'

@Component({
  selector: 'rmz-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  getCopyrightInformation() {
    return 'Copyright © ' + new Date().getFullYear() + ' Rimaz Mohommed'
  }
}
