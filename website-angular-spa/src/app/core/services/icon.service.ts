import { Injectable } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {}

  init() {
    this.matIconRegistry.addSvgIcon(
      'medium',
      this.domSanitizer.bypassSecurityTrustResourceUrl('custom-icons/medium.svg'),
    )
    this.matIconRegistry.addSvgIcon(
      'stack-overflow',
      this.domSanitizer.bypassSecurityTrustResourceUrl('custom-icons/stack-overflow.svg'),
    )
    this.matIconRegistry.addSvgIcon(
      'twitter-x',
      this.domSanitizer.bypassSecurityTrustResourceUrl('custom-icons/twitter-x.svg'),
    )
    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl('custom-icons/linkedin.svg'),
    )
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('custom-icons/github.svg'),
    )
  }
}
