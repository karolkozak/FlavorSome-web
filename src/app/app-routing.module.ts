import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './layouts/components/home-page/home-page.component';
import {LayoutsModule} from './layouts/layouts.module';
import {LoginComponent} from './security/components/login/login.component';
import {LoginPageGuardService} from './security/services/guards/login-page-guard.service';
import {NotFoundComponent} from './layouts/components/error-page/not-found/not-found.component';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginPageGuardService]},
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
