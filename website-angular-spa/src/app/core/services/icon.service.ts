import { Injectable } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { IconNames, IconResourceUrls } from '@shared/constants/app.constants'

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
      IconNames.medium,
      this.domSanitizer.bypassSecurityTrustResourceUrl(IconResourceUrls.medium),
    )
    this.matIconRegistry.addSvgIcon(
      IconNames.stackOverflow,
      this.domSanitizer.bypassSecurityTrustResourceUrl(IconResourceUrls.stackOverflow),
    )
    this.matIconRegistry.addSvgIcon(
      IconNames.twitterX,
      this.domSanitizer.bypassSecurityTrustResourceUrl(IconResourceUrls.twitterX),
    )
    this.matIconRegistry.addSvgIcon(
      IconNames.linkedin,
      this.domSanitizer.bypassSecurityTrustResourceUrl(IconResourceUrls.linkedin),
    )
    this.matIconRegistry.addSvgIcon(
      IconNames.github,
      this.domSanitizer.bypassSecurityTrustResourceUrl(IconResourceUrls.github),
    )
  }
}
