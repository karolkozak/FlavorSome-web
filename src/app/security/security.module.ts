import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '@app/shared/shared.module';
import {AuthServiceConfig, SocialLoginModule} from './libs/angular5-social-login';
import {getAuthServiceConfig} from './config/social-login-config';
import {FacebookLoginComponent} from './components/facebook-login/facebook-login.component';
import {AuthenticationService} from './services/authentication.service';
import {FacebookAuthService} from './services/facebook-auth.service';
import {AuthGuardService} from './services/guards/auth-guard.service';
import {LoginPageGuardService} from './services/guards/login-page-guard.service';
import {AdminRoleGuardService} from './services/guards/admin-role-guard.service';
import {CustomLoginComponent} from './components/custom-login/custom-login.component';
import {CustomAuthService} from './services/custom-auth.service';
import {RegistrationComponent} from './components/registration/registration.component';
import {ReCaptchaModule} from 'angular5-recaptcha';
import {UnverifiedUserGuardService} from '@app/security/services/guards/unverified-user-guard.service';
import {UserResolverService} from '@app/security/services/resolvers/user-resolver.service';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReCaptchaModule,
    SocialLoginModule,
    SharedModule,
    Angular2PromiseButtonModule.forRoot({
      disableBtn: true,
    }),
  ],
  providers: [
    {provide: AuthServiceConfig, useFactory: getAuthServiceConfig},
    AdminRoleGuardService,
    AuthenticationService,
    AuthGuardService,
    CustomAuthService,
    FacebookAuthService,
    LoginPageGuardService,
    UnverifiedUserGuardService,
    UserResolverService,
  ],
  declarations: [
    CustomLoginComponent,
    FacebookLoginComponent,
    RegistrationComponent,
  ],
  exports: [
    CustomLoginComponent,
    FacebookLoginComponent,
    RegistrationComponent,
  ]
})
export class SecurityModule {
}
