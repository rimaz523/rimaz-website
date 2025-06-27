import { TestBed } from '@angular/core/testing'

import { SocialHandlesService } from '@components/social-handles-band/social-handles.service'

describe('SocialHandlesBandService', () => {
  let service: SocialHandlesService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(SocialHandlesService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
