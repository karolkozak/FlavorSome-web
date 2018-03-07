import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SharedModule} from '../shared/shared.module';
import {NotFoundComponent} from './components/error-page/not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [HomePageComponent, NotFoundComponent],
  exports: [HomePageComponent, NotFoundComponent]
})
export class LayoutsModule {
}
