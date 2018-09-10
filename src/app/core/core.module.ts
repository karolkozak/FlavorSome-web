import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {httpInterceptorProviders} from './interceptors/http-interceptors';
import {ConfigService} from './services/config.service';
import {CustomTranslateService} from './services/custom-translate.service';
import {UserService} from './services/user.service';
import {environment} from '@env/environment';
import {} from 'googlemaps'; // it should stay in order to correct google namespace use. Be careful with ctrl + alt + o
import {CustomToastrService} from '@app/core/services/custom-toastr.service';

export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places']
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (customTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ConfigService,
        CustomToastrService,
        CustomTranslateService,
        httpInterceptorProviders,
        UserService,
      ]
    };
  }

  constructor (@Optional() @SkipSelf() coreModule: CoreModule) {
    if (coreModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
