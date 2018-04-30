import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {AppComponent} from './app.component';
import {SecurityModule} from './security/security.module';
import {CoreModule} from '@app/core/core.module';
import {AppRoutingModule} from '@app/app-routing.module';
import {NavbarsModule} from '@app/navbars/navbars.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
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
