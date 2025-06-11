import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SocialHandlesComponent } from './social-handles.component'

describe('SocialHandlesComponent', () => {
  let component: SocialHandlesComponent
  let fixture: ComponentFixture<SocialHandlesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialHandlesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SocialHandlesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
