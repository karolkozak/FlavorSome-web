import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './components/home-page/home-page.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {NotFoundComponent} from './components/error-page/not-found/not-found.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {SecurityModule} from '../security/security.module';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SecurityModule,
    SharedModule,
  ],
  declarations: [HomePageComponent, LoginPageComponent, NotFoundComponent, RegistrationPageComponent],
  exports: [HomePageComponent, LoginPageComponent, NotFoundComponent]
})
export class LayoutsModule {
}
