import {inject, TestBed} from '@angular/core/testing';

import {CustomTranslateService} from './custom-translate.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {customTranslateLoader} from '../core.module';

describe('CustomTranslateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (customTranslateLoader),
          deps: [HttpClient]
        }
      }),
      ],
      providers: [CustomTranslateService]
    });
  });

  it('should be created', inject([CustomTranslateService], (service: CustomTranslateService) => {
    expect(service).toBeTruthy();
  }));
});
