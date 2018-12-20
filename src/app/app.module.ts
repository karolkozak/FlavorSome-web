import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {AppComponent} from './app.component';
import {SecurityModule} from './security/security.module';
import {CoreModule} from '@app/core/core.module';
import {AppRoutingModule} from '@app/app-routing.module';
import {NavbarsModule} from '@app/navbars/navbars.module';
import {ConfigService} from '@app/core/services/config.service';
import {UserService} from '@app/core/services/user.service';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {TranslateModule} from '@ngx-translate/core';

export const fetchConfigData = (configService: ConfigService) => {
  return () => configService.load();
};

export const fetchCurrentUser = (authenticationService: AuthenticationService, userService: UserService) => {
  return authenticationService.isLoggedIn() ? () => userService.fetchUserOnInitApp() : () => {
  };
};

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
    TranslateModule,
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: fetchConfigData, deps: [ConfigService], multi: true},
    {provide: APP_INITIALIZER, useFactory: fetchCurrentUser, deps: [AuthenticationService, UserService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
