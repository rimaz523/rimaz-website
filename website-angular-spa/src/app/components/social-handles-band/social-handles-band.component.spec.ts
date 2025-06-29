import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SocialHandlesBandComponent } from './social-handles-band.component'
import { HttpClient, HttpHandler } from '@angular/common/http'

describe('SocialHandlesBandComponent', () => {
  let component: SocialHandlesBandComponent
  let fixture: ComponentFixture<SocialHandlesBandComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialHandlesBandComponent],
      providers: [HttpClient, HttpHandler],
    }).compileComponents()

    fixture = TestBed.createComponent(SocialHandlesBandComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
