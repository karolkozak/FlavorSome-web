import {inject, TestBed} from '@angular/core/testing';

import {ConfigService} from './config.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {SharedModule} from '../shared.module';

describe('ConfigService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const testData: string[] = ['RESTAURANT', 'CAFE'];
  const testUrl = environment.unnamedMicroserviceUrl + environment.configPath + environment.placeTypesPath;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      providers: [ConfigService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', inject([ConfigService], (service: ConfigService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAvailablePlaceTypes', () => {
    it('should return mocked data', inject([ConfigService], (service: ConfigService) => {

      // Make an HTTP GET request
      httpClient.get<string[]>(testUrl)
        .subscribe(data =>
          // When observable resolves, result should match test data
          expect(data).toEqual(testData)
        );

      // The following `expectOne()` will match the request's URL.
      // If no requests or multiple requests matched that URL
      // `expectOne()` would throw.
      const req = httpTestingController.expectOne(testUrl);

      // Assert that the request is a GET.
      expect(req.request.method).toEqual('GET');

      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      req.flush(testData);
    }));

    it('should return available place types', inject([ConfigService], (service: ConfigService) => {
      service.getAvailablePlaceTypes().subscribe(data => {
        expect(data).toEqual(testData);
      });

      httpTestingController.expectOne((req: HttpRequest<any>) => {
        return req.url === testUrl && req.method === 'GET';
      }, `GET to '/place/types/'`).flush(testData);
    }));
  });
});
