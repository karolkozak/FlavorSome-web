import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NotFoundComponent} from './components/error-page/not-found/not-found.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {SecurityModule} from '@app/security/security.module';
import {DashboardModule} from '@app/dashboard/dashboard.module';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SharedModule} from '@app/shared/shared.module';
import {PlacesModule} from '@app/places/places.module';
import {CoreModule} from '@app/core/core.module';
import {DashboardComponent} from '@app/layouts/components/dashboard/dashboard.component';
import {PlacesListPageComponent} from './components/places-list-page/places-list-page.component';
import {RegistrationPageComponent} from '@app/layouts/components/registration-page/registration-page.component';
import {PlaceDetailsPageComponent} from '@app/layouts/components/place-details-page/place-details-page.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import {UsersModule} from '@app/users/users.module';
import {ConfirmationPageComponent} from '@app/layouts/components/confirmation-page/confirmation-page.component';
import {AgmCoreModule} from '@agm/core';
import { AboutPageComponent } from './components/about-page/about-page.component';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons';
import {PasswordRecoveryPageComponent} from '@app/layouts/components/password-recovery-page/password-recovery-page.component';
import {ResetPasswordPageComponent} from '@app/layouts/components/reset-password-page/reset-password-page.component';
import {ContactPageComponent} from '@app/layouts/components/contact-page/contact-page.component';

@NgModule({
  imports: [
    AgmCoreModule,
    Angular2PromiseButtonModule.forRoot({
      disableBtn: true,
    }),
    CommonModule,
    CoreModule,
    DashboardModule,
    RouterModule,
    PlacesModule,
    SecurityModule,
    SharedModule,
    UsersModule,
  ],
  declarations: [
    ConfirmationPageComponent,
    ContactPageComponent,
    DashboardComponent,
    HomePageComponent,
    LoginPageComponent,
    NotFoundComponent,
    PasswordRecoveryPageComponent,
    PlaceDetailsPageComponent,
    PlacesListPageComponent,
    RegistrationPageComponent,
    ResetPasswordPageComponent,
    UserPageComponent,
    AboutPageComponent,
  ],
  exports: [
    ConfirmationPageComponent,
    ContactPageComponent,
    DashboardComponent,
    HomePageComponent,
    LoginPageComponent,
    NotFoundComponent,
    PlaceDetailsPageComponent,
    PlacesListPageComponent,
    RegistrationPageComponent,
    UserPageComponent,
  ]
})
export class LayoutsModule {
}
