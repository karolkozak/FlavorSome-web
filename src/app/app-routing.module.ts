import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './layouts/components/home-page/home-page.component';
import {LayoutsModule} from './layouts/layouts.module';
import {LoginComponent} from './security/components/login/login.component';
import {LoginPageGuardService} from './security/services/guards/login-page-guard.service';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginPageGuardService]},
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
