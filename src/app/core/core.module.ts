import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {ConfigService} from './services/config.service';
import {CustomTranslateService} from './services/custom-translate.service';
import {UserService} from './services/user.service';
import {httpInterceptorProviders} from './interceptors/http-interceptors';

@NgModule({})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ConfigService,
        CustomTranslateService,
        httpInterceptorProviders,
        UserService,
      ]
    };
  }

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
