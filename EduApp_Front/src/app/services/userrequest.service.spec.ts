import { TestBed } from '@angular/core/testing';

import { UserrequestService } from './userrequest.service';

describe('UserrequestService', () => {
  let service: UserrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
