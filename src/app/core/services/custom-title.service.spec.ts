import { TestBed, inject } from '@angular/core/testing';

import { CustomTitleService } from './custom-title.service';

describe('CustomTitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomTitleService]
    });
  });

  it('should be created', inject([CustomTitleService], (service: CustomTitleService) => {
    expect(service).toBeTruthy();
  }));
});
