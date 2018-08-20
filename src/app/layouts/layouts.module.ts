import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NotFoundComponent} from './components/error-page/not-found/not-found.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {SecurityModule} from '@app/security/security.module';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SharedModule} from '@app/shared/shared.module';
import {PlacesModule} from '@app/places/places.module';
import {CoreModule} from '@app/core/core.module';
import {PlacesListPageComponent} from './components/places-list-page/places-list-page.component';
import {RegistrationPageComponent} from '@app/layouts/components/registration-page/registration-page.component';
import {PlaceDetailsPageComponent} from '@app/layouts/components/place-details-page/place-details-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import {UsersModule} from '@app/users/users.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    PlacesModule,
    SecurityModule,
    SharedModule,
    UsersModule,
  ],
  declarations: [
    HomePageComponent,
    LoginPageComponent,
    NotFoundComponent,
    PlaceDetailsPageComponent,
    PlacesListPageComponent,
    RegistrationPageComponent,
    UserPageComponent,
  ],
  exports: [
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
