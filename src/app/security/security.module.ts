import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AuthServiceConfig, SocialLoginModule} from './libs/angular5-social-login';
import {getAuthServiceConfig} from './config/social-login-config';
import {FacebookLoginComponent} from './components/facebook-login/facebook-login.component';
import {LoginComponent} from './components/login/login.component';
import {AuthenticationService} from './services/authentication.service';
import {FacebookAuthService} from './services/facebook-auth.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SocialLoginModule,
    SharedModule,
  ],
  providers: [
    {provide: AuthServiceConfig, useFactory: getAuthServiceConfig},
    AuthenticationService,
    FacebookAuthService
  ],
  declarations: [LoginComponent, FacebookLoginComponent]
})
export class SecurityModule {
}
