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
      IconNames.Medium,
      this.domSanitizer.bypassSecurityTrustResourceUrl(IconResourceUrls.Medium),
    )
    this.matIconRegistry.addSvgIcon(
      IconNames.StackOverflow,
      this.domSanitizer.bypassSecurityTrustResourceUrl(IconResourceUrls.StackOverflow),
    )
    this.matIconRegistry.addSvgIcon(
      IconNames.TwitterX,
      this.domSanitizer.bypassSecurityTrustResourceUrl(IconResourceUrls.TwitterX),
    )
    this.matIconRegistry.addSvgIcon(
      IconNames.Linkedin,
      this.domSanitizer.bypassSecurityTrustResourceUrl(IconResourceUrls.Linkedin),
    )
    this.matIconRegistry.addSvgIcon(
      IconNames.Github,
      this.domSanitizer.bypassSecurityTrustResourceUrl(IconResourceUrls.Github),
    )
  }
}
