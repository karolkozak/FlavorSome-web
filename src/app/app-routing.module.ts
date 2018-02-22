import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './layouts/components/home-page/home-page.component';
import {LayoutsModule} from './layouts/layouts.module';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'}
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
