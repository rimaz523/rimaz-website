import { HttpClient, HttpHandler } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'

import { SocialHandlesService } from '@features/social/components/social-handles-band/social-handles.service'

describe('SocialHandlesService', () => {
  let service: SocialHandlesService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    })
    service = TestBed.inject(SocialHandlesService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
