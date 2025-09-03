import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class BrowserUtilsService {
  openLink(url: string, openInNewTab = false) {
    window.open(url, openInNewTab ? '_blank' : '_self')
  }
}
