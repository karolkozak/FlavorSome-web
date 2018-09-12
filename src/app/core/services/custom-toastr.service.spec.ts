import { TestBed, inject } from '@angular/core/testing';

import { CustomToastrService } from './custom-toastr.service';

describe('CustomToastrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomToastrService]
    });
  });

  it('should be created', inject([CustomToastrService], (service: CustomToastrService) => {
    expect(service).toBeTruthy();
  }));
});
