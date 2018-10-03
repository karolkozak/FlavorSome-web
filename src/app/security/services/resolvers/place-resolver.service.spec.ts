import { TestBed, inject } from '@angular/core/testing';

import { PlaceResolverService } from './place-resolver.service';

describe('PlaceResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceResolverService]
    });
  });

  it('should be created', inject([PlaceResolverService], (service: PlaceResolverService) => {
    expect(service).toBeTruthy();
  }));
});
