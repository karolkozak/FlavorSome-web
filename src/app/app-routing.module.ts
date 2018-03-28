import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './layouts/components/home-page/home-page.component';
import {LayoutsModule} from './layouts/layouts.module';
import {LoginPageComponent} from './layouts/components/login-page/login-page.component';
import {LoginPageGuardService} from './security/services/guards/login-page-guard.service';
import {NotFoundComponent} from './layouts/components/error-page/not-found/not-found.component';
import {RegistrationPageComponent} from './layouts/components/registration-page/registration-page.component';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent, canActivate: [LoginPageGuardService]},
  {path: 'registration', component: RegistrationPageComponent, canActivate: [LoginPageGuardService]},
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
