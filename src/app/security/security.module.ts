import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AuthServiceConfig, SocialLoginModule} from './libs/angular5-social-login';
import {getAuthServiceConfig} from './components/config/social-login-onfig';
import { FacebookLoginComponent } from './components/facebook-login/facebook-login.component';
import {LoginComponent} from './components/login/login.component';
import {AuthenticationService} from './services/authentication.service';
import {FacebookAuthService} from './services/facebook-auth.service';
import {SharedModule} from '../shared/shared.module';
import {AuthGuardService} from './services/guards/auth-guard.service';
import {LoginPageGuardService} from './services/guards/login-page-guard.service';

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
    AuthGuardService,
    FacebookAuthService,
    LoginPageGuardService,
  ],
  declarations: [LoginComponent, FacebookLoginComponent]
})
export class SecurityModule {
}
