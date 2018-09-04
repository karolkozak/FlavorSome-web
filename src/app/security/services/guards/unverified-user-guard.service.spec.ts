import { TestBed, inject } from '@angular/core/testing';

import { UnverifiedUserGuardService } from './unverified-user-guard.service';

describe('UnverifiedUserGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnverifiedUserGuardService]
    });
  });

  it('should be created', inject([UnverifiedUserGuardService], (service: UnverifiedUserGuardService) => {
    expect(service).toBeTruthy();
  }));
});
