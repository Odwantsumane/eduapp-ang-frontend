import { TestBed } from '@angular/core/testing';

import { CookieLocalService } from './cookie-local.service';

describe('CookieLocalService', () => {
  let service: CookieLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
