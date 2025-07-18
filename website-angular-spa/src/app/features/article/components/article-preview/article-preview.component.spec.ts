import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ArticlePreviewComponent } from './article-preview.component'

describe('ArticlePreviewComponent', () => {
  let component: ArticlePreviewComponent
  let fixture: ComponentFixture<ArticlePreviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlePreviewComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ArticlePreviewComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.componentRef.setInput('article', {
      title: 'Test Article',
      content: 'This is a test article.',
      publishedDate: '2023-01-01',
      image: 'test-image.jpg',
      url: 'https://example.com/test-article',
    })

    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
