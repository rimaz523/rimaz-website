import { Component, input } from '@angular/core'
import { NgxWordPullupComponent } from '@omnedia/ngx-word-pullup'

@Component({
  selector: 'rmz-page-title',
  imports: [NgxWordPullupComponent],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
})
export class PageTitleComponent {
  readonly title = input.required<string>()
}
