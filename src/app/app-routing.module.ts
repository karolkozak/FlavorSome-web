import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutsModule} from '@app/layouts/layouts.module';
import {HomePageComponent} from '@app/layouts/components/home-page/home-page.component';
import {LoginComponent} from '@app/security/components/login/login.component';
import {LoginPageGuardService} from '@app/security/services/guards/login-page-guard.service';
import {NotFoundComponent} from '@app/layouts/components/error-page/not-found/not-found.component';


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
