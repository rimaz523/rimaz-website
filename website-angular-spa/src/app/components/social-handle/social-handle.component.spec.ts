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
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
