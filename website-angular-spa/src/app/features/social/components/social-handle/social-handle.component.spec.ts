import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SocialHandleComponent } from './social-handle.component'

describe('SocialHandleComponent', () => {
  let component: SocialHandleComponent
  let fixture: ComponentFixture<SocialHandleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialHandleComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SocialHandleComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.componentRef.setInput('socialHandle', {
      name: 'Github',
      url: 'https://github.com/rimaz523',
      displayOrder: 1,
    })
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
