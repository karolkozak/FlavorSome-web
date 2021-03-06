import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '@app/shared/shared.module';
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
import {UnverifiedUserGuardService} from '@app/security/services/guards/unverified-user-guard.service';
import {UserResolverService} from '@app/security/services/resolvers/user-resolver.service';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons';
import {RecaptchaModule} from 'ng-recaptcha';
import {PlaceResolverService} from '@app/security/services/resolvers/place-resolver.service';
import {PasswordRecoveryComponent} from './components/password-recovery/password-recovery.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {AuthServiceConfig, SocialLoginModule} from 'angular5-social-login';

@NgModule({
  imports: [
    Angular2PromiseButtonModule.forRoot({
      disableBtn: true,
    }),
    CommonModule,
    HttpClientModule,
    RecaptchaModule,
    SocialLoginModule,
    SharedModule,
  ],
  providers: [
    {provide: AuthServiceConfig, useFactory: getAuthServiceConfig},
    AdminRoleGuardService,
    AuthenticationService,
    AuthGuardService,
    CustomAuthService,
    FacebookAuthService,
    LoginPageGuardService,
    PlaceResolverService,
    UnverifiedUserGuardService,
    UserResolverService,
  ],
  declarations: [
    CustomLoginComponent,
    FacebookLoginComponent,
    PasswordRecoveryComponent,
    RegistrationComponent,
    ResetPasswordComponent,
  ],
  exports: [
    CustomLoginComponent,
    FacebookLoginComponent,
    PasswordRecoveryComponent,
    RegistrationComponent,
    ResetPasswordComponent,
  ]
})
export class SecurityModule {
}
