import { TestBed, inject } from '@angular/core/testing';

import {PlacesSearchService} from './places-search.service';


describe('PlacesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlacesSearchService]
    });
  });

  it('should be created', inject([PlacesSearchService], (service: PlacesSearchService) => {
    expect(service).toBeTruthy();
  }));
});
