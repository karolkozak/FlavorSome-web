import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NotFoundComponent} from './components/error-page/not-found/not-found.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SharedModule} from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [HomePageComponent, NotFoundComponent],
  exports: [HomePageComponent, NotFoundComponent]
})
export class LayoutsModule {
}
