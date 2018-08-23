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
import {ConfirmationPageComponent} from '@app/layouts/components/confirmation-page/confirmation-page.component';
import {UnverifiedUserGuardService} from '@app/security/services/guards/unverified-user-guard.service';
import {AuthGuardService} from '@app/security/services/guards/auth-guard.service';


const appRoutes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent, canActivate: [LoginPageGuardService]},
  {path: 'registration', component: RegistrationPageComponent, canActivate: [LoginPageGuardService]},
  {path: 'confirmation', component: ConfirmationPageComponent, canActivate: [AuthGuardService, UnverifiedUserGuardService]},
  {path: 'places', component: PlacesListPageComponent},
  {path: 'places/:id', component: PlaceDetailsPageComponent},
  {path: '**', component: NotFoundComponent},
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
