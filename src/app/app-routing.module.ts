import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from '@app/layouts/components/home-page/home-page.component';
import {LoginPageComponent} from '@app/layouts/components/login-page/login-page.component';
import {LoginPageGuardService} from '@app/security/services/guards/login-page-guard.service';
import {NotFoundComponent} from '@app/layouts/components/error-page/not-found/not-found.component';
import {LayoutsModule} from '@app/layouts/layouts.module';
import {RegistrationPageComponent} from '@app/layouts/components/registration-page/registration-page.component';

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
