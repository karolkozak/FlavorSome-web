import {AgmCoreModule} from '@agm/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClient} from '@angular/common/http';
import {NavbarsModule} from './navbars/navbars.module';
import {SecurityModule} from './security/security.module';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {SharedModule} from './shared/shared.module';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {environment} from '../environments/environment';


export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.gooogleAPIKey,
      libraries: ['places']
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    NavbarsModule,
    SecurityModule,
    SimpleNotificationsModule.forRoot(),
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (customTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
