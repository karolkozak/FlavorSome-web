import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {AppComponent} from './app.component';
import {SecurityModule} from './security/security.module';
import {CoreModule} from '@app/core/core.module';
import {environment} from '@env/environment';
import {AppRoutingModule} from '@app/app-routing.module';
import {NavbarsModule} from '@app/navbars/navbars.module';
import {} from 'googlemaps';  // it should stay in order to correct google namespace use. Be careful with ctrl + alt + o


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.gooogleApiKey,
      libraries: ['places']
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule.forRoot(),
    NavbarsModule,
    NgbModule.forRoot(),
    SecurityModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
