import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {getAuthServiceConfig} from './components/config/social-login-onfig';
import { FacebookLoginComponent } from './components/facebook-login/facebook-login.component';
import {AuthenticationService} from './services/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthServiceConfig, SocialLoginModule} from './libs/angular5-social-login';

@NgModule({
  imports: [
    CommonModule,
    SocialLoginModule,
    HttpClientModule,
  ],
  providers: [
    {provide: AuthServiceConfig, useFactory: getAuthServiceConfig},
    AuthenticationService,
  ],
  declarations: [LoginComponent, FacebookLoginComponent]
})
export class SecurityModule {
}