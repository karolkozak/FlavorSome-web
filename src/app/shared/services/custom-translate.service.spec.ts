import {TestBed, inject} from '@angular/core/testing';

import {CustomTranslateService} from './custom-translate.service';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateStore} from '@ngx-translate/core/src/translate.store';
import {HttpClient} from '@angular/common/http';
import {customTranslateLoader} from '../../app.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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
