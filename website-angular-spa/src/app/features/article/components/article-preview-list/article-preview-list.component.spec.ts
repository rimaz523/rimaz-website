import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClient, HttpHandler } from '@angular/common/http'

import { ArticlePreviewListComponent } from './article-preview-list.component'

describe('ArticlePreviewListComponent', () => {
  let component: ArticlePreviewListComponent
  let fixture: ComponentFixture<ArticlePreviewListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlePreviewListComponent],
      providers: [HttpClient, HttpHandler],
    }).compileComponents()

    fixture = TestBed.createComponent(ArticlePreviewListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
