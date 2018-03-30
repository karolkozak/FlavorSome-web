import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NotFoundComponent} from './components/error-page/not-found/not-found.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {SecurityModule} from '@app/security/security.module';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SharedModule} from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SecurityModule,
    SharedModule,
  ],
  declarations: [HomePageComponent, LoginPageComponent, NotFoundComponent],
  exports: [HomePageComponent, LoginPageComponent, NotFoundComponent]
})
export class LayoutsModule {
}
