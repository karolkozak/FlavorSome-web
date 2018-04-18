import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NotFoundComponent} from './components/error-page/not-found/not-found.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {SecurityModule} from '@app/security/security.module';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SharedModule} from '@app/shared/shared.module';
import { PlaceDetailsPageComponent } from './components/place-details-page/place-details-page.component';
import {PlacesModule} from '@app/places/places.module';
import {CoreModule} from '@app/core/core.module';
import { PlacesListPageComponent } from './components/places-list-page/places-list-page.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    PlacesModule,
    SecurityModule,
    SharedModule,
  ],
  declarations: [
    HomePageComponent,
    LoginPageComponent,
    NotFoundComponent,
    PlaceDetailsPageComponent,
    PlacesListPageComponent,
  ],
  exports: [
    HomePageComponent,
    LoginPageComponent,
    NotFoundComponent,
    PlaceDetailsPageComponent,
    PlacesListPageComponent,
  ]
})
export class LayoutsModule {
}
