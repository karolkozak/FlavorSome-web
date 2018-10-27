import { TestBed, inject } from '@angular/core/testing';

import { HereMapService } from './here-map.service';

describe('HereMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HereMapService]
    });
  });

  it('should be created', inject([HereMapService], (service: HereMapService) => {
    expect(service).toBeTruthy();
  }));
});
