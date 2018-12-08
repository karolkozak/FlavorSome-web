import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from '@app/layouts/components/home-page/home-page.component';
import {LoginPageComponent} from '@app/layouts/components/login-page/login-page.component';
import {LoginPageGuardService} from '@app/security/services/guards/login-page-guard.service';
import {NotFoundComponent} from '@app/layouts/components/error-page/not-found/not-found.component';
import {LayoutsModule} from '@app/layouts/layouts.module';
import {PlaceDetailsPageComponent} from '@app/layouts/components/place-details-page/place-details-page.component';
import {PlacesListPageComponent} from '@app/layouts/components/places-list-page/places-list-page.component';
import {RegistrationPageComponent} from '@app/layouts/components/registration-page/registration-page.component';
import {UserPageComponent} from '@app/layouts/components/user-page/user-page.component';
import {ConfirmationPageComponent} from '@app/layouts/components/confirmation-page/confirmation-page.component';
import {UnverifiedUserGuardService} from '@app/security/services/guards/unverified-user-guard.service';
import {AuthGuardService} from '@app/security/services/guards/auth-guard.service';
import {UserResolverService} from '@app/security/services/resolvers/user-resolver.service';
import {DashboardComponent} from '@app/layouts/components/dashboard/dashboard.component';
import {AboutPageComponent} from '@app/layouts/components/about-page/about-page.component';
import {PlaceResolverService} from '@app/security/services/resolvers/place-resolver.service';
import {PasswordRecoveryPageComponent} from '@app/layouts/components/password-recovery-page/password-recovery-page.component';
import {ResetPasswordPageComponent} from '@app/layouts/components/reset-password-page/reset-password-page.component';
import {ContactPageComponent} from '@app/layouts/components/contact-page/contact-page.component';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full', canActivate: [LoginPageGuardService]},
  {path: 'login', component: LoginPageComponent, canActivate: [LoginPageGuardService]},
  {path: 'registration', component: RegistrationPageComponent, canActivate: [LoginPageGuardService]},
  {path: 'password-recovery', component: PasswordRecoveryPageComponent, canActivate: [LoginPageGuardService]},
  {path: 'auth/reset-password', component: ResetPasswordPageComponent, canActivate: [LoginPageGuardService]},
  {path: 'auth/confirmation', component: ConfirmationPageComponent, canActivate: [AuthGuardService, UnverifiedUserGuardService]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService, UnverifiedUserGuardService]},
  {path: 'places', component: PlacesListPageComponent},
  {path: 'places/:id', component: PlaceDetailsPageComponent, resolve: {place: PlaceResolverService}},
  {
    path: 'users/:id',
    component: UserPageComponent,
    canActivate: [AuthGuardService],
    resolve: {user: UserResolverService}
  },
  {path: 'contact', component: ContactPageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    LayoutsModule
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
